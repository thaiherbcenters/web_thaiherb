/**
 * Products API Routes
 */

const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// GET /api/products - Get all products
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                id, product_code, name, category, description, 
                icon, tag, price, stock, is_active,
                created_at, updated_at
            FROM products 
            WHERE is_active = true
            ORDER BY 
                CASE 
                    WHEN tag = 'ขายดี' THEN 1
                    WHEN tag = 'แนะนำ' THEN 2
                    WHEN tag = 'ใหม่' THEN 3
                    ELSE 4
                END,
                id ASC
        `);

        res.json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch products'
        });
    }
});

// GET /api/products/categories - Get all categories
router.get('/categories', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT DISTINCT category, COUNT(*) as count
            FROM products 
            WHERE is_active = true
            GROUP BY category
            ORDER BY count DESC
        `);

        res.json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch categories'
        });
    }
});

// GET /api/products/category/:category - Get products by category
router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;

        const result = await pool.query(`
            SELECT 
                id, product_code, name, category, description, 
                icon, tag, price, stock, is_active,
                created_at, updated_at
            FROM products 
            WHERE category = $1 AND is_active = true
            ORDER BY 
                CASE 
                    WHEN tag = 'ขายดี' THEN 1
                    WHEN tag = 'แนะนำ' THEN 2
                    WHEN tag = 'ใหม่' THEN 3
                    ELSE 4
                END,
                id ASC
        `, [category]);

        res.json({
            success: true,
            category: category,
            count: result.rows.length,
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch products by category'
        });
    }
});

// GET /api/products/:id - Get single product by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(`
            SELECT 
                id, product_code, name, category, description, 
                icon, tag, price, stock, is_active,
                created_at, updated_at
            FROM products 
            WHERE id = $1
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch product'
        });
    }
});

// GET /api/products/code/:code - Get product by product code
router.get('/code/:code', async (req, res) => {
    try {
        const { code } = req.params;

        const result = await pool.query(`
            SELECT 
                id, product_code, name, category, description, 
                icon, tag, price, stock, is_active,
                created_at, updated_at
            FROM products 
            WHERE product_code = $1
        `, [code.toUpperCase()]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error fetching product by code:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch product'
        });
    }
});

// GET /api/products/search/:query - Search products
router.get('/search/:query', async (req, res) => {
    try {
        const { query } = req.params;

        const result = await pool.query(`
            SELECT 
                id, product_code, name, category, description, 
                icon, tag, price, stock, is_active,
                created_at, updated_at
            FROM products 
            WHERE (name ILIKE $1 OR description ILIKE $1 OR category ILIKE $1)
            AND is_active = true
            ORDER BY name ASC
        `, [`%${query}%`]);

        res.json({
            success: true,
            query: query,
            count: result.rows.length,
            data: result.rows
        });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to search products'
        });
    }
});

module.exports = router;
