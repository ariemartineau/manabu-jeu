//Importation de la classe GrilleMontage
import {
	GrilleMontage
} from "../utils/GrilleMontage.js";


/**
 * Classe représentantla scène de fin de jeu
 * @extends Phaser.Scene
 * Auteurs : Ariane Laferrière-Martineau
 * 			 et Antoine Côté-L'Écuyer
 * Date : 20-04-2020 
 */

export class SceneFinJeu extends Phaser.Scene {

	constructor() {
		super("SceneFinJeu");
	}


	create() {
		// Instancier une grille de montage avec 6 colonnes et 10 rangées
		this.grille = new GrilleMontage(this, 6, 10);
		//this.grille.afficherGrille();

		// Créer un fond bleu au haut de l'écran de jeu
		let fondTitre = this.add.rectangle(game.config.width/2, 0, this.grille.largeurColonne*6, this.grille.hauteurLigne, 0x00b0ff);
		fondTitre.setOrigin(0.5,0);

		// Placer le logo du jeu Manabu
		let imgTitre = this.add.image(this.game.config.width/2, this.grille.hauteurLigne*0.5, "imgManabu");
        imgTitre.setOrigin(0.5, 0.5);
        this.grille.mettreEchelleLargeurColonne(imgTitre, 3);

		// Titre de la page
		let tailleTexte = Math.round(64 * GrilleMontage.ajusterRatioX());

		let titreTxt = this.add.text(game.config.width / 2, this.grille.hauteurLigne*1, "Fin du jeu!", {
			font: `bold ${tailleTexte}px Verdana`,
			color: "#708090",
			align: "center"
		});
		titreTxt.setOrigin(0.5, -1);

		//Vérification et enregistrement du meilleur score
		game.jeuManabu.meilleurScore = Math.max(game.jeuManabu.score, game.jeuManabu.meilleurScore);
		localStorage.setItem(game.jeuManabu.NOM_LOCAL_STORAGE, game.jeuManabu.meilleurScore);

		// Texte du score
		tailleTexte = Math.round(36 * GrilleMontage.ajusterRatioX());
		let leTexte = "Vous avez trouvé "+ game.jeuManabu.romajisTrouves+" romajis\n\n";
		leTexte += "Votre score:\n";
		leTexte += game.jeuManabu.score + "/"+game.jeuManabu.NB_QUESTIONS+"\n\n";
		leTexte += "Meilleur score:\n";
		leTexte += game.jeuManabu.meilleurScore + "/"+this.game.jeuManabu.NB_QUESTIONS+"\n\n";

		let finJeuTxt = this.add.text(game.config.width / 2, this.grille.hauteurLigne*5, leTexte, {
			font: `bold ${tailleTexte}px Arial`,
			color: "#708090",
			align: "center"
		});
		finJeuTxt.setOrigin(0.5);

		// Bouton REJOUER
		let btnRejouer = this.add.sprite(game.config.width/2, this.grille.hauteurLigne*7.5, "btnJeu", 2);
		this.grille.mettreEchelleLargeurColonne(btnRejouer, 3);
		// On met le bouton Jouer interactif
		btnRejouer.setInteractive({cursor: 'pointer'});
		btnRejouer.once("pointerdown", function(){
			this.sound.add("bouton").play();
			this.rejouer();
		}, this);
		// Souris sur le bouton
		btnRejouer.on("pointerover", function(){
			this.setFrame(3);
		});
		// Souris ailleurs que sur le bouton
		btnRejouer.on("pointerout", function(){
			this.setFrame(2);
		});

		// Bouton MENU
		let btnMenu = this.add.sprite(game.config.width/2, this.grille.hauteurLigne*8.5, "btnJeu", 4);
		this.grille.mettreEchelleLargeurColonne(btnMenu, 3);
		// On met le bouton Jouer interactif
		btnMenu.setInteractive({cursor: 'pointer'});
		btnMenu.once("pointerdown", function(){
			this.sound.add("bouton").play();
			this.menu();
		}, this);
		// Souris sur le bouton
		btnMenu.on("pointerover", function(){
			this.setFrame(5);
		});
		// Souris ailleurs que sur le bouton
		btnMenu.on("pointerout", function(){
			this.setFrame(4);
		});
	}

	rejouer(pointer) {
		//Aller à l'écran de jeu
		this.scene.start("SceneJeu");
	}

	menu(pointer){
		//Aller à l'écran de d<introduction
		this.scene.start("SceneIntro");
	}

}