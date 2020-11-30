const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

mongoose.connect(process.env.BATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
}).then(() => console.log("DB CONNECTED")).catch((err) => console.log("DB CONNECTED ERR", err));

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

app.use("/api", authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
