const fs = require('fs');
const Teacher = require('../models/Teacher');
const { age, date } = require('../../lib/utils');

module.exports = {
  index(request, response) {
    Teacher.all((teachers) => {
      const teachersUpdated = teachers.map((teacher) => {
        if (teacher) {
          return {
            ...teacher,
            subjects_taught: teacher.subjects_taught.split(','),
          };
        }
      });

      return response.render('teachers/index', { teachers: teachersUpdated });
    });
  },

  create(request, response) {
    return response.render('teachers/create');
  },

  post(request, response) {
    const keys = Object.keys(request.body);

    for (key of keys) {
      if (request.body[key] === '') {
        return response.json({ error: 'Please fill all the fields' });
      }
    }

    Teacher.create(request.body, (teacher) => {
      return response.redirect(`/teachers/${teacher.id}`);
    });
  },

  show(request, response) {
    const { id } = request.params;

    Teacher.find(id, (teacher) => {
      if (!teacher) return response.json({ error: 'Teacher not found' });

      teacher.age = age(teacher.birth_date);
      teacher.subjects_taught = teacher.subjects_taught.split(',');
      teacher.created_at = date(teacher.created_at).format;

      return response.render('teachers/show', { teacher });
    });
  },

  edit(request, response) {
    const { id } = request.params;

    Teacher.find(id, (teacher) => {
      if (!teacher) return response.json({ error: 'Teacher not found' });

      teacher.birth_date = date(teacher.birth_date).iso;

      return response.render('teachers/edit', { teacher });
    });
  },

  update(request, response) {
    const { id } = request.body;
    let index = 0;

    const teacherFounded = data.teachers.find((teacher, foundIndex) => {
      if (teacher.id == id) {
        index = foundIndex;
        return true;
      }
    });

    if (!teacherFounded) {
      return response.json({ error: 'Teacher not found.' });
    }

    const teacher = {
      ...teacherFounded,
      ...request.body,
      id: Number(request.body.id),
      birth: Date.parse(request.body.birth),
    };

    data.teachers[index] = teacher;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        return response.json({ error: 'Failed in the write file.' });
      }

      return response.redirect(`/teachers/${id}`);
    });
  },

  delete(request, response) {
    const { id } = request.body;

    const teachersFiltered = data.teachers.filter(
      (teacher) => teacher.id != id
    );

    data.teachers = teachersFiltered;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) return response.json({ error: 'Failed in the write file.' });

      return response.redirect('/teachers');
    });
  },
};
