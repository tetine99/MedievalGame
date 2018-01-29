var MedievalGame = MedievalGame || {};


MedievalGame.Coin = function (game_state, position, properties) {
    "use strict";

    MedievalGame.Prefab.call(this, game_state, position, properties );

    this.score = +properties.score;

    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.allowGravity = false;  
    this.scale.setTo(0.5,0.5);
    this.anchor.setTo(0.5);

};

MedievalGame.Coin.prototype = Object.create(MedievalGame.Prefab.prototype);
MedievalGame.Coin.prototype.constructor = MedievalGame.Coin;

MedievalGame.Coin.prototype.update = function() {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);

    this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.collect_coin, null, this);
};

MedievalGame.Coin.prototype.collect_coin = function(coin , player) {
    "use strict";
    this.kill();
    player.score += this.score;
}