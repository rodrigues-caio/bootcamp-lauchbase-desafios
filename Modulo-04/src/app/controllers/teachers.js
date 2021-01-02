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

    let { birth_date } = request.body;

    birth_date = date(Date.parse(birth_date)).iso;
    const created_at = date(Date.now()).iso;

    const teacher = { ...request.body, birth_date, created_at };

    Teacher.create(teacher, (teacher_id) => {
      return response.redirect(`/teachers/${teacher_id}`);
    });
  },

  show(request, response) {
    const { id } = request.params;

    const teacherFounded = data.teachers.find((teacher) => teacher.id == id);

    if (!teacherFounded) {
      return response.json({ error: 'Teacher not found.' });
    }

    const teacher = {
      ...teacherFounded,
      age: age(teacherFounded.birth),
      subjects: teacherFounded.subjects.split(','),
      created_at: Intl.DateTimeFormat('en-GB').format(
        teacherFounded.created_at
      ),
    };

    return response.render('teachers/show', { teacher });
  },

  edit(request, response) {
    const { id } = request.params;

    const teacherFounded = data.teachers.find(
      (teacher) => teacher.id == Number(id)
    );

    if (!teacherFounded) {
      return response.json({ error: 'Teacher not found' });
    }

    const teacher = {
      ...teacherFounded,
      birth: date(teacherFounded.birth).iso,
    };

    return response.render('teachers/edit', { teacher });
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
