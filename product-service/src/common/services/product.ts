const { Client } = require('pg')

import {Product} from '../types/Product'

class ProductService {
    getAllProducts = async (): Promise<Product[]> => {
        const client = new Client({
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })
        try {
            await client.connect()

            const {rows} = await client.query('SELECT products.id, products.title, products.description, products.price, stocks.count FROM products LEFT JOIN stocks ON products.id = stocks.product_id')

            return rows
        } catch (error) {
            throw error
        } finally {
            await client.end()
        }
    }

    getProductById = async (id: string): Promise<Product> => {
        const client = new Client({
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })

        try {
            await client.connect()

            const {rows} = await client.query(`SELECT products.id, products.title, products.description, products.price, stocks.count FROM products LEFT JOIN stocks ON products.id = stocks.product_id WHERE products.id = '${id}'`)

            return rows[0]
        } catch (error) {
            throw error
        } finally {
            await client.end()
        }
    }

    createProduct = async (product: Product): Promise<Product> => {
        const client = new Client({
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })

        try {
            await client.connect()
            await client.query('BEGIN')

            const {rows: [createdProduct]} = await client.query(`
                INSERT INTO products(title, description, price)
                VALUES ('${product.title}', '${product.description}', ${product.price})
                RETURNING *;
            `)

            const {rows: [createdStock]} = await client.query(`
                INSERT INTO stocks(product_id, count)
                VALUES ('${createdProduct.id}', ${product.count})
                RETURNING *;
            `)

            await client.query('COMMIT')

            return {...createdProduct, count: createdStock.count}
        } catch (error) {
            await client.query('ROLLBACK')

            throw error
        } finally {
            await client.end()
        }
    }
}

export const productService = new ProductService()
