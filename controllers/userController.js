const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Product = require("../models/ProductModel");
require("dotenv").config();

const securePassword = async (password) => {
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      return passwordHash;
    } catch (error) {
      console.log(error.message);
    }
  };

  const userSignup = async (req, res) => {
    try {
        const { name, number, email, password, role } = req.body;
        console.log(req.body, "req.body"); 
        
        const existingUser = await User.findOne({ email, role });
        console.log(existingUser, "req.existingUser"); 
        if (existingUser) {
            return res.json({ alert: "Email already exists for this role", status: false });
        }

        // Secure the password using bcrypt
        const hashedPassword = await securePassword(password);

        // Create a new user
        const userData = new User({ 
            name, 
            number, 
            email, 
            password: hashedPassword, 
            role, 
            is_verified: true 
        });
        const newUser = await userData.save();


        // If user is successfully created, generate a token
        if (newUser) {
            const token = jwt.sign(
              { userId: newUser._id, role: newUser.role },
              process.env.JWT_SECRET,
              { expiresIn: "1d" }
            );

            // Respond with user data and token
            return res.json({
              newUser,
              alert: "You have successfully signed up!",
              status: true,
              role: newUser.role,
              token,
            });
        } else {
            res.json({ alert: "Failed to create user", status: false });
        }
    } catch (error) {
        console.log(error.message);
        return res
          .status(500)
          .json({ alert: "Internal server error", status: false });
      }
    
};


const userLogin = async ( req, res )=>{
    try {
        const { email, password } = req.body
        const existingEmail = await User.findOne({email,is_verified:true})
        if (existingEmail) {
            const acess = await bcrypt.compare(password,existingEmail.password)
            if(acess){
                const token = jwt.sign(
                    {userId:existingEmail._id},
                    process.env.JWT_SECRET,
                    {expiresIn:"1d"}
                )
            
            res.json({
                newUser:existingEmail,
                status:true,
                alert:"successfully login",
                token,
                role:existingEmail.role
            })
        }else{
            res.status(200).json({ alert: "password is incorrect", status: false });        }
        }else{
            res.status(200).json({ alert: "no user found on this email", status: false });        }
    } catch (error) {
       console.log(error.message);
       return res.status(500).json({ message: "Internal server error" });
        
    }
}

const productListing = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find({});
        console.log(products, "products");

        // Send success response with the products
        res.json({
            status: true,
            products,
            alert: "Product listed successfully",
        });

    } catch (error) {
        console.log("Error fetching products:", error.message);

        // Send failure response in case of an error
        res.status(500).json({
            status: false,
            alert: "Failed to list products",
            error: error.message,
        });
    }
};


module.exports = {
    userSignup,
    userLogin,
    productListing
};
