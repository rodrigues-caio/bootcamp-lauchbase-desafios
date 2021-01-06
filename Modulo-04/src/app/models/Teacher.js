const db = require('../../config/database');

module.exports = {
  all(callback) {
    const query = 'SELECT * FROM teachers';

    db.query(query, (err, results) => {
      if (err) throw `Database Error: ${err}`;

      callback(results.rows);
    });
  },

  create(data, callback) {
    const query =
      'INSERT INTO teachers (avatar_url, name, birth_date, education_level, class_type, subjects_taught, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';

    const {
      avatar_url,
      name,
      birth_date,
      education_level,
      class_type,
      subjects_taught,
      created_at,
    } = data;

    db.query(
      query,
      [
        avatar_url,
        name,
        birth_date,
        education_level,
        class_type,
        subjects_taught,
        created_at,
      ],
      (err, results) => {
        if (err) throw `Database Error: ${err}`;

        callback(results.rows[0].id);
      }
    );
  },

  find(id, callback) {
    const query = 'SELECT * FROM teachers WHERE id = $1';

    db.query(query, [id], (err, results) => {
      if (err) throw `Database Error: ${err}`;

      callback(results.rows[0]);
    });
  },

  update(data, callback) {
    const query = 'UPDATE teachers SET';
  },

  delete(id, callback) {
    const query = 'DELETE FROM teachers WHERE id = $1';

    db.query(query, [id], (err, results) => {
      if (err) throw `Database Error: ${err}`;

      callback();
    });
  },
};
