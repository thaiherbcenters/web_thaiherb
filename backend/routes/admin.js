/**
 * Admin API Routes
 * จัดการสินค้า - เพิ่ม, แก้ไข, ลบ
 */

const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// GET /api/admin/products - Get all products (including inactive)
router.get('/products', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                id, product_code, name, category, description, 
                icon, tag, price, stock, is_active,
                created_at, updated_at
            FROM products 
            ORDER BY id ASC
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

// POST /api/admin/products - Create new product
router.post('/products', async (req, res) => {
    try {
        const { product_code, name, category, description, icon, tag, price, stock } = req.body;

        // Validate required fields
        if (!name || !price) {
            return res.status(400).json({
                success: false,
                error: 'Name and price are required'
            });
        }

        const result = await pool.query(`
            INSERT INTO products (product_code, name, category, description, icon, tag, price, stock, is_active)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true)
            RETURNING *
        `, [
            product_code || `PRD${Date.now()}`,
            name,
            category || 'ทั่วไป',
            description || '',
            icon || '🌿',
            tag || null,
            price,
            stock || 0
        ]);

        res.json({
            success: true,
            message: 'Product created successfully',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create product'
        });
    }
});

// PUT /api/admin/products/:id - Update product
router.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { product_code, name, category, description, icon, tag, price, stock, is_active } = req.body;

        const result = await pool.query(`
            UPDATE products 
            SET 
                product_code = COALESCE($1, product_code),
                name = COALESCE($2, name),
                category = COALESCE($3, category),
                description = COALESCE($4, description),
                icon = COALESCE($5, icon),
                tag = $6,
                price = COALESCE($7, price),
                stock = COALESCE($8, stock),
                is_active = COALESCE($9, is_active),
                updated_at = NOW()
            WHERE id = $10
            RETURNING *
        `, [product_code, name, category, description, icon, tag, price, stock, is_active, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        res.json({
            success: true,
            message: 'Product updated successfully',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update product'
        });
    }
});

// DELETE /api/admin/products/:id - Delete product (soft delete)
router.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(`
            UPDATE products 
            SET is_active = false, updated_at = NOW()
            WHERE id = $1
            RETURNING id, name
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        res.json({
            success: true,
            message: 'Product deleted successfully',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete product'
        });
    }
});

// PUT /api/admin/products/:id/stock - Update stock only
router.put('/products/:id/stock', async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        if (stock === undefined || stock < 0) {
            return res.status(400).json({
                success: false,
                error: 'Valid stock value is required'
            });
        }

        const result = await pool.query(`
            UPDATE products 
            SET stock = $1, updated_at = NOW()
            WHERE id = $2
            RETURNING id, name, stock
        `, [stock, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        res.json({
            success: true,
            message: 'Stock updated successfully',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error updating stock:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update stock'
        });
    }
});

// GET /api/admin/stats - Get dashboard stats
router.get('/stats', async (req, res) => {
    try {
        const productsCount = await pool.query('SELECT COUNT(*) FROM products WHERE is_active = true');
        const lowStock = await pool.query('SELECT COUNT(*) FROM products WHERE stock < 10 AND is_active = true');
        const outOfStock = await pool.query('SELECT COUNT(*) FROM products WHERE stock = 0 AND is_active = true');
        const categories = await pool.query('SELECT COUNT(DISTINCT category) FROM products WHERE is_active = true');

        res.json({
            success: true,
            data: {
                totalProducts: parseInt(productsCount.rows[0].count),
                lowStock: parseInt(lowStock.rows[0].count),
                outOfStock: parseInt(outOfStock.rows[0].count),
                categories: parseInt(categories.rows[0].count)
            }
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch stats'
        });
    }
});

module.exports = router;
