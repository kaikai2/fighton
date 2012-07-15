//var _ = require('underscore');
//var mongodb = require('./lib/mongo');
var user = require('../models/user');

exports.login = function(req, res, next){
    var username = req.param('username');
    var password = req.param('password');
    user.findUserByName(username, function(err, user){
	    if (err){
	    }else{
		if (user && user.password == password){
		    req.session.user = user;
		}
	    }
	    res.redirect("back");
	});
};

exports.logout = function(req, res, next){
    delete req.session.user;
    res.redirect("back");
};
exports.index = function(req, res, next){
    res.render('login', {title: 'login', user: req.session.user});
};

exports.register = function(req, res, next){
    var username = req.param('username');
    var password = req.param('password');
    user.add(username, password, function(err){
	    if (err)
		res.send("<script>alert('" + err + "')</script>");
	    res.redirect("back");
	});
};
