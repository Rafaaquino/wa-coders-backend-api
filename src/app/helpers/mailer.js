const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const config = require("../config/config");

const transporter = nodemailer.createTransport({
  host: config.HOST_SMTP, // mail.wacoders.com
  port: config.PORT_SMTP, // 465
  secure: true,
  auth: {
    user: config.EMAIL, // "no-reply@wacoders.com"
    pass: config.EPASSWORD, // senha do e-mail
  },
  tls: {
    rejectUnauthorized: false, // às vezes HostGator exige isso
  },
});

module.exports = transporter;
