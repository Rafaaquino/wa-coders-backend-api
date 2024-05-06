const mongoose = require("../../db/connect-db");
const { Schema } = mongoose;

const Technologies = mongoose.model(
  "Technologies",
  new Schema({
    prefferTechnology: [
      {
        name: { type: Object, required: true },
        code: { type: Object, required: true },
      },
    ],
  })
);

module.exports = Technologies;
