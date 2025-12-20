/**
 * Initialize Products Table and Insert Data
 * Run: node scripts/init-products.js
 */

const { pool } = require('../config/database');

// Products data from the website
const products = [
    { id: 1, name: 'แคปซูลขมิ้นชัน', category: 'ยาแคปซูล', description: 'บำรุงระบบทางเดินอาหาร ช่วยย่อยอาหาร', icon: '/images/products/turmeric-capsule.png', tag: 'ขายดี', price: 150 },
    { id: 2, name: 'แคปซูลยารางจืด', category: 'ยาแคปซูล', description: 'บรรเทาอาการปวดเมื่อย คลายกล้ามเนื้อ', icon: '/images/products/turmeric-capsule1.png', tag: '', price: 150 },
    { id: 3, name: 'แคปซูลยาตรีผลา', category: 'ยาแคปซูล', description: 'บำรุงระบบทางเดินอาหาร ช่วยย่อยอาหาร', icon: '/images/products/turmeric-capsule2.png', tag: 'ใหม่', price: 150 },
    { id: 4, name: 'แคปซูลฟ้าทะลายโจร', category: 'ยาแคปซูล', description: 'บำรุงระบบทางเดินอาหาร ช่วยย่อยอาหาร', icon: '/images/products/turmeric-capsule3.png', tag: '', price: 150 },
    { id: 26, name: 'ยาหม่อง ตราผลไพร', category: 'ยาหม่อง', description: 'บรรเทาอาการปวดเมื่อย แมลงสัตว์กัดต่อย', icon: '/images/products/ponpri-balm.png', tag: 'ใหม่', price: 80 },
    { id: 27, name: 'ยาน้ำมันนวดสมุนไพร สูตรร้อน ตราผลไพร', category: 'ยาน้ำมันนวด', description: 'สูตรร้อน บรรเทาอาการปวดเมื่อย คลายเส้น', icon: '/images/products/ponpri-massage-oil-hot.png', tag: 'ใหม่', price: 120 },
    { id: 29, name: 'ยาดมสมุนไพร ตราผลไพร (ขวดเล็ก)', category: 'ยาดม', description: 'บรรเทาอาการวิงเวียนศีรษะ หน้ามืด คัดจมูก', icon: '/images/products/ponpri-inhaler-green.png', tag: 'ขายดี', price: 35 },
    { id: 30, name: 'ยาดมสมุนไพร ชุดของขวัญพรีเมียม', category: 'ยาดม', description: 'ยาดมสมุนไพรในบรรจุภัณฑ์หรู เหมาะสำหรับเป็นของขวัญ', icon: '/images/products/ponpri-inhaler-set.png', tag: 'แนะนำ', price: 199 },
    { id: 31, name: 'สวรรค์ชั้น 7 (Beyond Heaven)', category: 'ยาดองสมุนไพร', description: 'สมุนไพรดองสูตรพิเศษ บำรุงกำลัง', icon: '/images/products/yadong-beyond-heaven.png', tag: 'ใหม่', price: 250 },
    { id: 32, name: 'นารีรำพึง (Na Ree Lam Pueng)', category: 'ยาดองสมุนไพร', description: 'สมุนไพรดองสูตรโบราณ สำหรับสตรี', icon: '/images/products/yadong-naree-lampueng.png', tag: 'ใหม่', price: 250 },
    { id: 33, name: 'ราชสีห์คำราม (Lion\'s Roar)', category: 'ยาดองสมุนไพร', description: 'สมุนไพรดองสูตรเข้มข้น เพิ่มพลัง', icon: '/images/products/yadong-ratchasi.png', tag: 'ใหม่', price: 250 },
    { id: 34, name: 'กำลังช้างสาร (Elephant Power)', category: 'ยาดองสมุนไพร', description: 'สมุนไพรดองบำรุงร่างกาย แข็งแรงดั่งช้างสาร', icon: '/images/products/yadong-kamlang-changsan.png', tag: 'ใหม่', price: 250 },
    { id: 35, name: 'สาวน้อยตกเตียง (Never Tiren)', category: 'ยาดองสมุนไพร', description: 'สมุนไพรดองสูตรเด็ด บำรุงธาตุ', icon: '/images/products/yadong-sawnoi.png', tag: 'ใหม่', price: 250 },
    { id: 36, name: 'น้ำผึ้งรากกัญชา-โสมขาว', category: 'น้ำผึ้ง', description: 'น้ำผึ้งแท้ผสมรากกัญชาและโสมขาว บำรุงสุขภาพ', icon: '/images/products/honey-cannabis-ginseng.png', tag: 'ใหม่', price: 350 },
    { id: 37, name: 'ยาน้ำมัน ตราผลไพร (หัวลูกกลิ้ง)', category: 'ยาน้ำมันนวด', description: 'ยาน้ำมันสมุนไพรแบบพกพา หัวลูกกลิ้ง ใช้งานง่าย', icon: '/images/products/ponpri-oil-rollon.png', tag: 'ใหม่', price: 59 },
    { id: 38, name: 'ยาน้ำมันสมุนไพร ตราผลไพร (สเปรย์)', category: 'ยาน้ำมันนวด', description: 'ยาน้ำมันสมุนไพรแบบสเปรย์ ฉีดพ่นบรรเทาปวด', icon: '/images/products/ponpri-oil-spray.png', tag: 'ใหม่', price: 129 },
    { id: 39, name: 'เทียนหอมไขถั่วเหลือง กลิ่น Rose Garden', category: 'เทียนหอม', description: 'เทียนหอมไขถั่วเหลืองธรรมชาติ 100% กลิ่นกุหลาบ', icon: '/images/products/candle-rose-garden.png', tag: 'ใหม่', price: 290 },
    { id: 40, name: 'เทียนหอมไขถั่วเหลือง กลิ่น Thai Aromatic', category: 'เทียนหอม', description: 'เทียนหอมไขถั่วเหลืองธรรมชาติ 100% กลิ่นสมุนไพรไทย', icon: '/images/products/candle-thai-aromatic.png', tag: 'ใหม่', price: 290 },
    { id: 41, name: 'เทียนหอมไขถั่วเหลือง กลิ่น Morning Glory', category: 'เทียนหอม', description: 'เทียนหอมไขถั่วเหลืองธรรมชาติ 100% กลิ่นดอกผักบุ้ง', icon: '/images/products/candle-morning-glory.png', tag: 'ใหม่', price: 290 },
    { id: 42, name: 'ยอดชาขาว ตรา เดอ ที (Assam White Tea)', category: 'ชาสมุนไพร', description: 'ยอดชาขาวโบราณ หอมละมุน ชุ่มคอ', icon: '/images/products/tea-assam-white.png', tag: 'ใหม่', price: 180 },
    { id: 43, name: 'ชากัญชาโสมขาว (Cannabis White Ginseng Tea)', category: 'ชาสมุนไพร', description: 'ชาสมุนไพรผสมกัญชาและโสมขาว เพื่อสุขภาพ', icon: '/images/products/tea-cannabis-ginseng.png', tag: 'ใหม่', price: 220 },
    { id: 44, name: 'ชุดชาสมุนไพรพรีเมียม (Premium Tea Set)', category: 'ชาสมุนไพร', description: 'รวมชาสมุนไพรชั้นดีในกล่องหรู เหมาะเป็นของขวัญ', icon: '/images/products/tea-premium-set.png', tag: 'แนะนำ', price: 590 },
    { id: 45, name: 'ยาผสมเพชรสังฆาต ชนิดแคปซูล ตราผลไพร', category: 'ยาแคปซูล', description: 'บรรเทาอาการริดสีดวงทวาร', icon: '/images/products/ponpri-capsule-phet-sung-kart.png', tag: 'ใหม่', price: 150 },
    { id: 46, name: 'มะระขี้นก ชนิดแคปซูล ตราผลไพร', category: 'ยาแคปซูล', description: 'ช่วยลดระดับน้ำตาลในเลือด แก้ไข้', icon: '/images/products/ponpri-capsule-bitter-gourd.png', tag: 'ใหม่', price: 150 },
    { id: 47, name: 'ชุดก้านไม้หอมปรับอากาศ กลิ่น Thai Aromatic', category: 'ไม้หอม', description: 'ชุดก้านไม้หอมปรับอากาศ กลิ่นสมุนไพรไทย หอมสดชื่น', icon: '/images/products/ponpri-diffuser-thai-aromatic.png', tag: 'ใหม่', price: 350 },
    { id: 48, name: 'ชุดก้านไม้หอมปรับอากาศ กลิ่น Rose Garden', category: 'ไม้หอม', description: 'ชุดก้านไม้หอมปรับอากาศ กลิ่นกุหลาบ หอมละมุน', icon: '/images/products/ponpri-diffuser-rose-box.png', tag: 'ใหม่', price: 350 },
    { id: 49, name: 'ชุดก้านไม้หอมปรับอากาศ กลิ่น Morning Glory', category: 'ไม้หอม', description: 'ชุดก้านไม้หอมปรับอากาศ กลิ่นดอกผักบุ้ง หอมผ่อนคลาย', icon: '/images/products/ponpri-diffuser-morning-glory.png', tag: 'ใหม่', price: 350 },
    { id: 50, name: 'ยาน้ำมันกระดูกไก่ดำ ตราผลไพร (สเปรย์)', category: 'ยาน้ำมันนวด', description: 'บรรเทาอาการปวดเมื่อย เคล็ดขัดยอก', icon: '/images/products/ponpri-spray-black-chicken.png', tag: 'ใหม่', price: 129 },
    { id: 51, name: 'มะขามแขก ชนิดแคปซูล ตราผลไพร', category: 'ยาแคปซูล', description: 'บรรเทาอาการท้องผูก เป็นยาระบายอ่อนๆ', icon: '/images/products/ponpri-capsule-senna.png', tag: 'ใหม่', price: 150 },
    { id: 52, name: 'ลูกประคบสมุนไพร ตราผลไพร', category: 'ลูกประคบสมุนไพร', description: 'ลูกประคบสมุนไพรไทย ช่วยคลายกล้ามเนื้อ', icon: '/images/products/ponpri-compress-ball.png', tag: 'แนะนำ', price: 90 },
    { id: 53, name: 'ยาดมสมุนไพร ตราผลไพร (ขวดใหญ่)', category: 'ยาดม', description: 'ยาดมสมุนไพรขวดใหญ่ จุใจ หอมนาน', icon: '/images/products/ponpri-inhaler-large.png', tag: 'ใหม่', price: 59 },
    { id: 54, name: 'ยาขิง ชนิดแคปซูล ตราผลไพร', category: 'ยาแคปซูล', description: 'บรรเทาอาการท้องอืด ท้องเฟ้อ ขับลม', icon: '/images/products/ponpri-capsule-ginger.png', tag: 'ใหม่', price: 150 }
];

