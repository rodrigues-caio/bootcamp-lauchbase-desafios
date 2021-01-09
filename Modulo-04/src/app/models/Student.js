const db = require('../../config/database');
const { date } = require('../../lib/utils');

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
    const query = `INSERT INTO students 
      (avatar_url,
        name,
        email,
        birth,
        school_year,
        weekly_workload
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id`;

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth).iso,
      data.school_year,
      data.weekly_workload,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error: ${err}`;

      callback(results.rows[0]);
    });
  },

  update(data, callback) {
    const query = `UPDATE students SET (
      avatar_url=($1),
      name=($2),
      email=($3),
      birth=($4),
      school_year=($5),
      weekly_workload=($6)
      WHERE id = $7
    )`;

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth).iso,
      data.school_year,
      data.weekly_workload,
      data.id,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error: ${err}`;

      callback();
    });
  },
};
