const sql = require('mssql');
require('dotenv').config();

const sqlConfig = {
    user: process.env.MSSQL_USER || 'THAIHERB',
    password: process.env.MSSQL_PASSWORD,
    database: process.env.MSSQL_DATABASE || 'WEB_THAIHERB',
    server: process.env.MSSQL_SERVER || '10.0.0.10',
    port: parseInt(process.env.MSSQL_PORT) || 1433,
    pool: {
        max: 20,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(sqlConfig).connect()
    .then(pool => {
        console.log('✅ Connected to MSSQL Database successfully!');
        return pool;
    })
    .catch(err => {
        console.error('❌ Database Connection Failed! Bad Config: ', err);
        throw err;
    });

const pool = {
    query: async (text, params = []) => {
        const connection = await poolPromise;
        const request = connection.request();
        
        let mssqlText = text;
        
        // Translate PostgreSQL parameterized queries ($1, $2) to MSSQL (@param1, @param2)
        if (params && params.length > 0) {
            params.forEach((param, index) => {
                const paramName = `param${index + 1}`;
                mssqlText = mssqlText.replace(new RegExp(`\\$${index + 1}\\b`, 'g'), `@${paramName}`);
                request.input(paramName, param);
            });
        }
        
        try {
            const result = await request.query(mssqlText);
            
            // Return in pg-compatible format
            return {
                rows: result.recordset || [],
                rowCount: result.rowsAffected ? result.rowsAffected[0] : 0
            };
        } catch (error) {
            console.error('Query Error in MSSQL Wrapper:', error);
            console.error('Original Query:', text);
            console.error('Translated Query:', mssqlText);
            throw error;
        }
    },
    connect: async () => {
        await poolPromise;
        return {
            query: async (t, p) => pool.query(t, p),
            release: () => {}
        };
    },
    end: async () => {
        const connection = await poolPromise;
        connection.close();
    }
};

const testConnection = async () => {
    try {
        await poolPromise;
        return true;
    } catch (err) {
        return false;
    }
};

module.exports = {
    pool,
    testConnection
};
