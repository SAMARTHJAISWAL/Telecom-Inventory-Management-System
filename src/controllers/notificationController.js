const db = require('../config/db');

const getNotifications = async (req, res) => {
    try {
        const { type } = req.query;
        let query = `
            SELECT 
                n.*, 
                p.p_name, 
                p.stock_level,
                p.reorder_point,
                c.category_name
            FROM notifications n
            LEFT JOIN products p ON n.p_id = p.p_id
            LEFT JOIN categories c ON p.category_id = c.category_id
            WHERE 1=1
        `;
        const queryParams = [];

        if (type) {
            query += ' AND n.type = ?';
            queryParams.push(type);
        }

        query += ' ORDER BY n.created_at DESC';

        const [notifications] = await db.execute(query, queryParams);
        
        // Remove duplicate 
        const uniqueNotifications = Array.from(
            new Map(notifications.map(item => [item.message, item])).values()
        );

        res.json(uniqueNotifications);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching notifications', 
            error: error.message 
        });
    }
};

const markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.execute(
            'UPDATE notifications SET is_read = TRUE WHERE n_id = ?', 
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error marking notification as read', 
            error: error.message 
        });
    }
};

const getUnreadNotifications = async (req, res) => {
    try {
        const [notifications] = await db.execute(`
            SELECT 
                n.*, 
                p.p_name, 
                p.stock_level,
                p.reorder_point,
                c.category_name
            FROM notifications n
            LEFT JOIN products p ON n.p_id = p.p_id
            LEFT JOIN categories c ON p.category_id = c.category_id
            WHERE n.is_read = FALSE
            ORDER BY n.created_at DESC
        `);

        res.json(notifications);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching unread notifications', 
            error: error.message 
        });
    }
};

module.exports = {
    getNotifications,
    markNotificationAsRead,
    getUnreadNotifications
};