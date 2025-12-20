/**
 * Database Connection Test Script
 * Run this file to test if the database connection is working
 * Usage: node test-connection.js
 */

const { testConnection, pool } = require('./config/database');

async function main() {
    console.log('🔄 Testing PostgreSQL database connection...');
    console.log('----------------------------------------');
    console.log(`Host: ${process.env.DB_HOST || '43.208.7.234'}`);
    console.log(`Port: ${process.env.DB_PORT || '5432'}`);
    console.log(`Database: ${process.env.DB_NAME || 'mydb'}`);
    console.log(`User: ${process.env.DB_USER || 'myuser'}`);
    console.log('----------------------------------------');

    const isConnected = await testConnection();

    if (isConnected) {
        console.log('\n🎉 Connection test PASSED!');
        console.log('You can now proceed to build your backend API.');
    } else {
        console.log('\n💔 Connection test FAILED!');
        console.log('Please check your database credentials and network connection.');
    }

    // Close the pool after testing
    await pool.end();
    process.exit(isConnected ? 0 : 1);
}

main();
