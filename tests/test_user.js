"use stricts";

var async = require('async');
var db = require('../db');

var user = require('../models/user');
db.init('localhost', 'test');
async.waterfall([
   function(callback){
       user.add('kaikai', '123456', callback);
   },
   function(callback){
       user.all(callback);
   },
   function(users, callback){
       db.destroy(function(){
	       callback(null, users);
	   });
   }
   ], function(err, users){
       console.log(err, users);
   });
