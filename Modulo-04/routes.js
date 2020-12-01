const express = require('express');

const routes = express.Router();

routes.get('/', (request, response) => {
  return response.redirect('teachers');
});

routes.get('/teachers', (request, response) => {
  return response.render('teachers/index');
});

routes.get((request, response) => {
  return response.status(404).render('not-found');
});

module.exports = routes;
