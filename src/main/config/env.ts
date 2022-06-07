export const env = {
  port: process.env.PORT ?? 3000,
  db: {
    host: process.env.DATABASE_URL
  },
  crypto: {
    jwt: {
      secret: process.env.JWT_SECRET
    },
    bcrypt: {
      salt: process.env.BCRYPT_SALT ?? 10
    }
  }
}
