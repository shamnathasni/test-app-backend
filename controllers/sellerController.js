const Product = require('../models/ProductModel'); // Import your Product model

// Controller function to handle adding a product
exports.addProduct = async (req, res) => {
    try {
        console.log("Request Files: ", req.files); // Add logging to see if files are received
        const { name, price, description, category, role } = req.body;
        const image = req.files
        // if (!image ) {
        //     return res.status(400).json({ alert: "No images uploaded", status: false });
        // }
        // if (!req.files || req.files.length === 0) {
        //     return res.status(400).json({ alert: "No images uploaded", status: false });
        // }

        // const imageFilenames = req.files.map(file => file.filename);
        
        const newProduct = new Product({
            name,
            price,
            description,
            category,
            images: image,
            owner: role,
        });

        await newProduct.save();
        res.json({ alert: "Product added successfully!", status: true });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({
            status: false,
            alert: "Failed to add product",
            error: error.message,
        });
    }
};
