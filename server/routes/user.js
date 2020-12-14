const express = require("express");
const router = express.Router();


const { authCheck } = require("../middlewares/auth");

const { userCart, getUserCart, emptyUserCart } = require("../controllers/user");

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyUserCart);

module.exports = router;