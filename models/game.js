var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
	name: String
});

mongoose.model('Game', GameSchema);
exports.Game = mongoose.model('Game');

