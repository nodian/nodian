// requires
var express = require('express');
app = express();

var server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  path = require('path'),
  fs = require('fs'),
  path = require('path'),
  ejs = require('ejs-locals'),
  childprocs = require('./lib/childprocs');
// nodian config
var nodianConfig = {};
if (fs.existsSync('./nodian.json')) {
  nodianConfig = require('./nodian.json');
}
// set up default prj dir - used in the absence of a 'path' query string
if (!nodianConfig.projectsDir) nodianConfig.projectsDir = path.join(__dirname, 'nodian/projects');
if (!nodianConfig.framesUrl1) nodianConfig.framesUrl1 = "http://localhost:3000";
if (!nodianConfig.framesUrl2) nodianConfig.framesUrl2 = "http://localhost:8080/debug?port=5858";

app.set('nodianConfig', nodianConfig);
// initialize locals
app.locals({
  metaTitle: 'Nodian',
  templates: fs.readFileSync('./public/html/templates.html')
});
// register .html extension
app.engine('html', ejs);
// configure
var port = process.env.PORT || 4389;
var sessionStore = new express.session.MemoryStore({
  reapInterval: 60000 * 10
});
app.configure(function() {
  app.set('port', port);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'html');
  app.use(express.cookieParser());
  app.use(express.session({
    store: sessionStore,
    secret: 'nodianeng',
    key: 'sid'
  }));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.favicon());
  app.use(express.compress());
  if (nodianConfig.users) {
    app.use(express.basicAuth(function(user, pass, callback) {
      callback(null, nodianConfig.users[user] == pass);
    }));
  }
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});
app.configure('development', function() {
  app.use(express.logger('dev'));
  app.use(express.errorHandler());
});
process.on('uncaughtException', function(err) {
  console.error(err.stack);
});
// routing
require('./lib/routing').configure();
// initialize server / start listening
server.listen(port, function() {
  console.log('Listening on ' + port);
});
// child processes
childprocs.connect(io, sessionStore);
app.set('childprocs', childprocs);