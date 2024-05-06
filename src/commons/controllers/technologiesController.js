const Technology = require("../models/Technologies");

module.exports = class getTechnologiesController {
  static async getAll(req, res) {
    const technologies = await Technology.find();

    console.log(technologies);

    if (!technologies) {
      return res.status(422).json({ message: "Not exist in database" });
    }

    try {
      res.status(200).json({ technologies });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao tentar buscar produtos", error: error });
    }
  }

  static async postAll(req, res) {
    const { prefferTechnology } = req.body;

    console.log(req.body);

    const t = new Technology({ prefferTechnology });

    try {
      await t.save();
      res.status(201).json({ message: "funcionou!" });
    } catch (error) {
      res.status(500).json({ message: "algo deu errado!", error });
    }
  }
};
