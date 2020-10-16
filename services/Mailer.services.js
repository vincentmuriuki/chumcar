import ejs from 'ejs';
import sgMail from '@sendgrid/mail';
import logger from '../utils/winston';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default class Mailer {
  /**
   *
   * @param {object} data
   */
  constructor(data) {
    this.data = data;
  }

  async sendEmail(mailOptionsObject) {
      let msg;
      ejs.renderFile(`${__dirname}/../../public/templates/emails/${mailOptionsObject.htmlPath}`, mailOptionsObject.data, {}, (err, html) => {
          if(err) {
              logger.error(err)
          } else {
              msg = {
                  to: mailOptionsObject.toAddress,
                  from: 'no-reply@bareface.com',
                  subject: mailOptionsObject.subject,
                  html,
                  mail_settings: {
                      sandbox_mode: {
                          enable: 'production'
                      }
                  }
              }
          }
      })
      const status = await sgMail.send(msg)
      return status
  }
}
