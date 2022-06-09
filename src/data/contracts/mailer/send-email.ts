export interface SendEmailNotification {
  send: (params: SendEmailNotificationParams) => Promise<void>
}

export type SendEmailNotificationParams = {
  to: string
  subject: string
  body: string
}
