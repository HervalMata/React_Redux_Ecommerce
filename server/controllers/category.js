const Category = require("../models/category");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        res.json(await new Category({ name, slug: slugify(name) }).save());
    } catch (err) {
        res.status(400).send("Create Category Failed");
    }
};

exports.list = async (req, res) =>
        res.json(await Category.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
    let category = await Category.findOne({ slug: req.params.slug }).exec();
    const products = await Product.find({ category }).populate("category").exec();
    res.json({category, products});
};

exports.update = async (req, res) => {
    const { name } = req.body;
    try {
        const updated = await Category.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name) },
            { new: true }
            );
        res.json(updated);
    } catch (err) {
        res.status(400).send("Create Updated Category Failed");
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Category.findOneAndDelete(
            { slug: req.params.slug },
        );
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Create Deleted Category Failed");
    }
};