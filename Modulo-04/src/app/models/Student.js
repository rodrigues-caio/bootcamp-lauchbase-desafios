const db = require('../config/database');

module.exports = {
  all(callback) {
    const query = 'SELECT * FROM students';

    db.query(query, (err, results) => {
      if (err) throw `Database Error: ${err}`;

      callback(results.rows);
    });
  },

  find(id, callback) {
    const query = 'SELECT * FROM students WHERE id = $1';

    db.query(query, [id], (err, results) => {
      if (err) throw `Database Error: ${err}`;

      callback(results.rows[0]);
    });
  },

  create(data, callback) {
    const query = '';

    const values = [];
  },
};
