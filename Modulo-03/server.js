const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

server.use(express.static('public'));
server.set('view engine', 'njk');

nunjucks.configure('views', {
  express: server,
});

server.get('/', (request, response) => {
  return response.render('courses');
});

server.get('/about', (request, response) => {
  return response.render('about');
});

server.use((request, response) => {
  response.status(404).render('not-found');
});

server.listen(3000, () => {
  console.log('Server is running: 3000!');
});
