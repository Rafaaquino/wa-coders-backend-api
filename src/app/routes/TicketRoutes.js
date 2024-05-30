const router = require("express").Router();
const TicketCreate = require("../controllers/ticket/CreateTicketController");

// Middlewares
const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

// Rotas
router.post(
  "/create",
  imageUpload.array("images"),
  verifyToken,
  TicketCreate.create
);

module.exports = router;
