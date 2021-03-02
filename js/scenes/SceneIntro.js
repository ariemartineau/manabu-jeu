//Importation de la classe GrilleMontage
import {
	GrilleMontage
} from "../utils/GrilleMontage.js";


/**
 * Classe représentant la scène d'intro du jeu
 * @extends Phaser.Scene
 * Auteurs : Ariane Laferrière-Martineau
 * 			 et Antoine Côté-L'Écuyer
 * Date : 20-04-2020 
 */

export class SceneIntro extends Phaser.Scene {

	constructor() {
		super("SceneIntro");
	}

	create() {
		// Instancier une grille de montage avec 6 colonnes et 10 rangées
		this.grille = new GrilleMontage(this, 6, 10);
		//this.grille.afficherGrille();

		this.pageIntro();

		if (this.sys.game.device.os.desktop === false) { // Mobile
			//On est sur mobile et on gère donc aussi l'orientation de l'écran
			//Vérification immédiate
			this.verifierOrientation();
			this.scale.on('resize', this.verifierOrientation, this);
		}
	}

	pageIntro(){
		// Titre du jeu
		let imgTitre = this.add.image(this.game.config.width/2, this.grille.hauteurLigne*2, "imgManabu");
		this.grille.mettreEchelleLargeurColonne(imgTitre, 4.5);

		// Texte Auteurs
		let tailleTexte = Math.round(20 * GrilleMontage.ajusterRatioX());
		let AuteursTexte = this.add.text(0, 0, "© Ariane Laferrière-Martineau\n  & Antoine Côté-L'Ecuyer", {
			font: "bold 20px 'Manrope'",
			font: `bold ${tailleTexte}px Manrope`,
			color: "#000000",
			align: "right"
		});
		this.grille.placerIndexCellule(59, AuteursTexte);
		AuteursTexte.x = this.grille.largeurColonne*5.9;
		AuteursTexte.setOrigin(1, 0);

		// Créer 15 bulles dans un groupe physique et paramétrer les propriétés communes
		let lesBulles = this.physics.add.group({
			key: "bulles",
			repeat: 14,
			setXY: {
				x : game.config.width/2,
				y : game.config.height/2,
			},
			bounceX: 1,
			bounceY: 1,
			collideWorldBounds: true
		});
		// Ajuster les propriétés spécifiques à chaque bulles
		lesBulles.children.iterate(function(uneBulle){
			let indexVignette = Phaser.Math.Between(0, 10);
			uneBulle.setFrame(indexVignette);
			GrilleMontage.mettreEchelleRatioX(uneBulle);
			uneBulle.setVelocity(Phaser.Math.Between(50, 100), Phaser.Math.Between(50, 100));
			(Math.random() > 0.5) ? uneBulle.body.velocity.x *= -1: uneBulle.body.velocity.y *= -1;
			uneBulle.body.setCircle(uneBulle.displayWidth/2);
			uneBulle.setDepth(-1);
		});
		this.physics.add.collider(lesBulles, lesBulles);


		// Boutons de la page Intro du jeu
		// Bouton Jouer
		let btnJouer = this.add.sprite(game.config.width/2, this.grille.hauteurLigne*4, "btnIntro", 0);
		this.grille.mettreEchelleLargeurColonne(btnJouer, 3);
		// On met le bouton Jouer interactif
		btnJouer.setInteractive({cursor: 'pointer'});
		btnJouer.once("pointerdown", function(){
			this.sound.add("bouton").play();
			this.selectionNiveau();
		}, this);
		// Souris sur le bouton
		btnJouer.on("pointerover", function(){
			this.setFrame(1);
		});
		// Souris ailleurs que sur le bouton
		btnJouer.on("pointerout", function(){
			this.setFrame(0);
		});

		// Bouton INSTRUCTIONS
		let btnInstructions = this.add.sprite(game.config.width/2, this.grille.hauteurLigne*5.5, "btnIntro", 8);
		this.grille.mettreEchelleLargeurColonne(btnInstructions, 3);
		// On met le bouton Jouer interactif
		btnInstructions.setInteractive({cursor: 'pointer'});
		btnInstructions.once("pointerdown", function(){
			// Détruire les éléments de la page intro
			imgTitre.destroy();
			btnJouer.destroy();
			btnInstructions.destroy();
			btnKanas.destroy();
			btnScore.destroy();
			AuteursTexte.destroy();
			this.sound.add("bouton").play();
			// Afficher les instructions du jeu
			this.afficherInstructions();
		}, this);
		// Souris sur le bouton
		btnInstructions.on("pointerover", function(){
			this.setFrame(9);
		});
		// Souris ailleurs que sur le bouton
		btnInstructions.on("pointerout", function(){
			this.setFrame(8);
		});

		// Bouton KANAS
		let btnKanas = this.add.sprite(game.config.width/2, this.grille.hauteurLigne*7, "btnIntro", 2);
		this.grille.mettreEchelleLargeurColonne(btnKanas, 3);
		// On met le bouton Jouer interactif
		btnKanas.setInteractive({cursor: 'pointer'});
		btnKanas.once("pointerdown", function(){
			// Détruire les éléments de la page intro
			imgTitre.destroy();
			btnJouer.destroy();
			btnInstructions.destroy();
			btnKanas.destroy();
			btnScore.destroy();
			AuteursTexte.destroy();
			this.sound.add("bouton").play();
			// Aller à la fonction de l'affichage des kanas
			this.afficherKanas();
		}, this);
		// Souris sur le bouton
		btnKanas.on("pointerover", function(){
			this.setFrame(3);
		});
		// Souris ailleurs que sur le bouton
		btnKanas.on("pointerout", function(){
			this.setFrame(2);
		});

		// Bouton Score
		let btnScore = this.add.sprite(game.config.width/2, this.grille.hauteurLigne*8.5, "btnIntro", 4);
		this.grille.mettreEchelleLargeurColonne(btnScore, 3);
		// On met le bouton Jouer interactif
		btnScore.setInteractive({cursor: 'pointer'});
		btnScore.once("pointerdown", function(){
			// Détruire les éléments de la page intro
			imgTitre.destroy();
			btnJouer.destroy();
			btnInstructions.destroy();
			btnKanas.destroy();
			btnScore.destroy();
			AuteursTexte.destroy();
			this.sound.add("bouton").play();
			// Aller à la fonction de l'affichage des scores
			this.afficherScore();
		}, this);
		// Souris sur le bouton
		btnScore.on("pointerover", function(){
			this.setFrame(5);
		});
		// Souris ailleurs que sur le bouton
		btnScore.on("pointerout", function(){
			this.setFrame(4);
		});

		
	}

