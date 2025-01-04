const express = require('express');
const router = express.Router();
const { 
    getAllProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    searchProducts, 
    getProductById
} = require('../controllers/productController');
const auth = require('../middleware/auth');
const { validateProduct } = require('../utils/validation');

router.get('/', auth, getAllProducts);

router.get('/search', auth, searchProducts);

router.post('/', auth, validateProduct, addProduct);

router.put('/:id', auth, validateProduct, updateProduct);

router.delete('/:id', auth, deleteProduct);

router.get('/:id', auth, getProductById);

module.exports = router;