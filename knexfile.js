require('dotenv').config()

const connection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
}

module.exports = {
  development: {
    client: 'pg',
    connection,
  },
  production: {
    client: 'pg',
    connection,
  },
}
