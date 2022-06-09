import { SendEmailNotification, SendEmailNotificationParams } from '@/data/contracts/mailer'
import { Transporter } from 'nodemailer'

export class NodeMailerSendMail implements SendEmailNotification {
  constructor (private readonly transporter: Transporter) {}

  async send ({ to, body, subject }: SendEmailNotificationParams): Promise<void> {
    return this.transporter.sendMail({
      from: '"Uaui Food" <no-reply@uauifood.com',
      to,
      subject,
      html: body
    })
  }
}
