const mongoose = require("../../db/connect-db");
const imageSchema = require("./Images");
const { Schema } = mongoose;

const Ticket = mongoose.model(
  "Tickets",
  new Schema(
    {
      ticketNumber: { type: Number, required: true, unique: true },
      user: {
        type: Array,
        required: true,
      },
      status: {
        type: String,
        required: true,
        enum: ["analyzing", "in-progress", "resolved", "closed"],
        default: "open",
      },
      images: [imageSchema],
      description: { type: String, required: true },
    },
    { timestamps: true }
  )
);

module.exports = Ticket;
