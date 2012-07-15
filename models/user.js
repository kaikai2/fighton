var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
	password: String,
	geolocation: String
});

mongoose.model('User', UserSchema);
var User = mongoose.model('User');
function all(callback){
    User.find({}, callback);
}
function findUserByName(name, callback){
    User.findOne({name: name}, function(err, user){
	    if (err){
		util.log('FATAL: ' + err);
		callback(err, null);
	    }else{
		callback(null, user);
	    }
	});
}
function add(name, password, callback){
    var newUser = new User();
    newUser.name = name;
    newUser.password = password;
    newUser.geolocation ='';
    newUser.save(function(err){
	    if (err){
		util.log('FATAL: ' + err);
		callback(err);
	    }else{
		callback(null);
	    }
	});
}

function remove(id, callback){
    findUserById(id, function(err, user){
	    if (err){
		callback(err);
	    }else{
		util.log(util.inspect(user));
		user.remove();
		callback(null);
	    }
	});
};

function findUserById(id, callback){
    User.findOne({_id: id}, function(err, user){
	    if (err){
		util.log('FATAL: ' + err);
		callback(err, null);
	    }else{
		callback(null, user);
	    }
	});
}

exports.User = User;
exports.findUserById = findUserById;
exports.remove = remove;
exports.add = add;
exports.all = all;
exports.findUserByName = findUserByName;