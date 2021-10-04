// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PSDB } from 'planetscale-node'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const conn = new PSDB('main')

export default async (req, res) => {
    const {
        body: { username, password },
        method
    } = req
    let sql
    switch (method) {
        case 'POST':
            try {
                sql = `SELECT username, password, picture, picture_alt FROM users WHERE username LIKE ?`
                let result = await conn.query(sql, [username])
                result = JSON.parse(JSON.stringify(result[0][0]))
                bcrypt.compare(password, result.password, function (err, match) {
                    if (match) {
                        const user = {
                            username: result.username,
                            picture: result.picture,
                            picture_alt: result.picture_alt
                        }

                        // Access Token
                        const accessToken = jwt.sign(
                            { name:username },
                            process.env.SECRET,
                            { expiresIn:"1h" }
                        )

                        console.log(accessToken)

                        res.statusCode = 201
                        res.json({ accessToken, user })
                    } else {
                        res.statusCode = 400
                        res.send("Invalid credentials")
                    }
                })
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
