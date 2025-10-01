// config.js (produção - Vercel)

const requiredEnvs = [
  "EMAIL",
  "EPASSWORD",
  "EMAIL_RECOVERY",
  "EPASSWORD_RECOVERY",
  "EMAIL_SUPPORT",
  "EPASSWORD_SUPPORT",
  "JWTSECRET",
  "MONGODB_URI",
  "MONGO_PASS",
];

// Verifica se todas as variáveis obrigatórias estão definidas
requiredEnvs.forEach((env) => {
  if (!process.env[env]) {
    console.warn(`⚠️ Atenção: variável de ambiente ${env} não definida!`);
  }
});

module.exports = {
  // MongoDB
  MONGODB_URI: process.env.MONGODB_URI,
  MONGO_PASS: process.env.MONGO_PASS,

  // E-mails
  EMAIL: process.env.EMAIL,
  EPASSWORD: process.env.EPASSWORD,
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
