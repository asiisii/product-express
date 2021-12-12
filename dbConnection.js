const { Pool } = require('pg')

const client = new Pool({
	user: 'postgres',
	database: 'ecommerce',
	host: 'localhost',
	port: 5432,
})

module.exports = client
