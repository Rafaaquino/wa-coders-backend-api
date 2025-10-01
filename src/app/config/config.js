// config.js

const requiredEnvs = [
  "EMAIL",
  "EPASSWORD",
  "EMAIL_RECOVERY",
  "EPASSWORD_RECOVERY",
  "EMAIL_SUPPORT",
  "EPASSWORD_SUPPORT",
  "JWTSECRET",
  "MONGODB_URI",
];

requiredEnvs.forEach((env) => {
  if (!process.env[env]) {
    console.warn(`⚠️  Atenção: variável de ambiente ${env} não definida!`);
  }
});

module.exports = {
  // Mongo
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb+srv://wacoders:gDU7Jp7hNPZmYGyw@wacodersdb.et0tbe3.mongodb.net/?retryWrites=true&w=majority&appName=wacodersdb",
  MONGODB_URI_LOCAL:
    process.env.MONGODB_URI_LOCAL || "mongodb://localhost:27017/wa-coders",
  MONGO_PASS: process.env.MONGO_PASS || "gDU7Jp7hNPZmYGyw",

  // E-mails
  EMAIL: process.env.EMAIL || "contact@wacoders.com",
  EPASSWORD: process.env.EPASSWORD || "Host!@#32375raet",
  EMAIL_RECOVERY: process.env.EMAIL_RECOVERY,
  EPASSWORD_RECOVERY: process.env.EPASSWORD_RECOVERY,
  EMAIL_SUPPORT: process.env.EMAIL_SUPPORT,
  EPASSWORD_SUPPORT: process.env.EPASSWORD_SUPPORT,

  // JWT
  JWTSECRET: process.env.JWTSECRET,
  BCRYPTSALTS: 12,
  EXPJWT: 36000,

  // API
  API: "/api/v1",

  // SMTP
  PORT_SMTP: Number(process.env.PORT_SMTP) || 465,
  HOST_SMTP: process.env.HOST_SMTP || "mail.wacoders.com",

  // Frontend
  HOST_FRONT: process.env.HOST_FRONT || "https://www.wacoders.com",
  HOST_PROD: process.env.HOST_PROD || "https://wacoders.com",
  HOST_DEV: process.env.HOST_DEV || "http://localhost:4200",
};
