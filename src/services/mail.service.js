import nodemailer from "nodemailer";
import {
  PASS_SEND_NODEMAILER,
  USER_SEND_NODEMAILER,
} from "../config/nodeMailer.config.js";
import { winstonLogger } from "../utils/logger.js";

class MailService {
  async sendConfirmPurchaseMail(purchaser) {
    const transport = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: USER_SEND_NODEMAILER,
        pass: PASS_SEND_NODEMAILER,
      },
    });

    const userMail = purchaser;

    const mailOptions = {
      from: "LuxuryRide",
      to: userMail,
      subject: "Thanks you for your purchase",
      html: '<h1 style="color: blue;"> Thanks you for your purchase. We started with the shipping. We Will contact you</h1>',
      attachments: [],
    };

    try {
      const info = await transport.sendMail(mailOptions);
      winstonLogger.info(info);
    } catch (error) {
      winstonLogger.error(error);
    }
  }
  async sendmailToRecoverPassword(userMail, link, userName) {
    winstonLogger.debug(`${userMail}, ${link}`);

    const transport = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: USER_SEND_NODEMAILER,
        pass: PASS_SEND_NODEMAILER,
      },
    });

    const mailOptions = {
      from: "LuxuryRide",
      to: userMail,
      subject: "Request to Reset your Password",
      html: `<h2 style="color: grey;"> Hi ${userName}, you requested to reset tour password</h2>
      <hr>
      <p>Please click the link below to reset your password<p>
      <br>
      <a href="http://${link}">Reset My Password</a>`,
      attachments: [],
    };
    try {
      const info = await transport.sendMail(mailOptions);
      winstonLogger.info(info);
    } catch (error) {
      winstonLogger.error(error);
    }
  }
  async sendMailToAdviceDelitionAccount(userMail) {
    console.log(`MailService Advice user Service ${userMail}`);
  }
  async sendMailToNotifyDelitionAccount(userMail) {
    console.log(`MailService delete account user Service ${userMail}`);
  }
}

const mailService = new MailService();
export default mailService;
