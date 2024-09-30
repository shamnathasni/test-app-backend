const mongoose = require("mongoose");
require("dotenv").config();

module.exports = (connection) => {
    mongoose
        .connect(connection || process.env.MONGO_URL,)
        .then(() => {
            console.log("db connection successful");
        })
        .catch((err) => {
            console.error("db connection error:", err);
        });
};