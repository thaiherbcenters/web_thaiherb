const { pool } = require('./config/database.js');

async function inspectDb() {
    try {
        const client = await pool.connect();
        
        // Get all tables
        const tablesQuery = `
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_type = 'BASE TABLE';
        `;
        const res = await client.query(tablesQuery);
        const tables = res.rows.map(row => row.table_name);
        
        console.log(`Found ${tables.length} tables in the public schema:\n`);
        
        // Get count and a sample of columns for each table
        for (const table of tables) {
            const countQuery = `SELECT COUNT(*) FROM "${table}"`;
            const countRes = await client.query(countQuery);
            const count = countRes.rows[0].count;
            
            console.log(`Table: ${table} - ${count} rows`);
            
            const columnsQuery = `
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = '${table}'
            `;
            const columnsRes = await client.query(columnsQuery);
            const columns = columnsRes.rows.map(row => `${row.column_name} (${row.data_type})`).join(', ');
            console.log(`  Columns: ${columns}\n`);
        }
        
        client.release();
    } catch (err) {
        console.error('Error inspecting DB:', err);
    } finally {
        await pool.end();
    }
}

inspectDb();
