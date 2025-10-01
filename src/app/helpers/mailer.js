const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const config = require("../config/config");

const transporter = nodemailer.createTransport({
  host: config.HOST_SMTP, // mail.wacoders.com
  port: 587, // 465
  secure: false,
  auth: {
    user: config.EMAIL, // "no-reply@wacoders.com"
    pass: config.EPASSWORD, // senha do e-mail
  },
  logger: true,
  debug: true,
  tls: {
    rejectUnauthorized: false, // às vezes HostGator exige isso
  },
});

module.exports = transporter;
