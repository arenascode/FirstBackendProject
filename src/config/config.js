import dotenv from 'dotenv'

dotenv.config()

export default {
  port:process.env.PORT,
  mongoUrl: process.env.MONGODB_CNX_STR,
  jwtKey: process.env.JWT_SECRET_KEY,
  CookieSign: process.env.COOKIE_SECRET,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET
}
