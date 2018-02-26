var MedievalGame = MedievalGame || {};

MedievalGame.Checkpoint = function (game_state, position, properties) {
    "use strict";
    MedievalGame.Prefab.call(this, game_state, position, properties);

    this.checkpoint_reached = false;

    this.game_state.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5);

    this.frame = 0;

};

MedievalGame.Checkpoint.prototype = Object.create(MedievalGame.Prefab.prototype);
MedievalGame.Checkpoint.prototype.constructor = MedievalGame.Checkpoint;

MedievalGame.Checkpoint.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.reach_checkpoint, null, this);
};

MedievalGame.Checkpoint.prototype.reach_checkpoint = function () {
    "use strict";

    this.frame = 1;
    // checkpoint was reached
    this.checkpoint_reached = true;

};