const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const config = require("../config/config");

const transporter = nodemailer.createTransport({
  name: "no-reply@wacoders.com",
  host: config.HOST_SMTP,
  port: config.PORT_SMTP,
  secure: true,
  auth: {
    user: config.EMAIL, // Insira seu endereço de e-mail
    pass: config.EPASSWORD, // Insira sua senha
  },
});

module.exports = transporter;
