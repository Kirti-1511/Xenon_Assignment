const path = require('path');
const express = require('express')
const router = express.Router();
const adminControllers = require('../controllers/admin')

//   /admin/add-products => GET request 


router.get('/add-products', adminControllers.getAddProduct

);


// /admin/add-products ==>POST request 


router.post('/add-products', adminControllers.postProduct)
router.get('/edit-product/:productId', adminControllers.getEditProducts)
router.post('/edit-product', adminControllers.PostEditProduct)
router.get('/products', adminControllers.getAdminProducts)
router.post('/delete-product', adminControllers.delete_Product_Post_Request_Handeler)

module.exports = router;