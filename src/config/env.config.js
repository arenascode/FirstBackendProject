import dotenv from 'dotenv'

export const envConfig = dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? './.env.prod'
      : './.env.dev'
})

export const NODE_ENV = process.env.NODE_ENV || 'development'
export const CLIENT_URL = process.env.CLIENT_URL

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY