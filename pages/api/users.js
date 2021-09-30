// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PSDB } from 'planetscale-node'

const conn = new PSDB('main')

export default async (req, res) => {
  const {
    body: { username, password, first_name, last_name, country, large_pic, medium_pic, small_pic, alt_pic },
    method
  } = req
  switch (method) {
      case 'POST':
          const [rows, fields] = await conn.query(
              `INSERT INTO users 
                    (username, password, first_name, last_name, country, large_pic, medium_pic, small_pic, alt_pic)
                    VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
             [username, password, first_name, last_name, country, large_pic, medium_pic, small_pic, alt_pic]
          )
          res.statusCode = 201
          res.json({ username, password, alt_pic })
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
          res.setHeader('Allow', ['GET', 'PUT'])
          res.status(405).end(`Method ${method} Not Allowed`)
  }
}
