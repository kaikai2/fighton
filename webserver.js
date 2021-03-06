
/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , routes = require('./routes')
    , search = require('./controllers/search')
    , login = require('./controllers/login');

exports.init = function(port){

 var app = express.createServer();

 process.on("unhandledException", function(e){
	 console.log(e, e.stack);
 });

 // Configuration

 app.configure(function(){
   app.set('views', __dirname + '/views');
   app.set('view engine', 'ejs');
   app.use(express.bodyParser());
   app.use(express.cookieParser());
   app.use(express.session({secret: 'fighton one'}));
   app.use(express.methodOverride());
   app.use(app.router);
   app.use(express.static(__dirname + '/public'));
 });

 app.configure('development', function(){
   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
 });

 app.configure('production', function(){
   app.use(express.errorHandler());
 });

 // Routes
 
 app.post('/login', login.login);
 app.post('/logout', login.logout);
 app.post('/register', login.register);
 app.get('/login', login.index);
 app.get('/search', search.index);
 app.get('/', routes.index);
 app.get('/:module', function(req, res, next){
	var path = __dirname + '/views/' + req.params.module + '.*';
	fs.exists(path, function(exists){
		if (exists){
			 try{
				 console.log(req.params.module);
				 res.render(req.params.module, { title: 'FightOn - express page', user: req.session.user});
			 }catch(e){
				 console.log(e);
			 }
		}else{
			next();
		}
	});
});
 app.listen(port, function(){
   console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
 });
};