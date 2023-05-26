const express = require('express');
const router = express.Router();
const {getProducts, getProductById, getStylesById, getRelatedPro} = require('./controllers.js');

// get a list of products
router.get('/products', getProducts);
// get product information for a specified product id
router.get('/products/:product_id', getProductById);
// get all styles available for the given product
router.get('/products/:product_id/styles', getStylesById);
// get the id's of products related to the given product id
router.get('/products/:product_id/related', getRelatedPro);


module.exports = router;