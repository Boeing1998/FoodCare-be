const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// require('dotenv').config();

const userRoutes = require("./src/routes/user.routes");
const { json } = require("express");

mongoose.connect('mongodb+srv://Admin:' + process.env.MONGO_ATLAS_PW + '@clusterhdvt.rw3ju.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-k0bv5n-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
    {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
    });
mongoose.Promise = global.Promise;
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
})
);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use("/user", userRoutes);
app.get("/", (req, res) => {
    res.send(" Hello  Trung");
})

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;