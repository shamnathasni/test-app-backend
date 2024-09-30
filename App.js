const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const app = express();

dotenv.config(); // Load environment variables
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
require("./config/dbConfig")(); // Ensure database configuration is loaded

app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const userRoute = require("./routes/userRouter");
app.use("/", userRoute); 
const sellerRoute = require("./routes/sellerRouter");
app.use("/seller", sellerRoute); 

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
