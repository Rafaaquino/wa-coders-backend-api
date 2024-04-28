const router = require("express").Router();
const AuthLogin = require("../controllers/auth/AuthLoginController");
const RegisterUser = require("../controllers/users/RegisterUserController");
const ForgotPassword = require("../controllers/auth/ForgotPasswordController");
const ResetPassword = require("../controllers/auth/ResetPasswordController");
const CodePasswordController = require("../controllers/auth/CodePasswordController");

// Middlewares
const verifyToken = require("../helpers/verify-token");

router.post("/register", RegisterUser.register);
router.post("/login", AuthLogin.login);
router.post(
  "/code-auth-recovery-password",
  CodePasswordController.codeAuthPassword
);
router.post("/forgot-password", ForgotPassword.recovery);
router.post("/reset-password", verifyToken, ResetPassword.resetPassword);

module.exports = router;
