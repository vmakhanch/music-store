const { Client } = require('pg')

const fs = require('fs');

const initDataBase = async () => {
    const dbDataJson = fs.readFileSync('././.env.json');
    const dbData = JSON.parse(dbDataJson);
    const client = new Client({
        host: dbData.PGHOST,
        database: dbData.PGDATABASE,
        user: dbData.PGUSER,
        password: dbData.PGPASSWORD,
        port: dbData.PGPORT
    })

    try {
        await client.connect()

        await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

        await client.query(`
            CREATE TABLE products (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v1(),
            title text NOT NULL,
            description text,
            price decimal NOT NULL)
        `)

        await client.query(`
            CREATE TABLE stocks (
            product_id uuid NOT NULL,
            count integer,
            CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE)
        `)

        const {rows} = await client.query(`
            INSERT INTO products(title, description, price)
            VALUES ('Fender Stratocaster', 'The Fender Stratocaster has been around since 1954 and countless guitar players have used it in every genre of music.', 600),
            ('Gibson Les Paul', 'The Les Paul is one of the greatest electric guitars of all time.', 700),
            ('Fender Telecaster', 'The Fender Telecaster was the first successful solid-body electric guitar in history.', 800),
            ('PRS Custom 24', 'PRS breaks up the Fender/Gibson domination of my top 5 but they didn’t fall into this spot without good reason.', 600.25),
            ('Gibson SG', 'Today the Gibson SG is one of the most famous guitars in the world with legions of fans.', 500.5),
            ('Gretsch White Falcon', 'The White Falcon just might be the most beautiful electric guitar ever made.', 788),
            ('Rickenbacker 360', 'The Rickenbacker 360 is an instrument responsible for many of the guitar sounds of the ‘60s.', 1002.5),
            ('Gibson Flying V', 'There are few guitars more iconic than the Gibson Flying V. This is one of the coolest electric guitars ever made. Its futuristic design is well known in the world of heavy metal, but heavy metal wasn’t even a thing when the Flying V was invented in 1958.', 1050.25)
            RETURNING *;
        `)

        await client.query(`
            INSERT INTO stocks(product_id, count)
            VALUES ('${rows[0].id}', 11),
            ('${rows[1].id}', 10),
            ('${rows[2].id}', 8),
            ('${rows[3].id}', 13),
            ('${rows[4].id}', 11),
            ('${rows[5].id}', 42),
            ('${rows[6].id}', 22),
            ('${rows[7].id}', 2)
            RETURNING *;
        `)
    } catch (error) {
        console.log(error)

        throw error
    } finally {
        client.end()
    }
}

initDataBase()
