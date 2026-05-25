require('dotenv').config();
const { pool: pgPool } = require('./config/database.js');
const sql = require('mssql');

// Configuration for MSSQL
const sqlConfig = {
    user: 'THAIHERB',
    password: process.env.MSSQL_PASSWORD,
    database: 'WEB_THAIHERB',
    server: '10.0.0.10',
    port: 1433,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // For local networks
        trustServerCertificate: true // Trust self-signed certificates
    }
};

async function migrate() {
    if (!process.env.MSSQL_PASSWORD) {
        console.error('❌ Error: MSSQL_PASSWORD is not set in .env file.');
        console.log('Please add "MSSQL_PASSWORD=your_password" to the backend/.env file and run this script again.');
        process.exit(1);
    }

    try {
        console.log('🔄 Step 1: Connecting to PostgreSQL...');
        const pgClient = await pgPool.connect();
        
        console.log('📥 Step 2: Fetching data from products table...');
        const pgRes = await pgClient.query('SELECT * FROM products');
        const products = pgRes.rows;
        console.log(`✅ Found ${products.length} products to migrate.`);
        pgClient.release();

        console.log('🔄 Step 3: Connecting to MSSQL Server (10.0.0.10:1433)...');
        await sql.connect(sqlConfig);
        console.log('✅ Connected to MSSQL successfully.');

        console.log('🛠️ Step 4: Creating "products" table in MSSQL (if not exists)...');
        await sql.query(`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='products' and xtype='U')
            BEGIN
                CREATE TABLE products (
                    id INT PRIMARY KEY,
                    price DECIMAL(18,2),
                    stock INT,
                    is_active BIT,
                    created_at DATETIME2,
                    updated_at DATETIME2,
                    sort_order INT,
                    product_code NVARCHAR(255),
                    name NVARCHAR(255),
                    category NVARCHAR(255),
                    description NVARCHAR(MAX),
                    icon NVARCHAR(MAX),
                    tag NVARCHAR(255)
                )
                PRINT 'Table products created.'
            END
            ELSE
            BEGIN
                PRINT 'Table products already exists.'
            END
        `);

        console.log('📤 Step 5: Inserting data into MSSQL...');
        let successCount = 0;
        let errorCount = 0;

        for (const product of products) {
            try {
                const insertQuery = `
                    IF EXISTS (SELECT 1 FROM products WHERE id = @id)
                    BEGIN
                        UPDATE products SET
                            price = @price, stock = @stock, is_active = @is_active, 
                            created_at = @created_at, updated_at = @updated_at, sort_order = @sort_order,
                            product_code = @product_code, name = @name, category = @category, 
                            description = @description, icon = @icon, tag = @tag
                        WHERE id = @id
                    END
                    ELSE
                    BEGIN
                        INSERT INTO products (
                            id, price, stock, is_active, created_at, updated_at, sort_order,
                            product_code, name, category, description, icon, tag
                        ) VALUES (
                            @id, @price, @stock, @is_active, @created_at, @updated_at, @sort_order,
                            @product_code, @name, @category, @description, @icon, @tag
                        )
                    END
                `;
                
                const req = new sql.Request();
                req.input('id', sql.Int, product.id);
                req.input('price', sql.Decimal(18,2), product.price);
                req.input('stock', sql.Int, product.stock);
                req.input('is_active', sql.Bit, product.is_active);
                req.input('created_at', sql.DateTime2, product.created_at);
                req.input('updated_at', sql.DateTime2, product.updated_at);
                req.input('sort_order', sql.Int, product.sort_order);
                req.input('product_code', sql.NVarChar(255), product.product_code);
                req.input('name', sql.NVarChar(255), product.name);
                req.input('category', sql.NVarChar(255), product.category);
                req.input('description', sql.NVarChar(sql.MAX), product.description);
                req.input('icon', sql.NVarChar(sql.MAX), product.icon);
                req.input('tag', sql.NVarChar(255), product.tag);

                await req.query(insertQuery);
                successCount++;
            } catch (err) {
                console.error(`❌ Failed to insert product ID ${product.id}:`, err.message);
                errorCount++;
            }
        }

        console.log(`\n🎉 Migration Summary:`);
        console.log(`   Total Migrated: ${successCount}`);
        if (errorCount > 0) console.log(`   Failed: ${errorCount}`);
        console.log(`✅ Process completed successfully!`);

    } catch (err) {
        console.error('\n❌ Migration process failed:', err);
    } finally {
        // Close both connections
        await pgPool.end();
        await sql.close();
        console.log('Connections closed.');
    }
}

migrate();
