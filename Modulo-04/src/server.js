const express = require('express');
const nunjucks = require('nunjucks');
const methoOverride = require('method-override');

const routes = require('./routes');

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(methoOverride('_method'));
server.use(routes);
server.set('view engine', 'njk');

nunjucks.configure('src/app/views', {
  express: server,
  noCache: true,
  autoescape: false,
});

server.listen(5001, () => {
  console.log('Server is running: 5001!');
});