	selectionNiveau(){
		// Aller à la sélection de niveau
		this.scene.start("SceneNiveau");
	}

	afficherInstructions(){
		// Créer un fond blanc
		let fondBlanc = this.add.rectangle(game.config.width/2, game.config.height/2, game.config.width, game.config.height, 0xffffff);
		fondBlanc.setDepth(-1);

		// Créer un fond bleu au haut de l'écran de jeu
		let fondTitre = this.add.rectangle(game.config.width/2, 0, this.grille.largeurColonne*6, this.grille.hauteurLigne, 0x00b0ff);
		fondTitre.setOrigin(0.5,0);

		// Placer le logo du jeu Manabu
		let imgTitre = this.add.image(this.game.config.width/2, this.grille.hauteurLigne*0.5, "imgManabu");
		imgTitre.setOrigin(0.5, 0.5);
		this.grille.mettreEchelleLargeurColonne(imgTitre, 3);

		// Titre de la page
		let tailleTexte = Math.round(64 * GrilleMontage.ajusterRatioX());
		let titreTxt = this.add.text(game.config.width / 2, this.grille.hauteurLigne*0.5, "Instructions", {
			font: `bold ${tailleTexte}px Verdana`,
			color: "#708090",
			align: "center"
		});
		titreTxt.setOrigin(0.5, -1);

		// Texte du score
		tailleTexte = Math.round(25 * GrilleMontage.ajusterRatioX());
		let leTexte = "Pour jouer, il suffit de glisser le bon Romaji sur l'hiragana à identifier!\n";
		leTexte += "\nN'oublie pas, tu as droit à 4 erreurs!\n";
		let Txtinstruction = this.add.text(game.config.width / 2, this.grille.hauteurLigne*8, leTexte, {
			font: `bold ${tailleTexte}px Arial`,
			color: "#708090",
			align: "center",
			wordWrap : {
				width : game.config.width * 0.9
			}
		});
		Txtinstruction.setOrigin(0.5);

		// Afficher l'image de l'exemple du jeu
		let imgInstruction = this.add.image(this.game.config.width/2, this.grille.hauteurLigne*4.5, "imgInstruction");
		imgTitre.setOrigin(0.5, 0.5);
		this.grille.mettreEchelleLargeurColonne(imgInstruction, 3);

		// Bouton Retour
		let btnRetour = this.add.sprite(0, 0, "btnIntro", 6);
		this.grille.mettreEchelleLargeurColonne(btnRetour, 3);
		this.grille.placerIndexCellule(58, btnRetour);
		// On met le bouton Retour interactif
		btnRetour.setInteractive({cursor: 'pointer'});
		btnRetour.once("pointerdown", function(){
			// Détruire les éléments de la page instructions
			btnRetour.destroy();
			imgTitre.destroy();
			fondTitre.destroy();
			titreTxt.destroy();
			Txtinstruction.destroy();
			imgInstruction.destroy();
			// Appeler les fonctions
			this.sound.add("bouton").play();
			this.pageIntro();
		}, this);
		// Souris sur le bouton
		btnRetour.on("pointerover", function(){
			this.setFrame(7);
		});
		// Souris ailleurs que sur le bouton
		btnRetour.on("pointerout", function(){
			this.setFrame(6);
		});
	}

