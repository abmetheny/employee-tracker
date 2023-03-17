// Connect to sql database
const mysql = require('mysql2');
require('dotenv').config()


const db = process.env.JAWSDB_URL || mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: process.env.DB_USER,
        // MySQL password
        password: process.env.DB_PW,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the tracker_db database.`)
);

db.connect((err) => {
if (err){
    console.log(err);
}
})

module.exports = db;