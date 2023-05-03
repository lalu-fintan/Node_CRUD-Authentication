const express = require("express");
const { register, login, current } = require("../controllers/userController");
const validation = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current", validation, current);

module.exports = router;
