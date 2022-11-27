require('dotenv').config();

const {Client} = require('pg')
// eslint-disable-next-line spaced-comment
/*"mouse.db.elephantsql.com"
"iikpydno"
5432
"G4vLM0H5SIJvUmDnYn0f7bDw7sKVrQ0R
"iikpydno"
*/
const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

module.exports = client