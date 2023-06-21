const bodyParser = require('body-parser');
const cluster = require('cluster');
const dotenv = require('dotenv');
const express = require('express');
const favicon = require('serve-favicon');
const i18n = require('i18n');
const http = require('http');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const numCPUs = process.env.WEB_CONCURRENCY || require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++)
    cluster.fork();

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  const server = http.createServer(app);

  dotenv.config({ path: path.join(__dirname, '.env') });

  const PORT = 8080;
  const MAX_SERVER_UPLOAD_LIMIT = 52428800;
  const MAX_SERVER_PARAMETER_LIMIT = 50000;
  const QUERY_LIMIT = 100;

  const indexRouteController = require('./routes/indexRoute');

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  i18n.configure({
    locales: ['en', 'tr'],
    directory: path.join(__dirname, 'translations'),
    defaultLocale: 'tr',
    queryParameter: 'lang',
    cookie: 'lang',
  });

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(cookieParser());
  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(bodyParser.json({ limit: MAX_SERVER_UPLOAD_LIMIT }));
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: MAX_SERVER_UPLOAD_LIMIT,
    parameter: MAX_SERVER_PARAMETER_LIMIT
  }));

  const sessionOptions = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  });

  app.use(sessionOptions);
  app.use(i18n.init);

  app.use((req, res, next) => {
    if (!req.query || typeof req.query != 'object')
      req.query = {};
    if (!req.body || typeof req.body != 'object')
      req.body = {};

    res.locals.QUERY_LIMIT = QUERY_LIMIT;
    req.query.limit = QUERY_LIMIT;

    next();
  });

  app.use('/', indexRouteController);

  server.listen(PORT, () => {
    console.log(`Server is on port ${PORT} as Worker ${cluster.worker.id} running @ process ${cluster.worker.process.pid}`);
  });
}