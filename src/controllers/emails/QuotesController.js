const transporter = require("../../helpers/mailer");
const config = require("../../config/config");
const getQuoteHTML = require("../../views/quotes-template");
const Quote = require("../../models/Quote");

module.exports = class QuotesController {
  static async send(req, res) {
    const { step1, step2, step3, step4, step5 } = req.body;

    console.log("veio ", req.body);

    //validations step1
    if (!step1) {
      return res.status(422).json({ message: "Labels required" });
    }

    if (!step1.firstName) {
      return res.status(422).json({ message: "Name is required" });
    }

    if (!step1.lastName) {
      return res.status(422).json({ message: "Last Name is required" });
    }

    if (!step1.email) {
      return res.status(422).json({ message: "Email is required" });
    }

    if (!step1.country) {
      return res.status(422).json({ message: "Country is required" });
    }

    if (!step1.city) {
      return res.status(422).json({ message: "City is required" });
    }

    if (!step1.companyName) {
      return res.status(422).json({ message: "City is required" });
    }

    //validations step2
    if (!step2) {
      return res.status(422).json({ message: "Labels required" });
    }

    if (!step2.serviceType) {
      return res.status(422).json({ message: "Service Type is required" });
    }

    if (!step2.objectiveSoftware) {
      return res
        .status(422)
        .json({ message: "Objective of the software is required" });
    }

    if (!step2.deadline) {
      return res.status(422).json({ message: "Deadeline is required" });
    }

    //validations step3
    if (!step3) {
      return res.status(422).json({ message: "Labels required" });
    }

    if (!step3.projectScope) {
      return res.status(422).json({ message: "Deadeline is required" });
    }

    //validations step4
    if (!step4) {
      return res.status(422).json({ message: "Labels required" });
    }

    if (step4.prefferTecnology.length == 0) {
      return res.status(422).json({ message: "Select as Tecnologys" });
    }

    //validations step5
    if (!step5) {
      return res.status(422).json({ message: "Labels required" });
    }

    if (!step5.budget) {
      return res.status(422).json({ message: "Budget required" });
    }

    const newQuotes = new Quote({ step1, step2, step3, step4, step5 });
    const html = getQuoteHTML(step1, step2, step3, step4, step5);

    try {
      await newQuotes.save();

      const mailOptions = {
        from: config.EMAIL,
        to: config.EMAIL,
        bcc: step1.email,
        subject: "WA Coders Quotes",
        html: html,
      };

      console.log(mailOptions);

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          res.status(500).json({ message: "Error sending email", error });
        } else {
          res.status(200).json({ message: "Email successfully sent" });
        }
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server erro! Try again", error: error });
    }
  }
};
