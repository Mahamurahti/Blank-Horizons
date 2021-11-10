import { PSDB } from 'planetscale-node'
import jwt from 'jsonwebtoken'

const conn = new PSDB('main')

export default async (req, res) => {
    const {
        body: { username, score },
        method
    } = req
    let sql
    switch (method) {
        case 'POST':
            try {
                await authenticateToken(req, res)

                sql = `SELECT ID FROM users WHERE username LIKE ?`
                const [resultId] = await conn.query(sql, [username])
                const id = resultId[0].ID

                sql = `SELECT score FROM scores WHERE user_id LIKE ?`
                const [resultScore] = await conn.query(sql, [id])
                const prevScore = resultScore[0]?.score

                let newScore = score
                // If there is a previous score, update the score, otherwise make a new entry
                if(prevScore) {
                    newScore += prevScore
                    sql = `UPDATE scores SET score = ? WHERE user_id LIKE ?`
                    await conn.query(sql, [newScore, id])
                } else {
                    sql = `INSERT INTO scores (user_id, score) VALUES (?, ?)`
                    await conn.query(sql, [id, newScore])
                }

                res.statusCode = 201
                res.json({ username })
            } catch (e) {
                console.log(e)
                const error = new Error('An error occurred while connecting to the database')
                error.status = 500
                error.info = { message: 'An error occurred while connecting to the database' }
                throw error
            }
            break
        case 'GET':
            try {
                const [resultList] = await conn.query('SELECT users.username, scores.score, users.picture, users.picture_alt FROM users INNER JOIN scores ON users.id = scores.user_id')
                res.statusCode = 200
                res.json(resultList)
            } catch (e) {
                console.log(e)
                const error = new Error('An error occurred while connecting to the database')
                error.status = 500
                error.info = { message: 'An error occurred while connecting to the database' }
                throw error
            }
            break
        default:
            res.setHeader('Allow', ['POST', 'GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

function authenticateToken(req, res) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).end('Unauthorized')

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return res.status(403).end('Forbidden')
        req.user = user
    })
}
