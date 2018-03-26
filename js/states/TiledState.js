var MedievalGame = MedievalGame || {};

MedievalGame.TiledState = function () {
    "use strict";
    Phaser.State.call(this);

    this.prefab_classes = {
        "player": MedievalGame.Player.prototype.constructor,
        "ground_enemy": MedievalGame.GroundEnemy.prototype.constructor,
        "fly_enemy": MedievalGame.FlyingEnemy.prototype.constructor,
        "running_enemy": MedievalGame.RunningEnemy.prototype.constructor,
        "stone_enemy": MedievalGame.StoneEnemy.prototype.constructor,
        "goal": MedievalGame.Goal.prototype.constructor,
        "checkpoint": MedievalGame.Checkpoint.prototype.constructor,
        "coin": MedievalGame.Coin.prototype.constructor,
        "score": MedievalGame.Score.prototype.constructor,
        "lives": MedievalGame.Lives.prototype.constructor,
        "life_item": MedievalGame.LifeItem.prototype.constructor,
        "fireball_item": MedievalGame.FireballItem.prototype.constructor,
    }
};

MedievalGame.TiledState.prototype = Object.create(Phaser.State.prototype);
MedievalGame.TiledState.prototype.constructor = MedievalGame.TiledState;

MedievalGame.TiledState.prototype.init = function (level_data) {
    "use strict";
    this.level_data = level_data;

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    // start physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;


    // create map and set tileset
    this.map = this.game.add.tilemap(level_data.map.key);
    var tileset_index = 0;


    this.map.tilesets.forEach(function (tileset) {
        this.map.addTilesetImage(tileset.name, level_data.map.tileset[tileset_index]);
        tileset_index += 1;
    }, this);
};

MedievalGame.TiledState.prototype.create = function () {
    "use strict";
    var group_name, object_layer, collision_tiles;

    // create map layers
    this.layers = {};
    this.map.layers.forEach(function (layer) {
        this.layers[layer.name] = this.map.createLayer(layer.name);

        if (layer.properties.collision) { // collision layer

            collision_tiles = [];
            layer.data.forEach(function (data_row) { // find tiles used in the layer
                data_row.forEach(function (tile) {

                    // check if it's a valid tile index and isn't already in the list
                    if (tile.index > 0 && collision_tiles.indexOf(tile.index) === -1) {
                        collision_tiles.push(tile.index);

                    }
                }, this);
            }, this);
            this.map.setCollision(collision_tiles, true, layer.name);
        }
    }, this);

    // resize the world to be the size of the current layer
    this.layers[this.map.layer.name].resizeWorld();

    // create groups
    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);

    this.prefabs = {};
    for (object_layer in this.map.objects) {
        if (this.map.objects.hasOwnProperty(object_layer)) {
            // create layer objects
            this.map.objects[object_layer].forEach(this.create_object, this);
        }
    }
    this.init_hud();
    this.game.camera.follow(this.prefabs.player);
};

MedievalGame.TiledState.prototype.create_object = function (object) {
    "use strict";
    var position, prefab;    // tiled coordinates starts in the bottom left corner

    position = {
        "x": object.x + (this.map.tileHeight / 2),
        "y": object.y - (this.map.tileHeight / 2)
    };
    if (this.prefab_classes.hasOwnProperty(object.type)) {
        prefab = new this.prefab_classes[object.type](this, position, object.properties);
    }
    this.prefabs[object.name] = prefab;
};

MedievalGame.TiledState.prototype.restart_level = function () {
    "use strict";
    // restart the game only if the checkpoint was not reached
    if (this.prefabs.checkpoint.checkpoint_reached) {
        this.prefabs.player.x = this.prefabs.checkpoint.x;
        this.prefabs.player.y = this.prefabs.checkpoint.y;
    } else {
        localStorage.player_lives = this.prefabs.player.lives;
        this.game.state.restart(true, false, this.level_data);
    }
};

// When player haven't life we restart the game at the begenning
MedievalGame.TiledState.prototype.game_over = function () {
    "use strict";
    localStorage.clear();
    this.game.state.start("BootState", true, false, "assets/levels/level1_data.json");
};

MedievalGame.TiledState.prototype.init_hud = function () {
    "use strict";
    // on crée le score et on l'affiche en haut
    var score_position, score, lives_position, lives;
    score_position = new Phaser.Point(20, 20);
    score = new MedievalGame.Score(this, score_position, {
        "text": "Score: 0", "group": "hud"
    });
    this.prefabs["score"] = score;

    // on crée les vies et on les affiche en haut
    lives_position = new Phaser.Point(this.game.world.width * 0.42, 20);
    lives = new MedievalGame.Lives(this, lives_position, {
        "texture": "heart",
        "group": "hud",
        "frame": 4,
        "spacing": 16
    });


    this.prefabs["lives"] = lives;
};