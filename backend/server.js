/**
 * Thai Herb Center - Backend API Server
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const promptpayRoutes = require('./routes/promptpay');
const adminRoutes = require('./routes/admin');
const newsRoutes = require('./routes/news');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/promptpay', promptpayRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/news', newsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Thai Herb Center API is running',
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        name: 'Thai Herb Center API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            products: '/api/products',
            productById: '/api/products/:id',
            productsByCategory: '/api/products/category/:category'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🌿 Thai Herb Center API Server`);
    console.log(`   Running on: http://localhost:${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/api/health`);
    console.log(`   Products API: http://localhost:${PORT}/api/products\n`);
});
