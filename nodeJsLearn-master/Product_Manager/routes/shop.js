const path = require("path");

const express = require("express");

const router = express.Router();

const shopControllers = require("../controllers/shop");

const adminControllers = require("../controllers/admin");
const AuthRoute = require('../controllers/procRoutes')
    //for index products page


router.get("/products/:productId", shopControllers.getProductDetails);
router.get("/products", shopControllers.getProducts);
router.get("/cart", AuthRoute.AuthRoute, shopControllers.getCart);
router.post("/cart", shopControllers.postCart);

router.get("/", shopControllers.getIndexProducts);
router.post('/cart/:prodId', shopControllers.deleteCartItem)
router.post('/orders', shopControllers.PostplaceOrder)
router.get('/orders', shopControllers.getOrders)

module.exports = router;