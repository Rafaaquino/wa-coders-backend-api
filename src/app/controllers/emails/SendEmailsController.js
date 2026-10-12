const transporter = require("../../helpers/mailer");
const config = require("../../config/config");
const { parseContactBody, buildHtml, buildText } = require("../../helpers/contact-email");

let resendClient;
function getResend() {
  if (!config.RESEND_API_KEY) return null;
  if (!resendClient) {
    const { Resend } = require("resend");
    resendClient = new Resend(config.RESEND_API_KEY);
  }
  return resendClient;
}

module.exports = class SendEmailsController {
  /**
   * POST /emails/send-email — formulários de contato e de demonstração do site.
   * Envia pelo Resend quando RESEND_API_KEY está definida; senão usa o SMTP (nodemailer).
   */
  static async send(req, res) {
    const { errors, data } = parseContactBody(req.body);
    if (errors.length) {
      return res.status(422).json({ message: "Invalid payload", fields: errors });
    }

    const text = buildText(data);
    const subject = `${data.subject} — ${data.name}`;

    try {
      const resend = getResend();
      // `provider` na resposta e no log mostra qual caminho foi usado (útil para conferir as variáveis na Vercel)
      const provider = resend ? "resend" : "smtp";
      if (!resend) console.warn("send-email: RESEND_API_KEY ausente neste deploy, usando SMTP");
      if (resend) {
        const { error } = await resend.emails.send({
          from: config.RESEND_FROM,
          to: (config.RESEND_TO || "").split(",").map((s) => s.trim()).filter(Boolean),
          replyTo: data.email,
          subject,
          html: buildHtml(data),
          text,
          tags: [{ name: "source", value: "website-form" }],
        });
        if (error) throw error;
      } else {
        await transporter.sendMail({
          from: config.EMAIL,
          to: config.EMAIL,
          replyTo: data.email,
          subject,
          text,
          html: buildHtml(data),
        });
      }
      console.log(`send-email: enviado via ${provider}`);
      return res.status(200).json({ message: "Email successfully sent", provider });
    } catch (error) {
      console.error("send-email failed:", error?.message || error);
      return res.status(500).json({ message: "Error sending email" });
    }
  }
};
