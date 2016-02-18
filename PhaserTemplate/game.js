window.onload = function () {
    var game = new PhaserTemplate.Game();
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PhaserTemplate;
(function (PhaserTemplate) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'simon', 0);
            this.anchor.setTo(0.5, 0);
            this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
            game.physics.arcade.enable(this);
            game.add.existing(this);
        }
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                this.animations.play('walk');
                if (this.scale.x == 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
                this.animations.play('walk');
                if (this.scale.x == -1) {
                    this.scale.x = 1;
                }
            }
            else {
                this.animations.frame = 0;
            }
        };
        return Player;
    })(Phaser.Sprite);
    PhaserTemplate.Player = Player;
})(PhaserTemplate || (PhaserTemplate = {}));
var PhaserTemplate;
(function (PhaserTemplate) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 544, 320, Phaser.CANVAS, 'gamecontainer', null, false, false);
            this.state.add('Boot', PhaserTemplate.Boot, false);
            this.state.add('Preloader', PhaserTemplate.Preloader, false);
            this.state.add('MainMenu', PhaserTemplate.MainMenu, false);
            this.state.add('Level1', PhaserTemplate.Level1, false);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    PhaserTemplate.Game = Game;
})(PhaserTemplate || (PhaserTemplate = {}));
var PhaserTemplate;
(function (PhaserTemplate) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.init = function () {
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
            Phaser.Canvas.setImageRenderingCrisp(this.game.canvas); // For Canvas, modern approach
            Phaser.Canvas.setSmoothingEnabled(this.game.context, false); // Also for Canvas, legacy approach
            //PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST; // For WebGL
            //Cocoon.Utils.setAntialias(false); // For CocoonJS
        };
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/images/loader.png');
            this.load.image('logo', 'assets/images/bloodcake.png');
        };
        Boot.prototype.create = function () {
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
        };
        return Boot;
    })(Phaser.State);
    PhaserTemplate.Boot = Boot;
})(PhaserTemplate || (PhaserTemplate = {}));
var PhaserTemplate;
(function (PhaserTemplate) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.apply(this, arguments);
        }
        Level1.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'level1');
            this.music = this.add.audio('music', 1, false);
            this.music.play();
            this.player = new PhaserTemplate.Player(this.game, 130, 284);
        };
        return Level1;
    })(Phaser.State);
    PhaserTemplate.Level1 = Level1;
})(PhaserTemplate || (PhaserTemplate = {}));
var PhaserTemplate;
(function (PhaserTemplate) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.logo = this.add.sprite(this.world.centerX, -300, 'gametitle');
            this.logo.anchor.setTo(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
            this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level1', true, false);
        };
        return MainMenu;
    })(Phaser.State);
    PhaserTemplate.MainMenu = MainMenu;
})(PhaserTemplate || (PhaserTemplate = {}));
var PhaserTemplate;
(function (PhaserTemplate) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //  Set-up our preloader sprite
            this.logo = this.add.sprite(this.world.centerX, 100, 'logo');
            this.logo.anchor.set(0.5, 0.5);
            //this.logo.scale.set(3);
            this.preloadBar = this.add.sprite(this.world.centerX, 200, 'preloadBar');
            this.preloadBar.anchor.set(0.5, 0.5);
            this.load.setPreloadSprite(this.preloadBar);
            //  Load our actual games assets
            this.load.image('titlepage', 'assets/images/titlepage.jpg');
            this.load.image('gametitle', 'assets/images/logo.png');
            this.load.audio('music', 'assets/sound/title.mp3', true);
            this.load.spritesheet('simon', 'assets/images/simon.png', 58, 96, 5);
            this.load.image('level1', 'assets/images/level1.png');
        };
        Preloader.prototype.create = function () {
            //var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            //tween.onComplete.add(this.startMainMenu, this);
            //this.game.input.onDown.add(this.gofull, this);
        };
        Preloader.prototype.startMainMenu = function () {
            //this.game.state.start('MainMenu', true, false);
        };
        Preloader.prototype.gofull = function () {
            if (this.game.scale.isFullScreen) {
                this.game.scale.stopFullScreen();
            }
            else {
                this.game.scale.startFullScreen(false);
            }
        };
        return Preloader;
    })(Phaser.State);
    PhaserTemplate.Preloader = Preloader;
})(PhaserTemplate || (PhaserTemplate = {}));
//# sourceMappingURL=game.js.map