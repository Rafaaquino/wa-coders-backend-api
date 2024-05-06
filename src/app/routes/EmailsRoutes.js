const router = require("express").Router();
const SendEmailsController = require("../controllers/emails/SendEmailsController");
const QuotesController = require("../controllers/emails/QuotesController");

router.post("/send-email", SendEmailsController.send);
router.post("/send-quotes", QuotesController.send);

module.exports = router;
