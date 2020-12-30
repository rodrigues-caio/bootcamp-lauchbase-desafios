const { Pool } = require('pg');

module.exports = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'docker',
  database: 'my_teacher',
});
