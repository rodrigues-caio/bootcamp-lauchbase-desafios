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

    const studentFound = data.students.find((student) => student.id == id);

    if (!studentFound) {
      return response.json({ error: 'Student not found' });
    }

    const student = {
      ...studentFound,
      birth: date(studentFound.birth).iso,
    };

    return response.render('students/edit', { student });
  },

  update(request, response) {
    const keys = Object.keys(request.body);

    for (let key of keys) {
      if (request.body[key] == '') {
        return response.json({ error: 'Please, fill all the fields.' });
      }
    }

    const { id } = request.body;
    let index = 0;

    const studentFounded = data.students.find((student, foundIndex) => {
      if (student.id == id) {
        index = foundIndex;
        return true;
      }
    });

    if (!studentFounded) {
      return response.json({ error: 'Student not found.' });
    }

    const student = {
      ...studentFounded,
      ...request.body,
      id: Number(request.body.id),
      birth: Date.parse(request.body.birth),
    };

    data.students[index] = student;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        return response.json({ error: 'Error in the write file.' });
      }

      return response.redirect(`/students/${id}`);
    });
  },

  delete(request, response) {
    const { id } = request.body;

    const studentsFiltered = data.students.filter(
      (student) => student.id != id
    );

    data.students = studentsFiltered;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        return response.json({ error: 'Error in the write file.' });
      }

      return response.redirect('/students');
    });
  },
};
