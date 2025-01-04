const express = require('express');
const router = express.Router();
const { 
    calculateDemandForecast, 
    getDemandForecasts 
} = require('../controllers/demandForecastController');
const auth = require('../middleware/auth');

router.post('/calculate', auth, (req, res, next) => {
    if (['Admin', 'Manager'].includes(req.user.type)) {
        return next();
    }
    res.status(403).json({ message: 'Access denied' });
}, calculateDemandForecast);

router.get('/', auth, (req, res, next) => {
    if (['Admin', 'Manager'].includes(req.user.type)) {
        return next();
    }
    res.status(403).json({ message: 'Access denied' });
}, getDemandForecasts);

module.exports = router;