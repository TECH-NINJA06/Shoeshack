import express from 'express';
const router = express.Router();
import productController from '../controllers/products.controllers'

// Route to add multiple products
router.post('/products', productController.addProducts);

module.exports = router;
