const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

const data = require('./data');

server.use(express.static('public'));
server.set('view engine', 'njk');

nunjucks.configure('views', {
  express: server,
  noCache: true,
  autoescape: false,
});

server.get('/', (request, response) => {
  return response.render('courses', { courses: data });
});

server.get('/about', (request, response) => {
  const about = {
    avatar_url: 'https://avatars3.githubusercontent.com/u/69590972?s=200&v=4',
    name: 'Rocketseat',
    description:
      'Empresa educacional com o objetivo de formar novos profissionais na área detecnologia, voltado para o desenvolvimento de software web.',
    tecs: ['Javascript', 'HTML', 'CSS'],
    links: [
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/rocketseat_oficial/',
      },
      { name: 'Github', url: 'https://github.com/rocketseat-education' },
      { name: 'Linkedin', url: 'https://www.linkedin.com/school/rocketseat/' },
    ],
  };

  return response.render('about', { about });
});

server.get('/courses/:id_course', (request, response) => {
  const { id_course } = request.params;

  const course = data.find((course) => course.id === id_course);

  if (!course) {
    return response.status(404).json({ error: 'Course not found.' });
  }

  return response.render('course', { course });
});

server.use((request, response) => {
  response.status(404).render('not-found');
});

server.listen(3000, () => {
  console.log('Server is running: 3000!');
});
