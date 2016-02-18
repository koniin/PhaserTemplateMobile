module PhaserTemplate {
    export class Game extends Phaser.Game {
        constructor() {
            super(544, 320, Phaser.CANVAS, 'gamecontainer', null, false, false);
            
            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Play', Play, false);

            this.state.start('Boot');
        }
    }
} 