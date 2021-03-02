//Importation de la classe GrilleMontage
import {
	GrilleMontage
} from "../utils/GrilleMontage.js";


/**
 * Classe representant la scène de sélection du niveau
 * @extends Phaser.Scene
 * Auteurs : Ariane Laferrière-Martineau
 * 			 et Antoine Côté-L'Écuyer
 * Date : 20-04-2020 
 */

export class SceneNiveau extends Phaser.Scene {

	constructor() {
		super("SceneNiveau");
    }
    
    create(){
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
		let titreTxt = this.add.text(game.config.width / 2, this.grille.hauteurLigne*1, "Niveaux", {
			font: `bold ${tailleTexte}px Verdana`,
			color: "#708090",
			align: "center"
		});
		titreTxt.setOrigin(0.5, -1);
        
        // Bouton du niveau difficile
        let btnDifficile = this.add.sprite(game.config.width/2, this.grille.hauteurLigne*3.5, "btnNiveaux", 20);
        this.grille.mettreEchelleLargeurColonne(btnDifficile, 3);
		// On met le bouton Jouer interactif
		btnDifficile.setInteractive({cursor: 'pointer'});
		btnDifficile.once("pointerdown", function(){
            this.sound.add("bouton").play();
            this.scene.start("SceneJeu");
        }, this);
		// Souris sur le bouton
		btnDifficile.on("pointerover", function(){
			this.setFrame(21);
		});
		// Souris ailleurs que sur le bouton
		btnDifficile.on("pointerout", function(){
			this.setFrame(20);
        });

        // Bouton des futurs niveaux
        let btnNivVenir = this.add.sprite(game.config.width/2, this.grille.hauteurLigne*4.5, "btnNiveaux", 18);
        this.grille.mettreEchelleLargeurColonne(btnNivVenir, 3);

        // Bouton Retour
        let btnRetour = this.add.sprite(0, 0, "btnIntro", 6);
        this.grille.mettreEchelleLargeurColonne(btnRetour, 3);
        this.grille.placerIndexCellule(58, btnRetour);
        // On met le bouton Retour interactif
        btnRetour.setInteractive({cursor: 'pointer'});
        btnRetour.once("pointerdown", function(){
            this.sound.add("bouton").play();
            // Retour à la page d'intro
            this.scene.start("SceneIntro");
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
}