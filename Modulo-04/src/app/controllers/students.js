const fs = require('fs');
const Student = require('../models/Student');
const { date, levelSchool } = require('../../lib/utils');

module.exports = {
  index(request, response) {
    Student.all((students) => {
      return response.render('students/index', { students });
    });
  },

  create(request, response) {
    return response.render('students/create');
  },

  post(request, response) {
    const keys = Object.keys(request.body);

    for (let key of keys) {
      if (request.body[key] == '') {
        return response.json({ error: 'Fill all the fields' });
      }
    }

    Student.create(request.body, (student) => {
      return response.redirect(`/students/${student.id}`);
    });
  },

  show(request, response) {
    const { id } = request.params;

    Student.find(id, (student) => {
      student.birth = date(student.birth).birthDay;
      student.school_year = levelSchool(student.school_year);

      return response.render('students/show', { student });
    });
  },

  edit(request, response) {
    const { id } = request.params;

    Student.find(id, (student) => {
      if (!student) return response.json({ error: 'Student no found.' });

      student.birth = date(student.birth).iso;

      return response.render('students/edit', { student });
    });
  },

  update(request, response) {
    const keys = Object.keys(request.body);

    for (let key of keys) {
      if (request.body[key] == '') {
        return response.json({ error: 'Please, fill all the fields.' });
      }
    }

    Student.update(request.body, () => {
      return response.redirect(`/students/${request.body.id}`);
    });
  },

  delete(request, response) {
    const { id } = request.body;

    Student.data.students = studentsFiltered;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        return response.json({ error: 'Error in the write file.' });
      }

      return response.redirect('/students');
    });
  },
};
