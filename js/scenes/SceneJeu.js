//Importation de la classe GrilleMontage
import {
	GrilleMontage
} from "../utils/GrilleMontage.js";


/**
 * Classe representant la scène du jeu
 * @extends Phaser.Scene
 * Auteurs : Ariane Laferrière-Martineau
 * 			 et Antoine Côté-L'Écuyer
 * Date : 20-04-2020 
 */

export class SceneJeu extends Phaser.Scene {

	constructor() {
		super("SceneJeu");

		//Propriétés ou objets du jeu
		this.scoreTxt = null; // Objet de type text pour afficher le score au fur et à mesure
		this.tableauVies = []; // Tableau contenant les images de coeurs
		this.grille = null; // La grille pour la mise en page du jeu
		this.tableauHiragana = []; // Tableau qui contient les hiraganas a,e,i,o,u et plus (p-e pas besoin)
		this.tableauRomaji = []; //Tableau qui contient tous les romajis
		this.tableauQuestions = []; // Tableau qui va contenir les questions - en images...
		this.tableauReponses = []; // Tableau qui va contenir le choix de réponse - en termes
		this.kanaTxt = null; // La question sous forme de texte
		this.hiragana = null; // le hiragana à trouver
		this.groupeReponses = null;

		//Vérification d'un meilleur score antérieur enregistré
		game.jeuManabu.meilleurScore = localStorage.getItem(game.jeuManabu.NOM_LOCAL_STORAGE) === null ? 0 : localStorage.getItem(game.jeuManabu.NOM_LOCAL_STORAGE);
	}


	init() {
		//Initialiser le score
		game.jeuManabu.score = 0;
		game.jeuManabu.romajisTrouves = 0;

		//Réinitialiser les listes ici....
		this.tableauHiragana = [];
		this.tableauRomaji = [];
		this.tableauQuestions = [];
		this.tableauReponses = [];
		this.tableauVies = [];
	}

	create() {
		// Instancier une grille de montage avec 6 colonnes et 10 rangées
		this.grille = new GrilleMontage(this, 6, 10);
		//this.grille.afficherGrille();

		// Selon le niveau que le joueur choisiras, le nombre de questions posées changera
		this.game.jeuManabu.NB_QUESTIONS = 20;

		// Si on veut faire un très grand questionnaire mixte, on peut faire plusieurs boucles for
		// Tableay=u qui contient les hiraganas à trouver
		// le i représente le nombre de sprite présent dans la spritesheet
		for (let i = 0; i < 46; i++) {
			//this.tableauQuestions.push(unHiragana);
			this.tableauHiragana.push(i);
		}

		for (let i = 0; i < this.game.jeuManabu.NB_QUESTIONS; i++) {
			let unRandom = Phaser.Utils.Array.RemoveRandomElement(this.tableauHiragana);
			this.tableauQuestions.push(unRandom);
		}

		// Tableau qui contient les réponses sous forme de romaji
		// le i représente le nombre de sprite présent dans la spritesheet
		for (let i = 0; i < 46; i++) {
			this.tableauRomaji.push(i);
		}

		//Mettre l'écouteur sur la scène
		this.input.on('gameobjectdown', this.cliquerReponse, this);

		// On varie aléatoirement l'emplacement des kanas
		Phaser.Utils.Array.Shuffle(this.tableauQuestions);

		// On enleve un élément de ce tableau pour l'injecter comme première question
		let premierKana = this.tableauQuestions.shift();
		//console.log("premierKana", premierKana);

		// On va à la fonction qui affiche la question et le score
		this.afficherTextesEtHiragana(premierKana);

		// On va à la fonction qui gère les choix de réponses
		this.peuplerAfficherTableauChoixReponses(premierKana);

		// Créer un fond bleu au haut de l'écran de jeu
		let fondTitre = this.add.rectangle(game.config.width/2, 0, this.grille.largeurColonne*6, this.grille.hauteurLigne, 0x00b0ff);
		fondTitre.setOrigin(0.5,0);

		// Placer le logo du jeu Manabu
		let imgTitre = this.add.image(0, 0, "imgManabu");
		imgTitre.setOrigin(0.5, 0.5);
		this.grille.placerIndexCellule(1, imgTitre);
		this.grille.mettreEchelleHauteurLigne(imgTitre, 0.8);

		//Créer 4 icones de coeur pour les vies du jouer
		for(let i=0; i<4; i++){
			this.imgVies = this.add.sprite(0, 0, "coeurVies", Phaser.Math.Between(0, 10))
			this.imgVies.setOrigin(0.5, 0.5);
			this.grille.mettreEchelleHauteurLigne(this.imgVies, 0.7);
			this.grille.placerIndexCellule(7+i, this.imgVies);
			this.tableauVies.push(this.imgVies);
		}

		// Afficher le bouton quitter
		let btnQuitter = this.add.sprite(game.config.width/2, this.grille.hauteurLigne*9.5, "btnJeu", 0);
		this.grille.mettreEchelleLargeurColonne(btnQuitter, 3);
		btnQuitter.setOrigin(0.5, 1);
		// On met le bouton Retour interactif
		btnQuitter.setInteractive({cursor: 'pointer'});
		btnQuitter.once("pointerdown", function(){
			this.sound.add("gameOver").play();
			this.debuterFinJeu();
		}, this);
		// Souris sur le bouton
		btnQuitter.on("pointerover", function(){
			this.setFrame(1);
		});
		// Souris ailleurs que sur le bouton
		btnQuitter.on("pointerout", function(){
			this.setFrame(0);
		});
	}


