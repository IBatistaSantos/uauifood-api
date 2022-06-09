import { NodeMailerSendMail } from '@/infra/mailer'
import transporter from '@/infra/mailer/transporter'

export const makeMailerNodeMailer = (): NodeMailerSendMail => {
  return new NodeMailerSendMail(transporter)
}
