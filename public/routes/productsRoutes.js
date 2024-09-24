import express from 'express';
import { getProducts } from '../controllers/productController.js';

const router = express.Router();

// Define the route to get products
router.get('/get-products', getProducts);

// Export the router
export default router;