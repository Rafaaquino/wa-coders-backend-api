const jwt = require("jsonwebtoken");
const User = require("../models/User");
const consts = require("../config/const");

const getUserByToken = async (token) => {
  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }
  const decoded = jwt.verify(token, consts.JwtSecret);
  const userId = decoded.id;
  const user = await User.findOne({ _id: userId });

  return user;
};

module.exports = getUserByToken;
