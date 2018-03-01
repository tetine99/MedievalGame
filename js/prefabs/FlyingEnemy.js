var MedievalGame = MedievalGame || {};

MedievalGame.FlyingEnemy = function(game_state, position, properties) {
    "use strict";
    MedievalGame.Enemy.call(this, game_state, position, properties);

    // flying enemies are not affected by gravity
    this.body.allowGravity = false;


};

MedievalGame.FlyingEnemy.prototype = Object.create(MedievalGame.Enemy.prototype);
MedievalGame.FlyingEnemy.prototype.constructor = MedievalGame.FlyingEnemy;
