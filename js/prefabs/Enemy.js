var MedievalGame = MedievalGame || {};

MedievalGame.Enemy = function(game_state, position, properties) {
    "use strict";
    MedievalGame.Prefab.call(this, game_state, position, properties);

    this.walking_speed = +properties.walking_speed;
    this.walking_distance = +properties.walking_distance;
    this.score = +properties.score;

    // saving previous x to keep track of walked distance
    this.previous_x = this.x;

    this.game_state.game.physics.arcade.enable(this);
    this.body.velocity.x = properties.direction * this.walking_speed;

    this.scale.setTo(-properties.direction, 1);

    this.anchor.setTo(0.5);
};

MedievalGame.Enemy.prototype = Object.create(MedievalGame.Prefab.prototype);
MedievalGame.Enemy.prototype.constructor = MedievalGame.Enemy;

MedievalGame.Enemy.prototype.update = function() {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);

    // change the direction if walked the maximum distance
    if (Math.abs(this.x - this.previous_x) >= this.walking_distance) {
        this.switch_direction();
    }
};

MedievalGame.Enemy.prototype.switch_direction = function() {
    "use strict";
    this.body.velocity.x *= -1;
    this.previous_x = this.x;
    this.scale.setTo(-this.scale.x, 1);
};
