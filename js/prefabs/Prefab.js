var MedievalGame = MedievalGame || {};

MedievalGame.Prefab = function(game_state, position, properties) {
    "use strict";

    Phaser.Sprite.call(this, game_state.game, position.x, position.y, properties.texture);

    this.game_state = game_state;

    this.game_state.groups[properties.group].add(this);
};

MedievalGame.Prefab.prototype = Object.create(Phaser.Sprite.prototype);
MedievalGame.Prefab.prototype.constructor = MedievalGame.Prefab;
