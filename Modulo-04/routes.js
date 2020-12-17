const express = require('express');

const teachers = require('./teachers');

const routes = express.Router();

routes.get('/', (request, response) => {
  return response.redirect('teachers');
});

routes.get('/teachers', (request, response) => {
  return response.render('teachers/index');
});

routes.get('/teachers/create', (request, response) => {
  return response.render('teachers/create');
});

routes.post('/teachers', teachers.create);

routes.get('/teachers/:id', teachers.show);

routes.get('/teachers/:id/edit', teachers.edit);

routes.put('/teachers', teachers.update);

routes.delete('/teachers', teachers.delete);

routes.get((request, response) => {
  return response.status(404).render('not-found');
});

module.exports = routes;
