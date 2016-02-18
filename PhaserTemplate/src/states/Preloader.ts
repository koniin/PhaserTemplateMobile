module PhaserTemplate {
    export class Preloader extends Phaser.State {
        preloadBar: Phaser.Sprite;
        logo: Phaser.Sprite;
        preload() {
            //  Set-up our preloader sprite
            this.logo = this.add.sprite(this.world.centerX, 100, 'logo');
            this.logo.anchor.set(0.5, 0.5);

            this.preloadBar = this.add.sprite(this.world.centerX, 200, 'preloadBar');
            this.preloadBar.anchor.set(0.5, 0.5);
            this.load.setPreloadSprite(this.preloadBar);
 
            //  Load our actual games assets
            this.load.image('bkg', 'assets/images/bkg.png');
            this.load.image('gametitle', 'assets/images/logo.png');
            this.load.audio('music', 'assets/sound/defaultloop.wav', true);
            this.load.spritesheet('player', 'assets/images/logo.png', 58, 96, 5);
        }

        create() {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);

            this.game.input.onDown.add(this.gofull, this);
        }

        startMainMenu() {
            this.game.state.start('MainMenu', true, false);
        }

        gofull() {
            if (this.game.scale.isFullScreen) {
                this.game.scale.stopFullScreen();
            }
            else {
                this.game.scale.startFullScreen(false);
            }
        }
    }
}