	/** 
	 * Fonction qui affiche le texte dans la page, ajoute le hiragana à trouver
	 * @params {} idKana : le id qui correspond au Kana qu'on veut trouver
	 * @return : none
	 */
	afficherTextesEtHiragana(idKana) {

		//Mettre les textes
		let tailleTexte = Math.round(30 * GrilleMontage.ajusterRatioX());
		let style = {
			font: `bold ${tailleTexte}px Verdana`,
			color: "#000000",
			align: "center"
		}

		this.kanaTxt = this.add.text(game.config.width/2, this.grille.hauteurLigne*3, "Trouver le bon romaji", style);
		this.kanaTxt.setOrigin(0.5, 0.5);

		// Afficher l'image du hiragana à trouver
		this.hiragana = this.add.sprite(game.config.width/2, this.grille.hauteurLigne*4, "hiraganas", idKana);
		this.hiragana.idKana = idKana;
		this.hiragana.setOrigin(0.5, 0.5);

		//Dimensionner le kana
		this.grille.mettreEchelleProportionMaximale(this.hiragana);

		//Affichage du score
		//Texte
		tailleTexte = Math.round(36 * GrilleMontage.ajusterRatioX());
		let leScore = "Score: ";
		leScore += game.jeuManabu.score;

		this.scoreTxt = this.add.text(0, 0, leScore, {
			font: `bold ${tailleTexte}px Arial`,
			color: "#000000",
			align: "center"
		});
		this.scoreTxt.setOrigin(0.5, 0.5);
		this.grille.placerIndexCellule(4, this.scoreTxt);
		this.scoreTxt.setDepth(1);
	}

