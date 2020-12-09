const fs = require('fs');
const data = require('./data.json');

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
};
