import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";

const from = 'Yuvoi <no-reply@mgx.yuvoi.com>';

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY || '',
    domain: from
  }
}
const receivers = ['hello@yuvoi.com', 'support@yuvoi.com'];

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
    from,
    to: to || receivers,
    subject,
    text,
    html,
  });
};
