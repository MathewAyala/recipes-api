const router = require("express").Router();

const recipes = require("./recipes");
router.use("/recipes", recipes);

module.exports = router;