var MedievalGame = MedievalGame || {};


MedievalGame.Score = function (game_state, position, properties) {
    "use strict";
    Phaser.Text.call(this, game_state.game, position.x, position.y, properties.text);

    this.game_state = game_state;

    this.game_state.groups[properties.group].add(this);

    this.fixedToCamera = true;
};


MedievalGame.Score.prototype = Object.create(Phaser.Text.prototype);
MedievalGame.Score.prototype.constructor = MedievalGame.Score;


MedievalGame.Score.prototype.update = function () {
    "use strict";
    this.text = "Score : " + this.game_state.prefabs.player.score;
};