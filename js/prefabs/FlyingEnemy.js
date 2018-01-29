var MedievalGame = MedievalGame || {};

MedievalGame.FlyingEnemy = function(game_state, position, properties) {
    "use strict";
    MedievalGame.Enemy.call(this, game_state, position, properties);

    // flying enemies are not affected by gravity
    this.body.allowGravity = false;

    this.animations.add("flying", [0, 1], 5, true);
    this.animations.play("flying");
};

MedievalGame.FlyingEnemy.prototype = Object.create(MedievalGame.Enemy.prototype);
MedievalGame.FlyingEnemy.prototype.constructor = MedievalGame.FlyingEnemy;