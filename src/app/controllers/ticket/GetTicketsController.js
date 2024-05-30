const Ticket = require("../../models/Ticket");

module.exports = class GetTicketsController {
  static async get(req, res) {
    const tickets = Ticket.find();
    console.log(tickets);

    if (!tickets) {
      return res.status(422).json({ message: "Not Tickets" });
    }

    try {
      res.status(200).json({ tickets });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async getId(req, res) {
    const ticketNumber = req.params.ticketNumber;
    console.log(ticketNumber);

    if (!ticketNumber) {
      return res.status(422).json({ message: "Invalid Ticket" });
    }

    const ticketId = await Ticket.findOne({ ticketNumber });

    if (!ticketId) {
      return res.status(404).json({ message: "Ticket Not Found!" });
    }

    try {
      res.status(200).json({ ticketId });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
};
