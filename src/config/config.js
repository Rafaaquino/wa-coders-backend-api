// config.js
require("dotenv").config({ path: `.env.${process.env.NODE_ENV || "dev"}` });

module.exports = {
  NODE_ENV: process.env.NODE_ENV || HOST_DEV,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/wa-coders",
  PORT: process.env.PORT || 3000,
  EMAIL: process.env.EMAIL,
  EPASSWORD: process.env.EPASSWORD,
  EMAIL_RECOVERY: process.env.EMAIL_RECOVERY,
  EPASSWORD_RECOVERY: process.env.EPASSWORD_RECOVERY,
  EMAIL_SUPPORT: process.env.EMAIL_SUPPORT,
  EPASSWORD_SUPPORT: process.env.EPASSWORD_SUPPORT,

  BCRYPTSALTS: 12,
  JWTSECRET: "FHAgse12GF-G3afse3reek952-23488-1123dgvds-@#!3467@$gs!#",
  EXPJWT: 36000,
  API: "/api/v1",
  PORT_SMTP: 465,
  HOST_SMTP: "mail.wacoders.com",
  HOST_DEV: "http://localhost:4200",
  HOST_HML: "http://localhost:4200",
  HOST_PROD: "http://localhost:4200",
  env_dev: "development",
  env_hml: "homologation",
  env_prod: "production",
};
