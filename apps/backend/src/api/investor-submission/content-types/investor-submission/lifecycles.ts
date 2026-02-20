import { sendEmail } from "../../../../utils/emails";
import { formatSubmission } from "../../../../utils/email-formatter";

export default {
  async afterCreate(event) {
    try {
      const { result } = event;

      const formType = "Investors";
      const text = formatSubmission(formType, result);

      await sendEmail({
        to: process.env.EMAIL_DESTINATION,
        subject: `New ${formType} submission`,
        text,
      });

      strapi.log.info(`📩 ${formType} form email sent`);
    } catch (error) {
      strapi.log.error("Email sending failed", error);
    }
  },
};
