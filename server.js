const express = require('express');
const cors = require('cors');
require('dotenv').config();


// Update these paths
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');
const categoryRoutes = require('./src/routes/categories');
const supplierRoutes = require('./src/routes/suppliers');
const transactionRoutes = require('./src/routes/transactions');
const notificationRoutes = require('./src/routes/notifications');
const demandForecastRoutes = require('./src/routes/demandForecast');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/demand-forecast', demandForecastRoutes);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});