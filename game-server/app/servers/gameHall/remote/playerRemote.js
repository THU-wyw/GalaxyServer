/**
 * Created by wyw on 6/6/15.
 */

var gameHall = require('../../logic/gameHall');

exports.playerLeave = function(playerId, callback) {
    gameHall.removePlayer(playerId);
};
