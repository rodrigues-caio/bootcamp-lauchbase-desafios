const fs = require('fs');
const Student = require('../models/Student');
const { date, levelSchool } = require('../../lib/utils');

module.exports = {
  index(request, response) {
    let { filter, page, limit } = request.query;

    page = page || 1;
    limit = limit || 2;
    let offset = limit * (page - 1);

    const params = {
      page,
      filter,
      limit,
      offset,
      callback(students) {
        const pagination = {
          page,
          total: Math.ceil(students[0].total / limit),
        };

        const studentsUpdate = students.map((student) => {
          if (student) {
            return {
              ...student,
              school_year: levelSchool(student.school_year),
            };
          }
        });

        return response.render('students/index', {
          students: studentsUpdate,
          filter,
          pagination,
        });
      },
    };

    Student.paginate(params);
  },

  create(request, response) {
    Student.teachersOptions((options) => {
      return response.render('students/create', { teachersOptions: options });
    });
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

      Student.teachersOptions((options) => {
        return response.render('students/edit', {
          student,
          teachersOptions: options,
        });
      });
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

    Student.delete(id, () => {
      return response.redirect('/students');
    });
  },
};
