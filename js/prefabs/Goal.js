var MedievalGame = MedievalGame || {};

MedievalGame.Goal = function (game_state, position, properties) {
    "use strict";

    MedievalGame.Prefab.call(this, game_state, position, properties);

    this.next_level = properties.next_level;

    this.game_state.game.physics.arcade.enable(this);

    this.anchor.setTo(0.5);
};

MedievalGame.Goal.prototype = Object.create(MedievalGame.Prefab.prototype);
MedievalGame.Goal.prototype.constructor = MedievalGame.Goal;

MedievalGame.Goal.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.reach_goal, null, this);
};

MedievalGame.Goal.prototype.reach_goal = function () {
    "use strict";
    console.log("next level");
    console.log(this.next_level);
    // start the next level
    this.game_state.game.state.start("BootState", true, false, this.next_level);
};
