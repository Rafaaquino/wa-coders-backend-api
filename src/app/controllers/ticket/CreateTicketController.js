const Ticket = require("../../models/Ticket");
const generateTicketNumber = require("../../helpers/generate-ticket");

module.exports = class CreateTicketController {
  static async create(req, res) {
    const { user, description } = req.body;
    const images = req.files;

    console.log(req.body);

    if (!user) {
      return res.status(422).json({ message: "User is required" });
    }

    if (!description) {
      return res.status(422).json({ message: "Description is required" });
    }

    if (images != undefined) {
      images.map((file) => ({
        filename: file.filename,
        path: file.path,
      }));
    }

    const ticketNumber = await generateTicketNumber();

    const newTicket = new Ticket({
      ticketNumber: ticketNumber,
      status: "analyzing",
      user: user,
      images: images,
      description: description,
    });

    console.log(newTicket);

    try {
      await newTicket.save();
      res
        .status(201)
        .json({ message: "Ticket created successfully", ticket: newTicket });
    } catch (error) {
      res.status(500).json({ message: "Failed to create ticket", error });
    }
  }
};
