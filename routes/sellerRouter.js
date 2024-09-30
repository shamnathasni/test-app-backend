const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.post('/seller-addProduct', upload, productController.addProduct); // Here, `upload` is the multer middleware
