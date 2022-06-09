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
  },
  urlFrontend: process.env.URL_FRONTEND ?? 'http://localhost:3000',
  mail: {
    host: process.env.MAIL_HOST as string,
    port: Number(process.env.MAIL_PORT),
    auth: {
      user: process.env.MAIL_USER as string,
      pass: process.env.MAIL_PASS as string
    }
  }
}
