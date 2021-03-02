/**
 * Class representant la scène du jeu qui charge les médias.
 * @extends Phaser.Scene
 * Auteurs : Ariane Laferrière-Martineau
 * 			 et Antoine Côté-L'Écuyer
 * Date : 20-04-2020 
 */

export class SceneChargement extends Phaser.Scene {

	constructor() {
		super("SceneChargement");
	}

	preload() {
		// Partie du chemin commun aux images...
		this.load.setPath("medias/img/");

		// Charger le feuille de sprite des hiraganas
		this.load.spritesheet("hiraganas", "Spritesheet-Hiragana.png", {
			frameWidth: 256, // de chaque sprite
			frameHeight: 256, // de chaque sprite
		});
		// Charger le feuille de sprite des romajis
		this.load.spritesheet("romajis", "Spritesheet-Romaji.png", {
			frameWidth: 256, // de chaque sprite
			frameHeight: 256, // de chaque sprite
		});
		// Charger le feuille de sprite des boutons d'intro
		this.load.spritesheet("btnIntro", "Spritesheet-BtnIntro.png", {
			frameWidth: 330, // de chaque sprite
			frameHeight: 100 // de chaque sprite
		});
		// Charger le feuille de sprite des boutons du jeu
		this.load.spritesheet("btnJeu", "Spritesheet-BtnJeu.png", {
			frameWidth: 330, // de chaque sprite
			frameHeight: 100 // de chaque sprite
		});
		// Charger le feuille de sprite des boutons de niveau
		this.load.spritesheet("btnNiveaux", "Spritesheet-btnNiveau.png", {
			frameWidth: 330, // de chaque sprite
			frameHeight: 100 // de chaque sprite
		});
		// Charger le feuille de sprite des coeurs de vies
		this.load.spritesheet("coeurVies", "Spritesheet-vies.png", {
			frameWidth: 100, // de chaque sprite
			frameHeight: 100 // de chaque sprite
		});
		// Charger le feuille de sprite des bulles
		this.load.spritesheet("bulles", "Spritesheet-cercles.png", {
			frameWidth: 100, // de chaque sprite
			frameHeight: 100 // de chaque sprite
		});

		// Charger l'image du titre du jeu
		this.load.image("imgManabu", "MANABU.png");
		// Charger l'image du mauvais sens de l'appareil
		this.load.image("imgAppareil", "AppareilTourne.png");
		// Charger l'image de la charte des kanas
		this.load.image("imgKanas", "kanas.png");
		// Charger l'image de l'exemple du jeu
		this.load.image("imgInstruction", "Instructions.png");

		// Partie du chemin commun aux sons...
		this.load.setPath("medias/sons/");

		this.load.audio("sonBonClick",["coin.wav"]);
		this.load.audio("sonFin",["fail.wav"]);

		// Charger le son du clic sur un bouton
		this.load.audio("bouton",["bouton.mp3", "bouton.ogg"]);
		// Charger le son de la scène de fin
		this.load.audio("gameOver",["gameOver.mp3", "gameOver.ogg"]);
		// Charger le son du clic sur une bonne réponse
		this.load.audio("clicBulle",["clicBulle.mp3", "clicBulle.ogg"]);
		// Charger le son du clic sur une mauvaise réponse
		this.load.audio("mauvaiseReponse",["mauvaiseReponse.mp3", "mauvaiseReponse.ogg"]);
	}

	create() {
		this.scene.start("SceneIntro");
	}
}