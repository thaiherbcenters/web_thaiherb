/**
 * Admin API Routes
 * จัดการสินค้า - เพิ่ม, แก้ไข, ลบ
 */

const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ตั้งค่าที่เก็บไฟล์ Popup Ad
const popupAdDir = path.join(__dirname, '../../public/images/popup');
if (!fs.existsSync(popupAdDir)) {
    fs.mkdirSync(popupAdDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, popupAdDir);
    },
    filename: function (req, file, cb) {
        // แยกไฟล์ระหว่าง PC กับ Mobile
        const type = req.params.type;
        const fileName = type === 'mobile' ? 'popup-ad-mobile.png' : 'popup-ad.png';
        cb(null, fileName);
    }
});
const uploadPopup = multer({ storage: storage });

const configPath = path.join(popupAdDir, 'config.json');

// GET /api/admin/popup-config - Get popup configuration
router.get('/popup-config', (req, res) => {
    try {
        if (fs.existsSync(configPath)) {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            res.json({ success: true, data: config });
        } else {
            res.json({ success: true, data: { endDate: '' } });
        }
    } catch (error) {
        console.error('Error reading popup config:', error);
        res.status(500).json({ success: false, error: 'Failed to read config' });
    }
});

// PUT /api/admin/popup-config - Save popup configuration
router.put('/popup-config', (req, res) => {
    try {
        const { endDate } = req.body;
        const config = { endDate: endDate || '' };
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        res.json({ success: true, message: 'Config saved successfully', data: config });
    } catch (error) {
        console.error('Error saving popup config:', error);
        res.status(500).json({ success: false, error: 'Failed to save config' });
    }
});

// POST /api/admin/popup-ad/:type - Upload popup ad image
router.post('/popup-ad/:type', uploadPopup.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No image uploaded' });
        }
        res.json({ success: true, message: 'Popup ad uploaded successfully' });
    } catch (error) {
        console.error('Error uploading popup ad:', error);
        res.status(500).json({ success: false, error: 'Failed to upload popup ad' });
    }
});

// DELETE /api/admin/popup-ad/:type - Delete popup ad image
router.delete('/popup-ad/:type', (req, res) => {
    try {
        const type = req.params.type;
        const fileName = type === 'mobile' ? 'popup-ad-mobile.png' : 'popup-ad.png';
        const adPath = path.join(popupAdDir, fileName);
        
        if (fs.existsSync(adPath)) {
            fs.unlinkSync(adPath);
            res.json({ success: true, message: 'Popup ad deleted successfully' });
        } else {
            res.json({ success: true, message: 'Popup ad already deleted' });
        }
    } catch (error) {
        console.error('Error deleting popup ad:', error);
        res.status(500).json({ success: false, error: 'Failed to delete popup ad' });
    }
});

// GET /api/admin/products - Get all products (including inactive)
router.get('/products', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                id, product_code, name, category, description, 
                icon, tag, price, stock, is_active, sort_order,
                created_at, updated_at
            FROM products 
            ORDER BY COALESCE(sort_order, 999999) ASC, id ASC
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
            INSERT INTO products (id, product_code, name, category, description, icon, tag, price, stock, is_active)
            OUTPUT inserted.*
            VALUES ((SELECT ISNULL(MAX(id), 0) + 1 FROM products), $1, $2, $3, $4, $5, $6, $7, $8, 1)
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

        console.log('--- Update Product Request ---');
        console.log('ID:', id);
        console.log('Body:', req.body);

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
                updated_at = GETDATE()
            OUTPUT inserted.*
            WHERE id = $10
        `, [product_code, name, category, description, icon, tag, price, stock, is_active, id]);

        console.log('Update Result Row Count:', result.rowCount);
        if (result.rows.length > 0) {
            console.log('Updated Data:', result.rows[0]);
        }

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
            SET is_active = 0, updated_at = GETDATE()
            OUTPUT inserted.id, inserted.name
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
            SET stock = $1, updated_at = GETDATE()
            OUTPUT inserted.id, inserted.name, inserted.stock
            WHERE id = $2
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
        const productsCount = await pool.query('SELECT COUNT(*) as count FROM products WHERE is_active = 1');
        const lowStock = await pool.query('SELECT COUNT(*) as count FROM products WHERE stock < 10 AND is_active = 1');
        const outOfStock = await pool.query('SELECT COUNT(*) as count FROM products WHERE stock = 0 AND is_active = 1');
        const categories = await pool.query('SELECT COUNT(DISTINCT category) as count FROM products WHERE is_active = 1');

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

// PUT /api/admin/products/:id/sort-order - Update sort order only
router.put('/products/:id/sort-order', async (req, res) => {
    try {
        const { id } = req.params;
        const { sort_order } = req.body;

        if (sort_order === undefined || sort_order < 0) {
            return res.status(400).json({
                success: false,
                error: 'Valid sort_order value is required'
            });
        }

        const result = await pool.query(`
            UPDATE products 
            SET sort_order = $1, updated_at = GETDATE()
            OUTPUT inserted.id, inserted.name, inserted.sort_order
            WHERE id = $2
        `, [sort_order, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        res.json({
            success: true,
            message: 'Sort order updated successfully',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error updating sort order:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update sort order'
        });
    }
});
module.exports = router;
