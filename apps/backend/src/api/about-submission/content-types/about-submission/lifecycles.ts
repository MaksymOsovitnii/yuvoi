import { sendEmail } from "../../../../utils/emails";
import { formatSubmission } from "../../../../utils/email-formatter";

export default {
  async afterCreate(event) {
    try {
      const { result } = event;

      const formType = "About";
      const html = formatSubmission(formType, result);

      await sendEmail({
        subject: `New ${formType} submission`,
        html,
      });

      strapi.log.info(`📩 ${formType} form email sent`);
    } catch (error) {
      strapi.log.error("Email sending failed", error);
    }
  },
};
