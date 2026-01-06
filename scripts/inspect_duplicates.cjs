
const { pool } = require('../backend/config/database');

async function inspect() {
    try {
        const res = await pool.query("SELECT id, name, price, description, tag FROM products WHERE name LIKE '%ยาดมสมุนไพร ตราผลไพร%'");
        console.log('Found products:');
        res.rows.forEach(r => {
            console.log(`ID: ${r.id}, Name: ${r.name}, Price: ${r.price}, Desc: ${r.description ? r.description.substring(0, 20) + '...' : 'N/A'}`);
        });
    } catch (e) {
        console.error(e);
    } finally {
        pool.end();
    }
}

inspect();
