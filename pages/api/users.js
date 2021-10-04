// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PSDB } from 'planetscale-node'
import bcrypt from 'bcrypt'

const conn = new PSDB('main')

export default async (req, res) => {
    const saltRounds = 10
    const {
        body: { username, password, first_name, last_name, country, picture, picture_alt },
        method
    } = req
    let sql
    switch (method) {
        case 'POST':
            try {
                sql = `INSERT INTO users (username, password, first_name, last_name, country, picture, picture_alt) VALUES (?, ?, ?, ?, ?, ?, ?)`
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(password, salt, async function (err, hash) {
                        const [rows, fields] = await conn.query(sql, [username, hash, first_name, last_name, country, picture, picture_alt])
                    })
                })
                res.statusCode = 201
                res.json({ username })
            } catch (e) {
                const error = new Error('An error occurred while connecting to the database')
                error.status = 500
                error.info = { message: 'An error occurred while connecting to the database' }
                throw error
            }
            break
        case 'GET':
            try {
                const [getRows, _] = await conn.query('SELECT * FROM users')
                res.statusCode = 200
                res.json(getRows)
            } catch (e) {
                const error = new Error('An error occurred while connecting to the database')
                error.status = 500
                error.info = { message: 'An error occurred while connecting to the database' }
                throw error
            }
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
