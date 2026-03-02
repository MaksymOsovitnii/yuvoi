import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_SENDER,
  }
}
const receivers = process.env.MAILGUN_RECEIVERS.split(",");

const transporter = nodemailer.createTransport(mg(auth));

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: {
  subject: string;
  to?: string | string[];
  text?: string;
  html?: string;
}) => {
  await transporter.sendMail({
    from: process.env.MAILGUN_SENDER,
    to: to || receivers,
    subject,
    text,
    html,
  });
};
