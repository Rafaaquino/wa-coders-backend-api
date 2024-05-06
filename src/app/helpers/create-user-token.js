const jwt = require("jsonwebtoken");
const config = require("../config/config");

const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    {
      email: user.email,
      name: user.name,
      id: user._id,
    },
    config.JWTSECRET,
    { expiresIn: config.EXPJWT }
  );

  res.status(200).json({
    message: "Authenticated",
    token: token,
    userId: user._id,
  });
};

module.exports = createUserToken;
