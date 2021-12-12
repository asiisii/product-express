const express = require('express')
const app = express()
const client = require('./dbConnection')

app.use(express.json())

app.post('/products', async (req, res) => {
	try {
		const { title, price, description, category, image } = req.body
		const productQuery =
			'INSERT INTO products (title, price, description, category, image) VALUES ($1, $2, $3, $4, $5) RETURNING *'
		const newProduct = await client.query(productQuery, [
			title,
			parseFloat(price).toFixed(2),
			description,
			category,
			image,
		])
		res.json('Added a new product successfully')
	} catch (err) {
		console.error(err.message)
	}
})

app.get('/products', async (req, res) => {
	try {
		const allProducts = await client.query(
			'SELECT * FROM products ORDER BY product_id'
		)
		res.json(allProducts.rows)
	} catch (err) {
		console.error(err.message)
	}
})

app.get('/products/:id', async (req, res) => {
	try {
		const { id } = req.params
		const allProducts = await client.query(
			'SELECT * FROM products WHERE product_id = $1',
			[id]
		)
		res.json(allProducts.rows[0])
	} catch (err) {
		console.error(err.message)
	}
})

app.put('/products/:id', async (req, res) => {
	try {
		const { id } = req.params
		const { title, price, description, category, image } = req.body
		const updateQuery = `UPDATE products SET title=$1, price=$2, description=$3, category=$4, image=$5 WHERE product_id = $6`
		await client.query(updateQuery, [
			title,
			parseFloat(price).toFixed(2),
			description,
			category,
			image,
			id,
		])
		res.json('Updated successfully')
	} catch (err) {
		console.error(err.message)
	}
})

app.delete('/products/:id', async (req, res) => {
	try {
		const { id } = req.params
		await client.query('DELETE FROM products WHERE product_id = $1', [id])
		res.json('Deleted a product successfully')
	} catch (err) {
		console.error(err.message)
	}
})

app.listen(5000, () => console.log(`Magical stuff happening in port 5000`))
