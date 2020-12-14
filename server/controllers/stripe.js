const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
    const paymentIntent = await stripe.paymentStripes.create({
        amount: 100,
        currency: "brl",
    });

    res.json({
        clientSecret: paymentIntent.client_secret,
    });
}

