var MedievalGame = MedievalGame || {};

MedievalGame.Item = function (game_state, position, properties) {
    "use strict";

    MedievalGame.Prefab.call(this, game_state, position, properties);

    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.allowGravity = false;

    this.anchor.setTo(0.5);
};

MedievalGame.Item.prototype = Object.create(MedievalGame.Prefab.prototype);
MedievalGame.Item.prototype.constructor = MedievalGame.Item;

MedievalGame.Item.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.collect_item, null, this);
};

MedievalGame.Item.prototype.collect_item = function () {
    "use strict";
    // by default, the item is destroyed when collected
    this.kill();
};