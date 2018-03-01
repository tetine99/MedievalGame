var MedievalGame = MedievalGame || {};

MedievalGame.FireballItem = function (game_state, position, properties) {
    "use strict";
    MedievalGame.Item.call(this, game_state, position, properties);

};
MedievalGame.FireballItem.prototype = Object.create(MedievalGame.Item.prototype);
MedievalGame.FireballItem.prototype.constructor = MedievalGame.FireballItem;

MedievalGame.FireballItem.prototype.collect_item = function (item, player) {
    "use strict";
    MedievalGame.Item.prototype.collect_item.call(this);
    player.shooting = true;
};