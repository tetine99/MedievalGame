var MedievalGame = MedievalGame || {};

MedievalGame.Player = function(game_state, position, properties) {
    "use strict";
    MedievalGame.Prefab.call(this, game_state, position, properties);
    this.walking_speed = +properties.walking_speed;
    this.jumping_speed = +properties.jumping_speed;
    this.bouncing = +properties.bouncing;
    this.score = 0;

    this.game_state.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    this.animations.add("gauche", [49, 50, 51, 52, 53, 54], 10, true);
    this.animations.add("droite", [17, 18, 19, 20, 21, 22], 10, true);

    this.frame = 10;
    this.anchor.setTo(0.5);

    this.cursors = this.game_state.game.input.keyboard.createCursorKeys();
};

MedievalGame.Player.prototype = Object.create(MedievalGame.Prefab.prototype);
MedievalGame.Player.prototype.constructor = MedievalGame.Player;

MedievalGame.Player.prototype.update = function() {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    this.game_state.game.physics.arcade.collide(this, this.game_state.groups.enemies, this.hit_enemy, null, this);

    if (this.cursors.right.isDown && this.body.velocity.x >= 0) {
        // move right
        this.body.velocity.x = this.walking_speed;
        this.animations.play("droite");
        this.scale.setTo(1, 1);

    } else if (this.cursors.left.isDown && this.body.velocity.x <= 0) {
        // move left
        this.body.velocity.x = -this.walking_speed;
        this.animations.play("gauche");
        this.scale.setTo(1, 1);

    } else {

        // stop
        this.body.velocity.x = 0;
        this.animations.stop();
        this.frame = 17;


    }

    // jump only if touching a tile
    if (this.cursors.up.isDown && this.body.blocked.down) {
        this.body.velocity.y = -this.jumping_speed;
    }

    // dies if touches the end of the screen
    if (this.bottom >= this.game_state.game.world.height) {
        this.game_state.restart_level();
    }
};

MedievalGame.Player.prototype.hit_enemy = function(player, enemy) {
    "use strict";
    // if the player is above the enemy, the enemy is killed, otherwise the player dies
    if (enemy.body.touching.up) {
        this.score += enemy.score;
        enemy.kill();
        player.y -= this.bouncing;
    } else {
        this.game_state.restart_level();
    }
};
