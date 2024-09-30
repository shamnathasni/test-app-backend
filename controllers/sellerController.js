const Product = require('../models/ProductModel'); // Import your Product model

// Controller function to handle adding a product
exports.addProduct = async (req, res) => {
    try {
        const { name, price, description, category, role } = req.body;

        // Check if images are uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ alert: "No images uploaded", status: false });
        }

        // Extract filenames from req.files
        const imageFilenames = req.files.map(file => file.filename); // Only store the filenames
console.log(req.files.name,"trdrt");

        // Create new product using data from request
        const newProduct = new Product({
            name,
            price,
            description,
            category,
            images: imageFilenames, // Store only filenames
            owner: role,
        });

        // Save product to the database
        await newProduct.save();
        res.json({ alert: "Product added successfully!", status: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: false,
            alert: "Failed to add product",
            error: error.message,
        });
    }
};
