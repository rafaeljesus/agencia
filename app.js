var express = require('express')
  , load = require('express-load')
  , path = require('path')
  , logfmt = require('logfmt')
  , favicon = require('static-favicon')
  , session = require('express-session')
  , cookieParser = require('cookie-parser')
  , redisClient = require('redis').createClient()
  , RedisStore = require('connect-redis')(session)
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
app.use(session({
  secret: 'S3CRE7',
  store: new RedisStore({ client: redisClient })
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(compress());

load('controllers', { cwd: 'app' })
  .then('routes')
  .into(app);

var port = Number(process.env.PORT || 3000);

app.listen(port, function(){
  console.log('running Agencia Site on port ' + port);
});

module.exports = app;
