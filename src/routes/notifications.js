const express = require('express');
const router = express.Router();
const { 
    getNotifications, 
    markNotificationAsRead,
    getUnreadNotifications
} = require('../controllers/notificationController');
const auth = require('../middleware/auth');

router.get('/', auth, getNotifications);

router.get('/unread', auth, getUnreadNotifications);

router.put('/:id/read', auth, markNotificationAsRead);

module.exports = router;