const router = require("express").Router();
const SendEmailsController = require("../controllers/emails/SendEmailsController");

router.post("/send", SendEmailsController.send);

module.exports = router;
