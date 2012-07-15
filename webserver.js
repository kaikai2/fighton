
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
    , login = require('./controllers/login');

exports.init = function(port){

 var app = express.createServer();

 process.on("unhandledException", function(e){
	 console.log(e);
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

 app.get('/', routes.index);

 app.listen(port, function(){
   console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
 });
};