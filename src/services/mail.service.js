import nodemailer from "nodemailer";
import {
  PASS_SEND_NODEMAILER,
  USER_SEND_NODEMAILER,
} from "../config/nodeMailer.config.js";
import { winstonLogger } from "../utils/logger.js";
import { CLIENT_URL } from "../config/env.config.js";

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
  async sendMailToAdviceDelitionAccount(userMail, userName) {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: USER_SEND_NODEMAILER,
        pass: PASS_SEND_NODEMAILER
      }
    })
    const link = `${CLIENT_URL}/login`;

    const mailOptions = {
      from: "Luxury Ride",
      to: userMail,
      subject: "Notice of account closure due to inactivity",
      html: `<h2 style="color: grey;"> Hi ${userName}, you account in Luxury Ride will be deleted tomorrow due to inactivity.</h2>
      <hr>
      <p>If you want to keep your account, please log in to the following link <p>
      <br>
      <a href="http://${link}">Log in</a>`,
      attachments: [],
    };

    try {
      const result = await transport.sendMail(mailOptions)
      winstonLogger.info(result)
    } catch (error) {
      winstonLogger.error(error)
    }
  }
  async sendMailToNotifyDelitionAccount(userMail, userName) {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: USER_SEND_NODEMAILER,
        pass: PASS_SEND_NODEMAILER
      }
    })
    const link = CLIENT_URL
    const mailOptions = {
      from: "Luxury Ride",
      to: userMail,
      subject: "Your account was deleted due to inactivity",
      html: `<h2 style="color: grey;"> Hi ${userName}, you account in Luxury Ride was deleted due to inactivity.</h2>
      <hr>
      <p>If you want to come back we invite you to register on our platform at the following link<p>
      <br>
      <a href="http://${link}/register">Register Me!</a>`,
      attachments: [],
    };

    try {
      const result = await transport.sendMail(mailOptions)
      winstonLogger.info(result)
    } catch (error) {
      winstonLogger.error(error)
    }
  }
}

const mailService = new MailService();
export default mailService;
