import { env } from '@/main/config/env'
import { createTransport } from 'nodemailer'

const transporter = createTransport(env.mail)
export default transporter
