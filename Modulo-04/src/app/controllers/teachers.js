const fs = require('fs');
const Teacher = require('../models/Teacher');
const { age, date } = require('../../lib/utils');

module.exports = {
  index(request, response) {
    let { filter, page, limit } = request.query;

    page = page || 1;
    limit = limit || 2;
    let offset = limit * (page - 1);

    let params = {
      filter,
      page,
      limit,
      offset,
      callback(teachers) {
        const pagination = {
          page,
          total: Math.ceil(teachers[0].total / limit),
        };

        const teachersUpdated = teachers.map((teacher) => {
          if (teacher) {
            return {
              ...teacher,
              subjects_taught: teacher.subjects_taught.split(','),
            };
          }
        });

        return response.render('teachers/index', {
          teachers: teachersUpdated,
          filter,
          pagination,
        });
      },
    };

    Teacher.paginate(params);

    /*if (filter) {
      Teacher.findBy(filter, (teachers) => {
        const teachersUpdated = teachers.map((teacher) => {
          if (teacher) {
            return {
              ...teacher,
              subjects_taught: teacher.subjects_taught.split(','),
            };
          }
        });

        return response.render('teachers/index', {
          teachers: teachersUpdated,
          filter,
        });
      });
    } else {
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
    }*/
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
    Teacher.update(request.body, () => {
      return response.redirect(`/teachers/${request.body.id}`);
    });
  },

  delete(request, response) {
    Teacher.delete(request.body.id, () => {
      return response.redirect('/teachers');
    });
  },
};
