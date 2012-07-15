var mongoose = require('mongoose');

exports.init = function(host, dbname){
    mongoose.connect(['mongodb:/', host, dbname].join('/'));
};

exports.destroy = function(callback){
    mongoose.disconnect(callback);
};