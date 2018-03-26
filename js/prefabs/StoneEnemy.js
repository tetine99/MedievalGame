var MedievalGame = MedievalGame || {};


MedievalGame.StoneEnemy = function (game_state, position, properties) {
    "use strict";
    MedievalGame.Prefab.call(this, game_state, position, properties);

    this.game_state.game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    this.score = +properties.score;
    this.anchor.setTo(0.5);
};

MedievalGame.StoneEnemy.prototype = Object.create(MedievalGame.Prefab.prototype);
MedievalGame.StoneEnemy.prototype.constructor = MedievalGame.StoneEnemy;

MedievalGame.StoneEnemy.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);

    // if the player is below, the enemy will fall after some time
    if (this.check_player()) {
        this.fall();
    }
};

MedievalGame.StoneEnemy.prototype.check_player = function () {
    "use strict";
    var player;
    player = this.game_state.prefabs.player;
    // check if player is right below the enemy
    return (player.x > this.left && player.x < this.right && player.y > this.bottom);
};

MedievalGame.StoneEnemy.prototype.fall = function () {
    "use strict";
    // start falling
    this.body.allowGravity = true;
};