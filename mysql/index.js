const mysql = require('mysql')
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Huawei@123',
  database: 'market',
  charset: 'utf8mb4'
})
module.exports = pool