	afficherKanas(){
		// Créer un fond bleu au haut de l'écran de jeu
		let fondTitre = this.add.rectangle(game.config.width/2, 0, this.grille.largeurColonne*6, this.grille.hauteurLigne, 0x00b0ff);
		fondTitre.setOrigin(0.5,0);

		// Créer un fond blanc
		let fondBlanc = this.add.rectangle(game.config.width/2, game.config.height/2, game.config.width, game.config.height, 0xffffff);
		fondBlanc.setDepth(-1);

		// Placer le logo du jeu Manabu
		let imgTitre = this.add.image(this.game.config.width/2, this.grille.hauteurLigne*0.5, "imgManabu");
		imgTitre.setOrigin(0.5, 0.5);
		this.grille.mettreEchelleLargeurColonne(imgTitre, 3);

		// Titre de la page
		let tailleTexte = Math.round(55 * GrilleMontage.ajusterRatioX());
		let titreTxt = this.add.text(game.config.width / 2, this.grille.hauteurLigne*0.7, "Charte des kanas", {
			font: `bold ${tailleTexte}px Verdana`,
			color: "#708090",
			align: "center"
		});
		titreTxt.setOrigin(0.5, -1);

		// Afficher l'image des kanas
		let imgKanas = this.add.image(this.game.config.width/2, this.grille.hauteurLigne*5.5, "imgKanas");
		this.grille.mettreEchelleLargeurColonne(imgKanas, 6);

		// Bouton Retour
		let btnRetour = this.add.sprite(0, 0, "btnIntro", 6);
		this.grille.mettreEchelleLargeurColonne(btnRetour, 3);
		this.grille.placerIndexCellule(58, btnRetour);
		// On met le bouton Retour interactif
		btnRetour.setInteractive({cursor: 'pointer'});
		btnRetour.once("pointerdown", function(){
			// Détruire les éléments de la page kanas
			imgKanas.destroy();
			btnRetour.destroy();
			imgTitre.destroy();
			titreTxt.destroy();
			fondTitre.destroy();
			// Appeler les fonctions
			this.sound.add("bouton").play();
			this.pageIntro();
		}, this);
		// Souris sur le bouton
		btnRetour.on("pointerover", function(){
			this.setFrame(7);
		});
		// Souris ailleurs que sur le bouton
		btnRetour.on("pointerout", function(){
			this.setFrame(6);
		});
	}

