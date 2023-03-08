import jwt from 'jsonwebtoken'
const dotenv = require('dotenv')
dotenv.config()

export function generateAccessToken(user: object): string {
  return jwt.sign(user, process.env.TOKEN_SECRET as string, {
    expiresIn: '18000s',
  })
}
