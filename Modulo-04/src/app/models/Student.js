const db = require('../config/database');

module.exports = {
  all(callback) {
    const query = 'SELECT * FROM students';

    db.query(query, (err, results) => {
      if (err) throw `Database Error: ${err}`;

      callback(results.rows);
    });
  },
};
