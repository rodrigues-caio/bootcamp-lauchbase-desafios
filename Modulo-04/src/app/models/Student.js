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
    const query = `
    SELECT students.*, teachers.name AS teacher_name 
    FROM students LEFT JOIN teachers ON teachers.id = students.teacher_id
    WHERE students.id = $1`;

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
        weekly_workload,
        teacher_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id`;

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth).iso,
      data.school_year,
      data.weekly_workload,
      data.teacher,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error: ${err}`;

      callback(results.rows[0]);
    });
  },

  update(data, callback) {
    const query = `
    UPDATE students SET
      avatar_url=($1),
      name=($2),
      email=($3),
      birth=($4),
      school_year=($5),
      weekly_workload=($6),
      teacher_id=($7)
      WHERE id = $8
    `;

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth).iso,
      data.school_year,
      data.weekly_workload,
      data.teacher,
      data.id,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error: ${err}`;

      callback();
    });
  },

  delete(id, callback) {
    db.query(`DELETE FROM students WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database Error: ${err}`;

      callback();
    });
  },

  teachersOptions(callback) {
    db.query(`SELECT name, id FROM teachers`, (err, results) => {
      if (err) throw `Database Error: ${err}`;

      callback(results.rows);
    });
  },

  paginate(params) {
    let { filter, limit, offset, callback } = params;

    let query = '',
      filterQuery = '',
      totalQuery = `(SELECT count(*) FROM students) AS total`;

    if (filter) {
      filterQuery = `
      WHERE students.name ILIKE '%${filter}%'
      OR students.email ILIKE '%${filter}%'
      `;

      totalQuery = `
      (SELECT count(*) FROM students
        ${filterQuery}
      ) AS total
      `;
    }

    query = `
      SELECT students.*, ${totalQuery} 
      FROM students
      ${filterQuery}
      LIMIT $1 OFFSET $2
    `;

    db.query(query, [limit, offset], (err, result) => {
      if (err) throw new Error(`Database error: ${err}`);

      callback(result.rows);
      console.log(result.rows);
    });
  },
};
