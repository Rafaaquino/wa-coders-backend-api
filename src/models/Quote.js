const mongoose = require("../db/connect-db");
const { Schema } = mongoose;

const Quotes = mongoose.model(
  "Quotes",
  new Schema(
    {
      step1: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        companyName: { type: String, required: true },
      },
      step2: {
        serviceType: { type: String, required: true },
        objectiveSoftware: { type: String, required: true },
        deadline: { type: String, required: true },
      },
      step3: {
        projectScope: { type: String, required: true },
        features: { type: String },
        integrations: { type: String },
      },
      step4: {
        prefferTecnology: { type: Object, required: true },
        prefferDesing: { type: String },
        security: { type: String },
      },
      step5: {
        budget: { type: String, required: true },
        additionalNotes: { type: String },
      },
    },
    { timestamps: true }
  )
);

module.exports = Quotes;
