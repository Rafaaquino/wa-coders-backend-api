const mongoose = require("../../db/connect-db");
const { Schema } = mongoose;

const ImagesSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

module.exports = ImagesSchema;
