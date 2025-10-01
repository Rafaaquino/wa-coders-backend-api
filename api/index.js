const serverless = require("@vercel/node");
const app = require("../app"); // caminho relativo para o app.js

module.exports = serverless(app);
