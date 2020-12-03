const admin = require("../firebase");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
    console.log(req.headers);
    try {
        const firebaseUser = await admin
            .auth()
            .verifyIdToken(req.headers.authtoken);
        console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
        req.user = firebaseUser;
        next();
    } catch (err) {
        await res.status(401).json({
            err: "Invalid or expired token",
        });
    }
};

exports.adminCheck = async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await User.findOne({ email }).exec();
    //console.log(req.headers);
    if (adminUser.role !== "admin") {
        await res.status(403).json({
            err: "Admin resource.AAccess denied",
        });
    } else {
        next();
    }
};