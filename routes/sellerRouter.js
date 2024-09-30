const express = require("express");
const sellerRouter = express.Router();
const sellerController = require("../controllers/sellerController");
const uploadOptions = require("../middleware/uploadMiddleware"); // multer config

// Route for adding products (with images)
sellerRouter.post('/seller-addProduct', uploadOptions.array("images",10), sellerController.addProduct);

module.exports = sellerRouter;
