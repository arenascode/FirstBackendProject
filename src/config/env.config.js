import dotenv from 'dotenv'

export const envConfig = dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? './.env.prod'
      : './.env.dev'
})

// export default {
//   port:process.env.PORT,
//   mongoUrl: process.env.MONGODB_CNX_STR,
//   jwtKey: process.env.JWT_SECRET_KEY,
//   CookieSign: process.env.COOKIE_SECRET,
//   githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
//   userNodeMailer: process.env.USER_SEND_NODEMAILER,
//   passNodeMailer: process.env.PASS_SEND_NODEMAILER
// }

export const NODE_ENV = process.env.NODE_ENV || 'development'

export const ENV_DB = process.env.DB_HOST
export const ENV_PORT = process.env.PORT