	/** 
	 * Fonction qui rempli le tableau des choix de réponses du quiz et l'affiche
	 * On prend un kana et on rempli le reste avec le tableau des romajis en aléatoire
	 * 
	 * @param {} kana : valeur prise du tableau de question qui correspond à la bonne réponse
	 * @return {} none
	 */
	peuplerAfficherTableauChoixReponses(kana) {
		//Réinitialise le tableau
		//On enlève et détruit les images existantes - tant qu'il y en a dans le tableau...
		while (this.tableauReponses.length > 0) {
			let image = this.tableauReponses.shift();
			image.destroy();
			//console.log(this.tableauReponses.length);
		}

		//On créé le tableau pour les choix actuels et on ajoute le bon kana dans les choix de réponses
		let lesChoixReponsesActuels = [];
		lesChoixReponsesActuels.push(kana);

		//***** Et on enlève ce choix dans les choix de réponse.... MAIS avant on va copier le tableau des Romaji
		let tousLeschoixReponses = this.tableauRomaji.concat();
		tousLeschoixReponses.splice(kana, 1);

		//Boucle for pour créer le choix de réponses
		//pour le nombre de réponses possibles indiquées dans les settings
		for (let i = 0; i < this.game.jeuManabu.NB_REPONSES; i++) {
			//On sort un index de romaji au hazard
			let unRomaji = Phaser.Utils.Array.RemoveRandomElement(tousLeschoixReponses);

			//On le pousse dans le tableau des choix de réponses actuelles
			lesChoixReponsesActuels.push(unRomaji);
		}

		// Shuffle les valeurs pour créer un choix de réponse aléatoire
		Phaser.Utils.Array.Shuffle(lesChoixReponsesActuels);

		//Boucle for pour afficher les choix de réponses sur la page - dans this.tableauReponses
		for (let i = 0; i < lesChoixReponsesActuels.length; i++) {
			let ceKana = lesChoixReponsesActuels[i];

			//il faut ajouter les sprites dans quelque chose pour pouvoir y avoir accès
			let uneReponse = this.add.sprite(0, 0, "romajis", ceKana);
			this.tableauReponses.push(uneReponse);

			//Et on donne à cette réponse le id qui correspond à son kana
			uneReponse.idKana = ceKana;

			//Pour définir on commence à mettre les réponses où dans la grille
			//let cellule = 36;
			this.grille.placerIndexCellule(36 + i, uneReponse);
			this.grille.mettreEchelleProportionMaximale(uneReponse, 0.8);

			//Mettre les blocs interactifs
			uneReponse.setInteractive()
			uneReponse.on('click', this.cliquerReponse, this);
		}

	}

	/**
	 * Fonction qui s'occuper de choisir le prochain kana tant qu'il en reste dans le tableau
	 */
	choisirKana() {
		//Identifier un autre kana à trouver au hasard
		//S'il ne reste plus kanas à trouver, le jeu est terminé
		if (this.tableauQuestions.length != 0) {

			//Enlever le premier element du tableau et le mémoriser
			let ceKana = this.tableauQuestions.shift();

			//On change l'image de l'hiragana et on mémorise le nouvel index
			this.hiragana.setFrame(ceKana);
			this.hiragana.idKana = ceKana;

			//On change le choix des réponses
			this.peuplerAfficherTableauChoixReponses(ceKana);

		} else {
			//C'est la fin du jeu...
			this.debuterFinJeu();
		}
	}

	/**
	 * 
	 * @param {*} pointer 
	 * @param {*} cible 
	 */
	cliquerReponse(pointer, cible) {
		//Désactiver l'interactivité sur ce bloc MODIFIÉ	
		cible.removeInteractive();
		console.log(cible.idKana, this.hiragana.idKana);

		if (cible.idKana === this.hiragana.idKana) {

			// Joue le son qui confirme une bonne réponse
			this.sound.add("clicBulle").play();

			// On incrémente le score
			this.game.jeuManabu.score++;

			// On incrémente le nombre de romaji trouvé
			this.game.jeuManabu.romajisTrouves++;

			// On change le score affiché actuellement
			this.scoreTxt.text = "Score: " + this.game.jeuManabu.score;

			// On change le Hiragana à trouver
			this.choisirKana();

		} else {
			// Décrémente la vie du joueur
			let viePerdue = this.tableauVies.shift();
			viePerdue.destroy();

			// Jouer le son d'erreur
			this.sound.add("mauvaiseReponse").play();

			// Si le score est plus bas que 0, on envoie dans la fonction qui arrête le jeu
			if(this.tableauVies.length == 0){
				this.sound.add("gameOver").play();
				this.debuterFinJeu();
			}
			// Sinon on continue la partie
			else{this.choisirKana();}

			// On change le score affiché actuellement
			this.scoreTxt.text = "Score: " + this.game.jeuManabu.score;
		};

	}

	debuterFinJeu() {
		//On part un timer pour aller à la fin du jeu
		this.time.addEvent({
			delay: 100,
			callback: this.allerFinJeu,
			callbackScope: this
		});
	}

	allerFinJeu() {
		//On va à la scène de la fin du jeu
		this.scene.start("SceneFinJeu");
	}

}