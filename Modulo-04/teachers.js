const fs = require('fs');
const data = require('./data.json');

const { age } = require('./utils');

module.exports = {
  create: (request, response) => {
    const keys = Object.keys(request.body);

    for (key of keys) {
      if (request.body[key] === '') {
        return response.json({ error: 'Please fill all the fields' });
      }
    }

    let {
      avatar_url,
      name,
      birth,
      education_level,
      type_class,
      subjects,
    } = request.body;

    const id = data.teachers.length + 1;
    birth = Date.parse(birth);
    const created_at = Date.now();

    const teacher = {
      id,
      avatar_url,
      name,
      birth,
      education_level,
      type_class,
      subjects,
      created_at,
    };

    data.teachers.push(teacher);

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) return response.json({ error: 'Failed in write file.' });

      return response.redirect('/teachers');
    });
  },

  show: (request, response) => {
    const { id } = request.params;

    const teacherFounded = data.teachers.find(
      (teacher) => teacher.id == Number(id)
    );

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

  edit: (request, response) => {
    return response.render('teachers/edit');
  },
};
