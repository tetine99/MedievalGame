var MedievalGame = MedievalGame || {};

MedievalGame.LifeItem = function (game_state, position, properties) {
    "use strict";
    MedievalGame.Item.call(this, game_state, position, properties);

};

MedievalGame.LifeItem.prototype = Object.create(MedievalGame.Item.prototype);
MedievalGame.LifeItem.prototype.constructor = MedievalGame.LifeItem;

MedievalGame.LifeItem.prototype.collect_item = function (item, player) {
    "use strict";
    MedievalGame.Item.prototype.collect_item.call(this);
    player.lives += 1;
};