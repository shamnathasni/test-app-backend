const express = require("express")
const userRoute = express.Router()
// const { authMiddleware } = require("../middleware/authMiddleware")
// const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware")
const userController = require("../controllers/userController")

userRoute.post("/userSignup", userController.userSignup)
userRoute.post("/userLogin", userController.userLogin)
// userRoute.get("/products",authMiddleware, roleMiddleware(['user']), userController.productListing)
userRoute.get("/products",userController.productListing)

module.exports = userRoute;
