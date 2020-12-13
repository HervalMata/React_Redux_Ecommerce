const User = require("../models/user") ;
const Product = require("../models/product");
const Cart = require("../models/cart");

exports.userCart = async (req, res) => {
    const { cart } = req.body;

    let products = [];

    const user = await User.findOne({ email: req.user.email }).exec();

    let cartExistByThisUser = await Cart.findOne({ orderBy: user._id }).exec();

    if (cartExistByThisUser) {
        cartExistByThisUser.remove();
        console.log("removed old cart");
    }

    for (let i = 0; i < cart.length; i++) {
        let object = {};

        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.color = cart[i].color;
        let { price } = await Product
            .findById(cart[i]._id)
            .select("price").exec();
        object.price = price;

        products.push(object);
    }

    let newCart = await new Cart({
        products, cartTotal, orderBy: user._id,
    }).save();

    console.log("new cart", newCart);
    res.json({ ok: true });
};

