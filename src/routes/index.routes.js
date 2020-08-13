const { Router } = require("express");
const router = Router();

const { renderHome, renderSobre } = require("../controllers/index.controller");

router.get("/", renderHome);

router.get("/sobre", renderSobre);

module.exports = router;
