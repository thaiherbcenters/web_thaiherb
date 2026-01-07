/**
 * Migration: Add sort_order column to products table
 */

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

async function migrate() {
    try {
        console.log('🔄 Adding sort_order column to products table...\n');

        // Add sort_order column if it doesn't exist
        await pool.query(`
            ALTER TABLE products 
            ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0
        `);
        console.log('✅ Added sort_order column (or already exists)\n');

        // Initialize sort_order based on existing id to maintain current order
        const result = await pool.query(`
            UPDATE products 
            SET sort_order = id 
            WHERE sort_order IS NULL OR sort_order = 0
            RETURNING id, name, sort_order
        `);

        console.log(`✅ Initialized sort_order for ${result.rowCount} products\n`);

        // Show current products with sort_order
        const products = await pool.query(`
            SELECT id, name, sort_order 
            FROM products 
            ORDER BY sort_order ASC, id ASC
            LIMIT 10
        `);

        console.log('📋 Current products (first 10):');
        products.rows.forEach(p => {
            console.log(`   #${p.sort_order} - [ID:${p.id}] ${p.name}`);
        });

        console.log('\n✅ Migration completed successfully!');

    } catch (error) {
        console.error('❌ Migration failed:', error.message);
    } finally {
        await pool.end();
    }
}

migrate();
