const router = require("express").Router();
const AddTechnology = require("../controllers/technologiesController");

router.post("/technologies/register", AddTechnology.postAll);
router.get("/technologies/get", AddTechnology.getAll);

module.exports = router;
