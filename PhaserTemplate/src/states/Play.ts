module PhaserTemplate {
    export class Play extends Phaser.State {
        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: PhaserTemplate.Player;

        create() {
            this.background = this.add.sprite(0, 0, 'bkg');

            this.music = this.add.audio('music', 1, false);
            this.music.play();

            this.player = new Player(this.game, 130, 284);
        }
    }
} 