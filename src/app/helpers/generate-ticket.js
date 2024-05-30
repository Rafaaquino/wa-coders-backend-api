const Ticket = require("../models/Ticket");

const generateTicketNumber = async () => {
  let ticketNumber;
  let existingTicket;

  do {
    ticketNumber = Math.floor(
      1000000000 + Math.random() * 9000000000
    ).toString();
    existingTicket = await Ticket.findOne({ ticketNumber });
  } while (existingTicket);

  return ticketNumber;
};

module.exports = generateTicketNumber;
