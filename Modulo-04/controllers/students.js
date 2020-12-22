const fs = require('fs');
const data = require('../data.json');
const { date } = require('../utils');

module.exports = {
  index: (request, response) => {
    return response.render('students/index', { students: data.students });
  },

  create: (request, response) => {
    return response.render('students/create');
  },

  post: (request, response) => {
    const keys = Object.keys(request.body);

    for (let key of keys) {
      if (request.body[key] == '') {
        return response.json({ error: 'Fill all the fields' });
      }
    }

    let id = 1;

    const lastStudent = data.students[data.students.length - 1];

    if (lastStudent) {
      id = lastStudent.id + 1;
    }

    let birth = Date.parse(request.body.birth);

    const student = {
      id,
      ...request.body,
      birth,
    };

    data.students.push(student);

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) return response.json({ error: 'Error in write file.' });

      return response.redirect(`/students/${id}`);
    });
  },

  show: (request, response) => {
    const { id } = request.params;

    const studentFound = data.students.find((student) => student.id == id);

    if (!studentFound) {
      return response.json({ error: 'Student not found.' });
    }

    const student = {
      ...studentFound,
      birth: date(studentFound.birth).birthDay,
    };

    return response.render('students/show', { student });
  },

  edit: (request, response) => {
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

  update: (request, response) => {
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

  delete: (request, response) => {
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
