const express = require('express');
const router = express.Router();
const { 
    createTransaction, 
    getTransactions 
} = require('../controllers/transactionController');
const auth = require('../middleware/auth');
const { validateTransaction } = require('../utils/validation');

router.post('/', auth, validateTransaction, createTransaction);
router.get('/', auth, getTransactions);

module.exports = router;