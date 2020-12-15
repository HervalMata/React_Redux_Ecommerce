const express = require("express");
const router = express.Router();


const { authCheck } = require("../middlewares/auth");

const { userCart, getUserCart, emptyUserCart, saveAddress, applyCouponToUserCart, createOrder, orders } = require("../controllers/user");

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyUserCart);
router.post("/user/address", authCheck, saveAddress);
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);
router.post("/user/order", authCheck, createOrder);
router.get("/user/orders", authCheck, orders);

module.exports = router;