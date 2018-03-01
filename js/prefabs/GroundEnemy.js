var MedievalGame = MedievalGame || {};

MedievalGame.GroundEnemy = function (game_state, position, properties) {
    "use strict";

    MedievalGame.Enemy.call(this, game_state, position, properties);

    this.animations.add("walk", [0, 1, 2, 3], 10, true);
    this.animations.play('walk');
};

MedievalGame.GroundEnemy.prototype = Object.create(MedievalGame.Enemy.prototype);
MedievalGame.GroundEnemy.prototype.constructor = MedievalGame.GroundEnemy;

MedievalGame.GroundEnemy.prototype.update = function () {
    "use strict";
    MedievalGame.Enemy.prototype.update.call(this);
    if (this.body.blocked.down && !this.has_tile_to_walk()) {
        this.switch_direction();
    }
};

MedievalGame.GroundEnemy.prototype.has_tile_to_walk = function () {
    "use strict";
    var direction, position_to_check, map, next_tile;
    direction = (this.body.velocity.x < 0) ? -1 : 1;
    // check if the next position has a tile
    position_to_check = new Phaser.Point(this.x + (direction * this.game_state.map.tileWidth), this.bottom + 1);
    map = this.game_state.map;
    // getTileWorldXY returns the tile in a given position
    next_tile = map.getTileWorldXY(position_to_check.x, position_to_check.y, map.tileWidth, map.tileHeight, "collision");
    return next_tile !== null;
};