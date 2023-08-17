export default {
  base_url: 'http://localhost:3000',
  host: 'localhost',
  user: '',
  password: '',
  dbname: 'shopmania_db',
  dialect: 'mysql',
  dbport: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