async function initProducts() {
    const client = await pool.connect();

    try {
        console.log('🔄 Starting products migration...\n');

        // Begin transaction
        await client.query('BEGIN');

        // Drop existing table if exists
        console.log('📋 Dropping existing products table if exists...');
        await client.query('DROP TABLE IF EXISTS products CASCADE');

        // Create products table
        console.log('📋 Creating products table...');
        await client.query(`
            CREATE TABLE products (
                id SERIAL PRIMARY KEY,
                product_code VARCHAR(20) UNIQUE NOT NULL,
                name VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                description TEXT,
                icon VARCHAR(255),
                tag VARCHAR(50),
                price DECIMAL(10,2) NOT NULL,
                stock INTEGER DEFAULT 0,
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Products table created!\n');

        // Insert products
        console.log('📦 Inserting products...');
        let insertedCount = 0;

        for (const product of products) {
            // Generate product code like "PRD001", "PRD002", etc.
            const productCode = `PRD${String(product.id).padStart(3, '0')}`;

            await client.query(`
                INSERT INTO products (product_code, name, category, description, icon, tag, price, stock)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            `, [productCode, product.name, product.category, product.description, product.icon, product.tag || null, product.price, 100]);

            insertedCount++;
            console.log(`   ✓ ${productCode}: ${product.name}`);
        }

        // Commit transaction
        await client.query('COMMIT');

        console.log(`\n🎉 Successfully inserted ${insertedCount} products!`);

        // Verify data
        console.log('\n📊 Verification:');
        const result = await client.query('SELECT COUNT(*) as total, SUM(price) as total_value FROM products');
        console.log(`   Total products: ${result.rows[0].total}`);
        console.log(`   Total inventory value: ฿${parseFloat(result.rows[0].total_value).toLocaleString()}`);

        // Show categories summary
        const categories = await client.query(`
            SELECT category, COUNT(*) as count 
            FROM products 
            GROUP BY category 
            ORDER BY count DESC
        `);
        console.log('\n📁 Categories:');
        categories.rows.forEach(cat => {
            console.log(`   - ${cat.category}: ${cat.count} items`);
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Error:', error.message);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

initProducts();
