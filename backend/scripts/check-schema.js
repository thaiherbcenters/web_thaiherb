/**
 * Check database schema and tables
 */

const { pool } = require('../config/database');

async function checkSchema() {
    const client = await pool.connect();

    try {
        console.log('🔍 Checking database schema and tables...\n');

        // Check which schema products table is in
        const schemaResult = await client.query(`
            SELECT table_schema, table_name 
            FROM information_schema.tables 
            WHERE table_name = 'products'
        `);

        if (schemaResult.rows.length > 0) {
            console.log('📋 Products table location:');
            schemaResult.rows.forEach(row => {
                console.log(`   Schema: ${row.table_schema}`);
                console.log(`   Table: ${row.table_name}`);
            });
        } else {
            console.log('❌ Products table not found!');
        }

        // List all tables in public schema
        console.log('\n📁 All tables in database:');
        const tablesResult = await client.query(`
            SELECT table_schema, table_name 
            FROM information_schema.tables 
            WHERE table_schema NOT IN ('information_schema', 'pg_catalog')
            ORDER BY table_schema, table_name
        `);

        tablesResult.rows.forEach(row => {
            console.log(`   ${row.table_schema}.${row.table_name}`);
        });

        // Show products count
        console.log('\n📊 Products data check:');
        try {
            const countResult = await client.query('SELECT COUNT(*) as count FROM public.products');
            console.log(`   Total products in public.products: ${countResult.rows[0].count}`);

            // Show first 5 products
            const sampleResult = await client.query('SELECT product_code, name, price FROM public.products LIMIT 5');
            console.log('\n📦 Sample products:');
            sampleResult.rows.forEach(row => {
                console.log(`   ${row.product_code}: ${row.name} (฿${row.price})`);
            });
        } catch (err) {
            console.log(`   Error querying products: ${err.message}`);
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

checkSchema();
