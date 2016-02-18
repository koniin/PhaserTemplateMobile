module PhaserTemplate {
    export class Boot extends Phaser.State {
        init() {
            document.body.style.backgroundColor = '#000000';
            this.stage.backgroundColor = '#0a0b0f';
            
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.maxWidth = window.innerWidth;
            this.scale.maxHeight = window.innerHeight;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            
            // this is HACK ;)
            this.scale.updateLayout();

            this.scale.refresh();

            Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);  // For Canvas, modern approach
            Phaser.Canvas.setSmoothingEnabled(this.game.context, false);  // Also for Canvas, legacy approach
            //PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST; // For WebGL
            //Cocoon.Utils.setAntialias(false); // For CocoonJS
        }

        preload() {
            this.load.image('preloadBar', 'assets/images/loader.png');
            this.load.image('logo', 'assets/images/bloodcake.png');
        }

        create() {
            var gameDiv = document.getElementById("gamecontainer");

            // Align Vertically
            var extraSpaceVer = window.innerHeight - gameDiv.clientHeight;
            if (extraSpaceVer !== 0) {
                gameDiv.style.marginTop = extraSpaceVer / 2 + "px";
            }

            // Align Horizontally
            var extraSpaceHor = window.innerWidth - gameDiv.clientWidth;
            if (extraSpaceHor !== 0) {
                gameDiv.style.marginLeft = extraSpaceHor / 2 + "px";
            }

            this.physics.startSystem(Phaser.Physics.ARCADE);

            this.game.state.start('Preloader');
        }
    }
}