const mongoose = require("../../db/connect-db");
const { Schema } = mongoose;

const AuthLogin = mongoose.model(
  "User",
  new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
  })
);

module.exports = AuthLogin;
