const transporter = require("../../helpers/mailer");
const config = require("../../config/config");

module.exports = class SendEmailsController {
  static send(req, res) {
    const { name, email, subject, text } = req.body;
    console.log(req.body);

    const mailOptions = {
      from: config.EMAIL,
      to: config.EMAIL,
      replyTo: email,
      subject,
      name: name,
      text,
    };

    console.log(mailOptions);
    console.log(config.EMAIL, config.EPASSWORD);

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        res.status(500).json({ message: "Error sending email", error });
      } else {
        res.status(200).json({ message: "Email successfully sent" });
      }
    });
  }
};
