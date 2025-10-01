const router = require("express").Router();
const TicketCreate = require("../controllers/ticket/CreateTicketController");
const GetTicket = require("../controllers/ticket/GetTicketsController");

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

router.get("/get", verifyToken, GetTicket.get);
router.get("/get/:ticketNumber", verifyToken, GetTicket.getId);
module.exports = router;
