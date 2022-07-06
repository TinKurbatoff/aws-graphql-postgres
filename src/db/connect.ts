const { Pool } = require('pg');
require('dotenv').config();

export function connect() {
  console.log(`🐌🐌🐌🦌   Connecting to database ${process.env.RDS_DATABASE}...`)
  console.log(`DB host: ${process.env.RDS_HOSTNAME}`)
  console.log(`DB port: ${process.env.RDS_PORT}`)
  console.log(`database: ${process.env.RDS_DATABASE}`)
  console.log(`DB user: ${process.env.RDS_USERNAME}`)
  // console.log(`password: ${process.env.RDS_PASSWORD}`)  // ** DEBUG **
  
  return new Pool({
    user: process.env.RDS_USERNAME,
    host: process.env.RDS_HOSTNAME,
    database: process.env.RDS_DATABASE,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    ssl: process.env.DB_SSL === "True"
  });
}
