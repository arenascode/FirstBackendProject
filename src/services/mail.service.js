import nodemailer from "nodemailer";
import {
  PASS_SEND_NODEMAILER,
  USER_SEND_NODEMAILER,
} from "../config/nodeMailer.config.js";

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
}

const mailService = new MailService();
export default mailService;
