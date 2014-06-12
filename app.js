var express = require('express')
, http = require('http')
, load = require('express-load')
, path = require('path')
, logfmt = require('logfmt')
, favicon = require('static-favicon')
, session = require('express-session')
, cookieParser = require('cookie-parser')
, methodOverride = require('method-override')
, compress = require('compression')
, bodyParser = require('body-parser')
, app = express();

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(logfmt.requestLogger());
app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser());
app.use(session);
app.use(express.static(path.join(__dirname, 'public')));
app.use(compress());

load('controllers', { cwd: 'app' })
  .then('routes')
  .into(app);

var port = Number(process.env.PORT || 3000);

app.listen(port, function(){
  console.log('running Rafael Jesus Web Site on port ' + port);
});

module.exports = app;