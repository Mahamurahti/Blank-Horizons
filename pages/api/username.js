// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PSDB } from 'planetscale-node'

const conn = new PSDB('main')

export default async (req, res) => {
    const {
        body: { username },
        method
    } = req
    let sql
    switch (method) {
        case 'POST':
            try {
                sql = `SELECT username FROM users WHERE username LIKE ?`
                const [getRows, _] = await conn.query(sql, [username])
                // If username is not taken
                if(getRows.length === 0) {
                    res.statusCode = 201
                    res.json({ username })
                } else {
                    res.statusCode = 400
                    res.send("Username already taken")
                }
            } catch (e) {
                const error = new Error('An error occurred while connecting to the database')
                error.status = 500
                error.info = { message: 'An error occurred while connecting to the database' }
                throw error
            }
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
