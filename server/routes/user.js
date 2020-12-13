const express = require("express");
const router = express.Router();


const { authCheck } = require("../middlewares/auth");

const { useCart } = require("../controllers/user");

router.post("/cart", authCheck, useCart);

module.exports = router;