	afficherScore(){
		// Créer un fond bleu au haut de l'écran de jeu
		let fondTitre = this.add.rectangle(game.config.width/2, 0, this.grille.largeurColonne*6, this.grille.hauteurLigne, 0x00b0ff);
		fondTitre.setOrigin(0.5,0);

		// Créer un fond blanc
		let fondBlanc = this.add.rectangle(game.config.width/2, game.config.height/2, game.config.width, game.config.height, 0xffffff);
		fondBlanc.setDepth(-1);

		// Placer le logo du jeu Manabu
		let imgTitre = this.add.image(this.game.config.width/2, this.grille.hauteurLigne*0.5, "imgManabu");
		imgTitre.setOrigin(0.5, 0.5);
		this.grille.mettreEchelleLargeurColonne(imgTitre, 3);

		// Titre de la page
		let tailleTexte = Math.round(60 * GrilleMontage.ajusterRatioX());
		let titreTxt = this.add.text(game.config.width / 2, this.grille.hauteurLigne*1, "Meilleurs scores", {
			font: `bold ${tailleTexte}px Verdana`,
			color: "#708090",
			align: "center"
		});
		titreTxt.setOrigin(0.5, -1);

		// Texte du score
		tailleTexte = Math.round(36 * GrilleMontage.ajusterRatioX());
		let leTexte = "Niveau tous-difficile:\n";
		leTexte += game.jeuManabu.meilleurScore + "/20"+"\n\n";
		let txtScore = this.add.text(game.config.width / 2, this.grille.hauteurLigne*5, leTexte, {
			font: `bold ${tailleTexte}px Arial`,
			color: "#708090",
			align: "center"
		});
		txtScore.setOrigin(0.5);

		// Bouton Retour
		let btnRetour = this.add.sprite(0, 0, "btnIntro", 6);
		this.grille.mettreEchelleLargeurColonne(btnRetour, 3);
		this.grille.placerIndexCellule(58, btnRetour);
		// On met le bouton Retour interactif
		btnRetour.setInteractive({cursor: 'pointer'});
		btnRetour.once("pointerdown", function(){
			// Détruire les éléments de la page kanas
			btnRetour.destroy();
			imgTitre.destroy();
			fondTitre.destroy();
			titreTxt.destroy();
			txtScore.destroy();
			// Appeler les fonctions
			this.sound.add("bouton").play();
			this.pageIntro();
		}, this);
		// Souris sur le bouton
		btnRetour.on("pointerover", function(){
			this.setFrame(7);
		});
		// Souris ailleurs que sur le bouton
		btnRetour.on("pointerout", function(){
			this.setFrame(6);
		});
	}

	verifierOrientation() {
		//On va donc utiliser une propriété de l'objet window : window.orientation
		//qui renvoie l'orientation en degrés (par incréments de 90 degrés)
		//de la fenêtre (viewport) par rapport à l'orientation naturelle de l'appareil.

		if (Math.abs(window.orientation) != 90) {
			//On met le jeu en pause et on arrête le son
			this.scene.resume(this);
			//On affiche la balise <div>
			document.getElementById("orientation").style.display = "none";
		} else {
			//On repart le jeu et le son
			this.scene.pause(this);
			//On enlève l'affichage de la balise <div>
			document.getElementById("orientation").style.display = "block";
		}
	}
}