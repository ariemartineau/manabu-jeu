//Importation des classes nécessaires
import {
	SceneChargement
} from './scenes/SceneChargement.js';
import {
	SceneIntro
} from './scenes/SceneIntro.js';
import {
	SceneNiveau
} from './scenes/SceneNiveau.js';
import {
	SceneJeu
} from './scenes/SceneJeu.js';
import {
	SceneFinJeu
} from './scenes/SceneFinJeu.js';



//On crééra le jeu quand la page HTML sera chargée
window.addEventListener("load", function () {
	//On définit avec des variables les dimensions du jeu sur desktop
	let largeur = 576,
		hauteur = 1024;

	//On fait 2 vérifications la première pour "Mobile" et la seconde pour "Tablet"
	//Et si on est sur un mobile (tablette ou téléphone), on re-dimensionne le jeu
	if (navigator.userAgent.includes("Mobile") || navigator.userAgent.includes("Tablet")) {
		//console.log("Le jeu est lu sur un mobile... on change les dimensions...");
		largeur = Math.min(window.innerWidth, window.innerHeight);
		hauteur = Math.max(window.innerWidth, window.innerHeight);
	}

	// Object pour la configuration du jeu - qui sera passé en paramètre au constructeur
	let config = {
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
			width: largeur,
			height: hauteur,
		},
		//scene: [SceneChargement, SceneIntro, SceneJeu, SceneFinJeu],
		scene: [SceneChargement, SceneIntro, SceneNiveau, SceneJeu, SceneFinJeu],
		backgroundColor: 0xffffff,
		physics: {
			default: 'arcade',
			arcade: {
				//debug: true,
			}
		},
		//Limiter le nombre de pointeurs actifs
		input: {
			activePointers: 1,
		}
	}

	// Création du jeu comme tel - comme objet global pour qu'il soit accessible à toutes les scènes du jeu
	window.game = new Phaser.Game(config);


	window.game.jeuManabu = {
		score: 0, //Score de la partie courante
		meilleurScore: 0, //Meilleur score antérieur enregistré	
		romajisTrouves:0, // Nombre de romaji trouvé par le joueur	
		NOM_LOCAL_STORAGE: "scoreJeuManabu" ,//Sauvegarde et enregistrement du meilleur score pour ce jeu 
		NB_REPONSES: 5,
		NB_QUESTIONS: 0 // Limiter le nombre de kanas demander a chaque partie
	}

}, false);