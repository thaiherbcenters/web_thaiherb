/**
 * Registration & FDA Info Page
 * หน้าข้อมูลขั้นตอนการจด อย. และการสร้างแบรนด์
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import useTranslation from '../hooks/useTranslation';
import './Registration.css';

function Registration() {
    const { t, language } = useTranslation();
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // ขั้นตอนการสั่งผลิตสินค้า (OEM) และการสร้างแบรนด์
    const oemSteps = [
        {
            title: language === 'th' ? 'ลูกค้าแจ้ง Concept ของสินค้า' : language === 'en' ? 'Customer Provides Product Concept' : '客户提供产品概念',
            desc: language === 'th'
                ? 'ลูกค้าต้องแจ้ง Concept ของลูกค้า เช่น ต้องการผลิตสินค้าประเภทอะไร? ต้องการสารสกัดตัวไหน? กลิ่น/สี ที่ต้องการลงไปในผลิตภัณฑ์ของลูกค้า'
                : language === 'en'
                ? 'Customer must provide their product concept: What type of product? Which extracts? Desired scent/color for the product.'
                : '客户必须提供产品概念：什么类型的产品？哪种提取物？产品所需的香味/颜色。',
            tags: language === 'th' ? ['ประเภทสินค้า', 'สารสกัด', 'กลิ่น/สี'] : language === 'en' ? ['Product Type', 'Extracts', 'Scent/Color'] : ['产品类型', '提取物', '香味/颜色']
        },
        {
            title: language === 'th' ? 'ลูกค้าต้องมี LOGO และชื่อแบรนด์' : language === 'en' ? 'Customer Must Have LOGO & Brand Name' : '客户必须拥有LOGO和品牌名称',
            desc: language === 'th'
                ? 'ลูกค้าต้องมี LOGO และชื่อแบรนด์ เพื่อยื่นจดแจ้งเครื่องหมายการค้ากับ กรมทรัพย์สินทางปัญญา (DIP) เพื่อใช้ในการยื่นขอขึ้นทะเบียนตำรับ อย.'
                : language === 'en'
                ? 'Customer must have a LOGO and brand name to register the trademark with the Department of Intellectual Property (DIP), required for FDA registration.'
                : '客户必须拥有LOGO和品牌名称，以便在知识产权部门（DIP）注册商标，这是FDA注册所需的。',
            tags: language === 'th' ? ['LOGO', 'ชื่อแบรนด์', 'กรมทรัพย์สินทางปัญญา'] : language === 'en' ? ['LOGO', 'Brand Name', 'DIP'] : ['LOGO', '品牌名称', 'DIP']
        },
        {
            title: language === 'th' ? 'ตรวจสอบชื่อแบรนด์สำหรับจดเครื่องหมายการค้า' : language === 'en' ? 'Verify Brand Name for Trademark Registration' : '验证品牌名称以进行商标注册',
            desc: language === 'th'
                ? 'ชื่อแบรนด์ต้องไม่ซ้ำกับแบรนด์อื่นๆ และต้องไม่เป็นชื่อที่ชี้นำบ่งบอกเกี่ยวกับตัวผลิตภัณฑ์ (สินค้า) ในรูปสมุนไพร ต้องมีทั้งชื่อพร้อม LOGO เพื่อตรวจเช็คกับกรมทรัพย์สินทางปัญญา (DIP) หากลูกค้ามีเพียงชื่ออย่างเดียว จะไม่สามารถตรวจสอบได้เพราะข้อมูลไม่เพียงพอ'
                : language === 'en'
                ? 'Brand name must not duplicate other brands and must not describe the herbal product directly. Both name and LOGO are required for DIP verification. Name alone is insufficient for checking.'
                : '品牌名称不得与其他品牌重复，且不得直接描述草药产品。DIP验证需要名称和LOGO。仅有名称不足以进行检查。',
            tags: language === 'th' ? ['ชื่อไม่ซ้ำ', 'ไม่ชี้นำสินค้า', 'ต้องมี LOGO'] : language === 'en' ? ['Unique Name', 'No Product Description', 'LOGO Required'] : ['唯一名称', '不描述产品', '需要LOGO']
        },
        {
            title: language === 'th' ? 'ยื่นจดเครื่องหมายการค้า' : language === 'en' ? 'Submit Trademark Registration' : '提交商标注册',
            desc: language === 'th'
                ? 'เมื่อยื่นจดเครื่องหมายการค้า ชื่อแบรนด์ ในผลิตภัณฑ์ (สินค้า) ผ่านเป็นที่เรียบร้อย ระยะเวลารอคอยรับหนังสือสำคัญแสดงการจดทะเบียนเครื่องหมายการค้า (อนุมัติ) เป็นเวลา 6 เดือน'
                : language === 'en'
                ? 'Once trademark registration is submitted and the brand name passes, you will wait approximately 6 months to receive the official trademark registration certificate (approval).'
                : '商标注册提交后品牌名称通过审核，等待约6个月获得正式商标注册证书（批准）。',
            tags: language === 'th' ? ['รออนุมัติ 6 เดือน', 'หนังสือสำคัญ'] : language === 'en' ? ['6 Months Wait', 'Official Certificate'] : ['等待6个月', '正式证书']
        },
        {
            title: language === 'th' ? 'สรุปรายการผลิตภัณฑ์และสูตร' : language === 'en' ? 'Finalize Product List & Formulas' : '确定产品清单和配方',
            desc: language === 'th'
                ? 'สรุปรายการผลิตภัณฑ์ + สูตรที่ลูกค้าต้องการโดยละเอียด เพื่อเข้าสู่ขั้นตอนการขึ้นทะเบียนตำรับ อย. ต่อไป'
                : language === 'en'
                ? 'Finalize the product list and detailed formulas as required by the customer to proceed with the FDA registration process.'
                : '确定客户要求的产品清单和详细配方，以进入FDA注册流程。',
            tags: language === 'th' ? ['รายการผลิตภัณฑ์', 'สูตร', 'เข้าสู่ขั้นตอน อย.'] : language === 'en' ? ['Product List', 'Formulas', 'Enter FDA Process'] : ['产品清单', '配方', '进入FDA流程']
        },
    ];

    // กระบวนการขั้นตอนการขึ้นทะเบียน อย.
    const fdaProcessSteps = [
        {
            title: language === 'th' ? 'ขอส่งตัวอย่างกับทาง อย.' : language === 'en' ? 'Request Sample Submission to FDA' : '向FDA申请提交样品',
            desc: language === 'th'
                ? 'ทำเอกสารขอส่งตัวอย่างกับทาง อย. เพื่อส่งสมุนไพรให้ห้องปฏิบัติการ (LAB) ตรวจหาสารปนเปื้อนต่างๆ ตามมาตรฐานที่ อย. กำหนด'
                : language === 'en'
                ? 'Prepare documents to request sample submission to the FDA for sending herbs to the laboratory (LAB) for contamination testing per FDA standards.'
                : '准备文件，向FDA申请提交样品，将草药送至实验室（LAB）按FDA标准进行污染物检测。',
            timeline: language === 'th' ? '⏱️ ระยะเวลาอนุมัติเอกสาร: 2-3 วัน' : language === 'en' ? '⏱️ Document approval: 2-3 days' : '⏱️ 文件批准：2-3天',
            tags: language === 'th' ? ['ขอส่งตัวอย่าง', '2-3 วัน'] : language === 'en' ? ['Sample Request', '2-3 Days'] : ['样品申请', '2-3天']
        },
        {
            title: language === 'th' ? 'ส่งตัวอย่างสมุนไพรตรวจ LAB' : language === 'en' ? 'Submit Herbal Samples to LAB' : '提交草药样品到实验室',
            desc: language === 'th'
                ? 'ส่งตัวอย่างสมุนไพรให้ห้องปฏิบัติการ (LAB) ตรวจหาสารปนเปื้อน รอคอยผลการตรวจวิเคราะห์'
                : language === 'en'
                ? 'Submit herbal samples to the laboratory (LAB) for contamination testing and wait for the analysis results.'
                : '将草药样品提交到实验室（LAB）进行污染物检测，等待分析结果。',
            timeline: language === 'th' ? '⏱️ ระยะเวลารอคอยผล: ประมาณ 15-30 วัน' : language === 'en' ? '⏱️ Waiting for results: approx. 15-30 days' : '⏱️ 等待结果：约15-30天',
            tags: language === 'th' ? ['ตรวจ LAB', '15-30 วัน'] : language === 'en' ? ['LAB Test', '15-30 Days'] : ['实验室检测', '15-30天']
        },
        {
            title: language === 'th' ? 'ยื่น ทบ.๑ ขึ้นทะเบียนตำรับยา ขอเลข อย.' : language === 'en' ? 'Submit Form TB.1 for FDA Number' : '提交TB.1表格申请FDA编号',
            desc: language === 'th'
                ? 'เมื่อได้รับผล LAB เรียบร้อย ทำการยื่นแบบ ทบ.๑ ขึ้นทะเบียนตำรับยา ขอเลข อย. รอคอยผลอนุมัติ'
                : language === 'en'
                ? 'Once LAB results are received, submit Form TB.1 for drug formula registration to request the FDA number and wait for approval.'
                : '收到实验室结果后，提交TB.1表格进行药品配方注册，申请FDA编号并等待批准。',
            timeline: language === 'th' ? '⏱️ ระยะเวลารออนุมัติ: 6 เดือน (เร็วสุด 2-3 เดือน)' : language === 'en' ? '⏱️ Approval waiting: 6 months (fastest 2-3 months)' : '⏱️ 等待批准：6个月（最快2-3个月）',
            tags: language === 'th' ? ['ทบ.๑', 'เลข อย.', '2-6 เดือน'] : language === 'en' ? ['Form TB.1', 'FDA Number', '2-6 Months'] : ['TB.1表格', 'FDA编号', '2-6个月']
        },
        {
            title: language === 'th' ? 'ได้รับเลข อย. (G) เรียบร้อย' : language === 'en' ? 'Receive FDA Number (G)' : '获得FDA编号（G）',
            desc: language === 'th'
                ? 'เมื่อขึ้นทะเบียนตำรับผ่าน จะได้รับเลข อย. (G) เรียบร้อยแล้ว สามารถนำไปแสดงบนฉลากสินค้าได้ทันที'
                : language === 'en'
                ? 'Once the formula registration is approved, you will receive the FDA number (G) which can be displayed on your product label immediately.'
                : '配方注册批准后，您将获得FDA编号（G），可以立即显示在产品标签上。',
            timeline: '',
            tags: language === 'th' ? ['เลข อย.(G)', 'ฉลากสินค้า'] : language === 'en' ? ['FDA Number (G)', 'Product Label'] : ['FDA编号（G）', '产品标签']
        },
        {
            title: language === 'th' ? 'ผลิตสินค้าตามใบเสนอราคา' : language === 'en' ? 'Produce According to Quotation' : '按报价单生产',
            desc: language === 'th'
                ? 'ผลิตสินค้าตามใบเสนอราคาที่แจ้งลูกค้า พร้อมส่งมอบสินค้าให้ลูกค้านำไปจำหน่ายได้ทันที'
                : language === 'en'
                ? 'Produce goods according to the quotation provided to the customer and deliver products ready for sale.'
                : '按照提供给客户的报价单生产商品，并交付准备销售的产品。',
            timeline: '',
            tags: language === 'th' ? ['ผลิตสินค้า', 'ส่งมอบ', 'พร้อมจำหน่าย'] : language === 'en' ? ['Production', 'Delivery', 'Ready to Sell'] : ['生产', '交货', '准备销售']
        },
    ];

    // เอกสารที่ต้องเตรียม - นิติบุคคล
    const corporateDocs = [
        {
            icon: '🏢',
            title: language === 'th' ? 'หนังสือรับรองบริษัท' : language === 'en' ? 'Company Certificate' : '公司证书',
            desc: language === 'th' ? 'อายุไม่เกิน 6 เดือน' : language === 'en' ? 'Not older than 6 months' : '不超过6个月'
        },
        {
            icon: '💳',
            title: language === 'th' ? 'สำเนาบัตรประชาชนกรรมการ' : language === 'en' ? 'Director\'s ID Card Copy' : '董事身份证复印件',
            desc: language === 'th' ? 'ผู้ยื่นคำขอ / ผู้ที่มีอำนาจลงนาม (1 หรือ 2 ท่าน ตามระบุ)' : language === 'en' ? 'Applicant / Authorized signatory (1 or 2 persons as specified)' : '申请人/授权签字人（按规定1或2人）'
        },
        {
            icon: '🏠',
            title: language === 'th' ? 'สำเนาทะเบียนกรรมการ' : language === 'en' ? 'Director\'s House Registration' : '董事户籍登记',
            desc: language === 'th' ? 'ของผู้ยื่นคำขอ' : language === 'en' ? 'Of the applicant' : '申请人的'
        },
        {
            icon: '🩺',
            title: language === 'th' ? 'ใบรับรองแพทย์' : language === 'en' ? 'Medical Certificate' : '医疗证明',
            desc: language === 'th' ? 'อายุไม่เกิน 1 ปี' : language === 'en' ? 'Not older than 1 year' : '不超过1年'
        },
    ];

    // เอกสารที่ต้องเตรียม - บุคคลธรรมดา
    const individualDocs = [
        {
            icon: '💳',
            title: language === 'th' ? 'สำเนาบัตรประชาชน' : language === 'en' ? 'ID Card Copy' : '身份证复印件',
            desc: language === 'th' ? 'ของผู้ยื่นคำขอ' : language === 'en' ? 'Of the applicant' : '申请人的'
        },
        {
            icon: '🏠',
            title: language === 'th' ? 'สำเนาทะเบียนบ้าน' : language === 'en' ? 'House Registration Copy' : '户籍登记复印件',
            desc: language === 'th' ? 'ของผู้ยื่นคำขอ' : language === 'en' ? 'Of the applicant' : '申请人的'
        },
        {
            icon: '🩺',
            title: language === 'th' ? 'ใบรับรองแพทย์' : language === 'en' ? 'Medical Certificate' : '医疗证明',
            desc: language === 'th' ? 'อายุไม่เกิน 1 ปี' : language === 'en' ? 'Not older than 1 year' : '不超过1年'
        },
    ];

    // ประเภทใบอนุญาต/การรับรอง
    const certTypes = [
        {
            icon: '🏥',
            title: language === 'th' ? 'จดทะเบียน อย.' : language === 'en' ? 'FDA Registration' : 'FDA注册',
            subtitle: language === 'th' ? 'สำนักงานคณะกรรมการอาหารและยา' : language === 'en' ? 'Food and Drug Administration' : '食品药品管理局',
            desc: language === 'th' ? 'การจดทะเบียนผลิตภัณฑ์สุขภาพ อาหาร เครื่องสำอาง ยาสมุนไพร และอาหารเสริม' : language === 'en' ? 'Registration for health products, food, cosmetics, herbal medicines, and supplements.' : '健康产品、食品、化妆品、草药和补充剂的注册。',
            items: language === 'th' ? ['อาหารและเครื่องดื่ม', 'เครื่องสำอาง', 'ยาแผนโบราณ/สมุนไพร', 'อาหารเสริม (Supplement)'] : language === 'en' ? ['Food & Beverages', 'Cosmetics', 'Herbal Medicine', 'Supplements'] : ['食品和饮料', '化妆品', '草药', '补充剂'],
            color: 'card-green'
        },
        {
            icon: '🏭',
            title: 'GMP',
            subtitle: language === 'th' ? 'หลักเกณฑ์วิธีการผลิตที่ดี' : language === 'en' ? 'Good Manufacturing Practice' : '良好生产规范',
            desc: language === 'th' ? 'มาตรฐานสถานที่ผลิตที่ต้องมีก่อนยื่นขอ อย. เพื่อรับรองว่าผลิตภัณฑ์ผลิตอย่างถูกสุขลักษณะ' : language === 'en' ? 'Manufacturing facility standard required before FDA application to ensure hygienic production.' : '在FDA申请之前需要的生产设施标准，以确保卫生生产。',
            items: language === 'th' ? ['สถานที่ผลิตได้มาตรฐาน', 'ระบบควบคุมคุณภาพ', 'การจัดการสุขอนามัย', 'บุคลากรผ่านการฝึกอบรม'] : language === 'en' ? ['Standard facility', 'Quality control system', 'Hygiene management', 'Trained personnel'] : ['标准设施', '质量控制系统', '卫生管理', '经过培训的人员'],
            color: 'card-blue'
        },
        {
            icon: '☪️',
            title: language === 'th' ? 'ฮาลาล (Halal)' : 'Halal',
            subtitle: language === 'th' ? 'การรับรองฮาลาล' : language === 'en' ? 'Halal Certification' : '清真认证',
            desc: language === 'th' ? 'การรับรองว่าผลิตภัณฑ์ถูกต้องตามหลักศาสนาอิสลาม เปิดตลาดกลุ่มลูกค้ามุสลิมทั่วโลก' : language === 'en' ? 'Certification that products comply with Islamic law, opening markets to Muslim consumers worldwide.' : '产品符合伊斯兰法律的认证，向全球穆斯林消费者开放市场。',
            items: language === 'th' ? ['วัตถุดิบฮาลาล', 'กระบวนการผลิตฮาลาล', 'เปิดตลาดมุสลิม', 'เพิ่มโอกาสส่งออก'] : language === 'en' ? ['Halal raw materials', 'Halal production process', 'Access Muslim market', 'Export opportunities'] : ['清真原料', '清真生产过程', '进入穆斯林市场', '出口机会'],
            color: 'card-amber'
        },
        {
            icon: '🧪',
            title: language === 'th' ? 'ตรวจวิเคราะห์ LAB' : language === 'en' ? 'Lab Analysis' : '实验室分析',
            subtitle: language === 'th' ? 'ผลวิเคราะห์ทางห้องปฏิบัติการ' : language === 'en' ? 'Laboratory Test Results' : '实验室测试结果',
            desc: language === 'th' ? 'ส่งตัวอย่างผลิตภัณฑ์ตรวจวิเคราะห์ทางห้องปฏิบัติการที่ได้รับการรับรองเพื่อประกอบการยื่น อย.' : language === 'en' ? 'Sending product samples to accredited laboratories for analysis, required for FDA submission.' : '将产品样品送到认可的实验室进行分析，FDA提交所需。',
            items: language === 'th' ? ['ตรวจสารปนเปื้อน', 'ตรวจโลหะหนัก', 'ตรวจจุลินทรีย์', 'ตรวจสารสำคัญ'] : language === 'en' ? ['Contamination test', 'Heavy metals test', 'Microbiology test', 'Active ingredient test'] : ['污染物检测', '重金属检测', '微生物检测', '有效成分检测'],
            color: 'card-purple'
        },
        {
            icon: '🏷️',
            title: language === 'th' ? 'ออกแบบฉลาก' : language === 'en' ? 'Label Design' : '标签设计',
            subtitle: language === 'th' ? 'ฉลากตามข้อกำหนด อย.' : language === 'en' ? 'FDA-Compliant Labels' : '符合FDA的标签',
            desc: language === 'th' ? 'ออกแบบฉลากผลิตภัณฑ์ให้ถูกต้องตามกฎหมายและข้อกำหนดของ อย.' : language === 'en' ? 'Designing product labels that comply with FDA regulations, essential for registration.' : '设计符合FDA法规的产品标签，这对注册至关重要。',
            items: language === 'th' ? ['ชื่อผลิตภัณฑ์', 'ส่วนประกอบ/วัตถุดิบ', 'วิธีใช้ / คำเตือน', 'วันผลิต-หมดอายุ'] : language === 'en' ? ['Product name', 'Ingredients', 'Directions / Warnings', 'Manufacturing-Expiry dates'] : ['产品名称', '成分', '使用方法/警告', '生产-到期日期'],
            color: 'card-red'
        },
        {
            icon: '📋',
            title: language === 'th' ? 'จดเครื่องหมายการค้า' : language === 'en' ? 'Trademark Registration' : '商标注册',
            subtitle: language === 'th' ? 'กรมทรัพย์สินทางปัญญา (DIP)' : language === 'en' ? 'Dept. of Intellectual Property (DIP)' : '知识产权部门（DIP）',
            desc: language === 'th' ? 'จดทะเบียนเครื่องหมายการค้ากับกรมทรัพย์สินทางปัญญา เพื่อปกป้องแบรนด์สินค้าของคุณ' : language === 'en' ? 'Register your trademark with the Department of Intellectual Property to protect your brand.' : '在知识产权部门注册您的商标以保护您的品牌。',
            items: language === 'th' ? ['คุ้มครองชื่อแบรนด์', 'คุ้มครองโลโก้', 'ป้องกันการลอกเลียน', 'ระยะเวลาอนุมัติ 6 เดือน'] : language === 'en' ? ['Brand name protection', 'Logo protection', 'Anti-counterfeit', 'Approval: 6 months'] : ['品牌名称保护', '标志保护', '防伪', '批准：6个月'],
            color: 'card-teal'
        }
    ];

    // คำถามที่พบบ่อย
    const faqs = [
        {
            q: language === 'th' ? 'การจด อย. ใช้เวลากี่วัน?' : language === 'en' ? 'How long does FDA registration take?' : 'FDA注册需要多长时间？',
            a: language === 'th' ? 'ระยะเวลาขึ้นอยู่กับประเภทผลิตภัณฑ์ โดยขั้นตอนการขออนุมัติเอกสารส่งตัวอย่างใช้เวลา 2-3 วัน, รอผล LAB ประมาณ 15-30 วัน, และรอเลข อย. หลังยื่น ทบ.๑ ประมาณ 6 เดือน (เร็วสุด 2-3 เดือน) รวมทั้งหมดประมาณ 3-8 เดือน' : language === 'en' ? 'Duration depends on product type: Document approval takes 2-3 days, LAB results take 15-30 days, and FDA number approval takes about 6 months (fastest 2-3 months) after TB.1 submission. Total approximately 3-8 months.' : '时间取决于产品类型：文件批准需要2-3天，实验室结果需要15-30天，提交TB.1后FDA编号批准约需6个月（最快2-3个月）。总计约3-8个月。'
        },
        {
            q: language === 'th' ? 'ต้องเตรียมเอกสารอะไรบ้าง?' : language === 'en' ? 'What documents are required?' : '需要什么文件？',
            a: language === 'th' ? 'กรณีนิติบุคคล: หนังสือรับรองบริษัท (ไม่เกิน 6 เดือน), สำเนาบัตรประชาชนกรรมการ, สำเนาทะเบียนกรรมการ, ใบรับรองแพทย์ (ไม่เกิน 1 ปี) | กรณีบุคคลธรรมดา: สำเนาบัตรประชาชน, สำเนาทะเบียนบ้าน, ใบรับรองแพทย์ (ไม่เกิน 1 ปี) เอกสารอื่นๆ ทางผู้ผลิตจะเป็นผู้ดำเนินการจัดทำและจัดส่งให้ลูกค้าเซ็นชื่อ' : language === 'en' ? 'For juristic persons: Company certificate (not older than 6 months), Director\'s ID card, Director\'s house registration, Medical certificate (not older than 1 year) | For individuals: ID card, House registration, Medical certificate (not older than 1 year). Other documents will be prepared by the manufacturer.' : '法人：公司证书（不超过6个月）、董事身份证、董事户籍登记、医疗证明（不超过1年）| 个人：身份证、户籍登记、医疗证明（不超过1年）。其他文件由制造商准备。'
        },
        {
            q: language === 'th' ? 'ชื่อแบรนด์ต้องมีเงื่อนไขอะไรบ้าง?' : language === 'en' ? 'What are the brand name requirements?' : '品牌名称有什么要求？',
            a: language === 'th' ? 'ชื่อแบรนด์ต้องไม่ซ้ำกับแบรนด์อื่นๆ, ต้องไม่เป็นชื่อที่ชี้นำหรือบ่งบอกเกี่ยวกับตัวผลิตภัณฑ์ในรูปสมุนไพร, ต้องมีทั้งชื่อพร้อม LOGO เพื่อตรวจสอบกับกรมทรัพย์สินทางปัญญา (DIP) หากมีเพียงชื่ออย่างเดียวจะไม่สามารถตรวจสอบได้เพราะข้อมูลไม่เพียงพอ' : language === 'en' ? 'Brand name must not duplicate other brands, must not describe the herbal product directly, and both name and LOGO are required for DIP verification. Name alone is insufficient for checking.' : '品牌名称不得与其他品牌重复，不得直接描述草药产品，DIP验证需要名称和LOGO。仅有名称不足以进行检查。'
        },
        {
            q: language === 'th' ? 'ถ้าจ้าง Thai Herb Centers ผลิต จะช่วยจด อย. ให้ด้วยไหม?' : language === 'en' ? 'If I hire Thai Herb Centers for OEM, will you help with FDA registration?' : '如果我聘请Thai Herb Centers进行OEM，你们会帮忙FDA注册吗？',
            a: language === 'th' ? 'ได้ค่ะ/ครับ! Thai Herb Centers ให้บริการแบบ One Stop Service ครบวงจร ตั้งแต่คิดสูตร, ผลิตสินค้า, ออกแบบฉลาก, จนถึงการช่วยดำเนินการจด อย. ให้กับลูกค้า เอกสารอื่นๆ ที่ใช้ยื่นทางผู้ผลิตหรือตัวแทนจะเป็นผู้ดำเนินการจัดทำ และจัดส่งให้ลูกค้าเซ็นชื่อในกระบวนการต่อไป' : language === 'en' ? 'Yes! Thai Herb Centers provides a complete One Stop Service from formulation, manufacturing, label design, to FDA registration assistance. Other required documents will be prepared by the manufacturer and sent to the customer for signing.' : '是的！Thai Herb Centers提供从配方、制造、标签设计到FDA注册协助的一站式服务。其他所需文件将由制造商准备并发送给客户签署。'
        },
        {
            q: language === 'th' ? 'จดในนามนิติบุคคล หรือ บุคคลธรรมดา แตกต่างกันอย่างไร?' : language === 'en' ? 'What\'s the difference between corporate and individual registration?' : '公司注册和个人注册有什么区别？',
            a: language === 'th' ? 'นิติบุคคลต้องใช้หนังสือรับรองบริษัท (ไม่เกิน 6 เดือน), สำเนาบัตรประชาชนกรรมการ, สำเนาทะเบียนกรรมการ และใบรับรองแพทย์ ส่วนบุคคลธรรมดาใช้เพียงสำเนาบัตรประชาชน, สำเนาทะเบียนบ้าน และใบรับรองแพทย์ ทั้งสองแบบสามารถจดทะเบียน อย. ได้เหมือนกัน' : language === 'en' ? 'Corporate registration requires a company certificate (not older than 6 months), director\'s ID, director\'s house registration, and medical certificate. Individual registration requires only ID card, house registration, and medical certificate. Both can register for FDA.' : '公司注册需要公司证书（不超过6个月）、董事身份证、董事户籍登记和医疗证明。个人注册只需要身份证、户籍登记和医疗证明。两者都可以注册FDA。'
        },
    ];

    return (
        <div className="registration-page page">
            {/* Hero Section */}
            <section className="page-hero">
                <div className="container page-hero-content">
                    <span className="badge slide-text slide-0">
                        {language === 'th' ? '📋 คู่มือจดทะเบียน' : language === 'en' ? '📋 Registration Guide' : '📋 注册指南'}
                    </span>
                    <h1 className="animate-fadeInUp">
                        {language === 'th' ? 'ขั้นตอนการขึ้นทะเบียนตำรับ ' : language === 'en' ? 'FDA Registration ' : 'FDA注册'}
                        <span className="text-blue">
                            {language === 'th' ? 'อย.' : language === 'en' ? 'Process' : '流程'}
                        </span>
                    </h1>
                    <p className="animate-fadeInUp">
                        {language === 'th'
                            ? 'ข้อมูลครบถ้วนเกี่ยวกับขั้นตอนการสั่งผลิตสินค้า OEM การสร้างแบรนด์ และกระบวนการขึ้นทะเบียนตำรับ อย.'
                            : language === 'en'
                            ? 'Complete information about OEM production ordering, brand building, and FDA formula registration process.'
                            : '关于OEM生产订购、品牌建设和FDA配方注册流程的完整信息。'}
                    </p>
                </div>
            </section>

            {/* Intro: อย. คืออะไร */}
            <section className="reg-intro-section">
                <div className="container">
                    <div className="reg-intro-grid">
                        <div className="reg-intro-text">
                            <h2>
                                {language === 'th' ? 'เริ่มต้น: ' : language === 'en' ? 'Start: ' : '开始：'}
                                <span>{language === 'th' ? 'มีชื่อแบรนด์และเครื่องหมายการค้า โลโก้ เรียบร้อยแล้ว' : language === 'en' ? 'Brand Name, Trademark & Logo Ready' : '品牌名称、商标和标志已准备就绪'}</span>
                            </h2>
                            <p>
                                {language === 'th'
                                    ? 'ก่อนเริ่มกระบวนการทั้งหมด ลูกค้าต้องมีชื่อแบรนด์ เครื่องหมายการค้า และโลโก้เรียบร้อยแล้ว โดยสามารถจดในนามนิติบุคคลหรือบุคคลธรรมดาก็ได้ ซึ่งเอกสารที่ต้องเตรียมจะแตกต่างกันตามประเภท'
                                    : language === 'en'
                                    ? 'Before starting, the customer must have a brand name, trademark, and logo ready. Registration can be done under a corporate or individual name, with different document requirements for each type.'
                                    : '在开始之前，客户必须准备好品牌名称、商标和标志。注册可以以公司或个人名义进行，每种类型的文件要求不同。'}
                            </p>
                            <div className="reg-intro-highlights">
                                <div className="highlight-item">
                                    <span className="highlight-icon">✅</span>
                                    <span className="highlight-label">{language === 'th' ? 'ชื่อแบรนด์' : language === 'en' ? 'Brand Name' : '品牌名称'}</span>
                                </div>
                                <div className="highlight-item">
                                    <span className="highlight-icon">🎨</span>
                                    <span className="highlight-label">{language === 'th' ? 'โลโก้ (LOGO)' : 'LOGO'}</span>
                                </div>
                                <div className="highlight-item">
                                    <span className="highlight-icon">🏢</span>
                                    <span className="highlight-label">{language === 'th' ? 'นิติบุคคล' : language === 'en' ? 'Corporate' : '公司'}</span>
                                </div>
                                <div className="highlight-item">
                                    <span className="highlight-icon">👤</span>
                                    <span className="highlight-label">{language === 'th' ? 'บุคคลธรรมดา' : language === 'en' ? 'Individual' : '个人'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="reg-intro-image">
                            <img
                                src="https://res.cloudinary.com/dhz9osgmx/image/upload/v1748879907/herb_8_tfbipk.jpg"
                                alt={language === 'th' ? 'การจดทะเบียน อย.' : 'FDA Registration'}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* คู่มือจดเครื่องหมายการค้า (Trademark) */}
            <section className="reg-trademark-section">
                <div className="container">
                    <div className="reg-section-header">
                        <span className="header-icon">®️</span>
                        <h2>
                            {language === 'th' ? 'คู่มือเตรียมตัวจด' : language === 'en' ? 'Trademark Registration ' : '商标注册'}
                            <span>{language === 'th' ? 'เครื่องหมายการค้า' : language === 'en' ? 'Guide' : '指南'}</span>
                        </h2>
                        <p>
                            {language === 'th'
                                ? 'ก่อนจด อย. ต้องผ่านการจดเครื่องหมายการค้า (Trademark) เพื่อปกป้องแบรนด์ของคุณ นี่คือเอกสารและขั้นตอนที่ต้องรู้'
                                : language === 'en'
                                ? 'Before FDA registration, you must register a trademark to protect your brand. Here are the required documents and steps.'
                                : '在FDA注册之前，您必须注册商标以保护您的品牌。这是所需的文件和步骤。'}
                        </p>
                    </div>

                    <div className="trademark-grid">
                        {/* Box 1: เอกสาร */}
                        <div className="trademark-box">
                            <h3 className="tm-box-title">
                                📋 {language === 'th' ? 'เอกสารที่ต้องใช้' : language === 'en' ? 'Required Documents' : '所需文件'}
                            </h3>
                            <ul className="tm-doc-list">
                                <li>
                                    <span className="tm-icon">🖼️</span>
                                    <div>
                                        <strong>{language === 'th' ? 'ไฟล์รูปภาพโลโก้' : language === 'en' ? 'Logo Image File' : '标志图像文件'}</strong>
                                        <p>{language === 'th' ? 'ความละเอียดสูง พื้นหลังขาว' : language === 'en' ? 'High resolution, white background' : '高分辨率，白色背景'}</p>
                                    </div>
                                </li>
                                <li>
                                    <span className="tm-icon">🏢</span>
                                    <div>
                                        <strong>{language === 'th' ? 'เอกสารยืนยันตัวตน' : language === 'en' ? 'Identity Documents' : '身份证明文件'}</strong>
                                        <p>{language === 'th' ? 'หนังสือรับรองบริษัท (นิติบุคคล) หรือ บัตรประชาชน (บุคคลธรรมดา)' : language === 'en' ? 'Company Certificate or ID Card' : '公司证书或身份证'}</p>
                                    </div>
                                </li>
                                <li>
                                    <span className="tm-icon">📝</span>
                                    <div>
                                        <strong>{language === 'th' ? 'หนังสือมอบอำนาจ' : language === 'en' ? 'Power of Attorney' : '授权书'}</strong>
                                        <p>{language === 'th' ? 'กรณีให้ทางโรงงานหรือตัวแทนยื่นเรื่องแทน' : language === 'en' ? 'If using an agent or factory to submit' : '如果使用代理或工厂提交'}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Box 2: ขั้นตอน */}
                        <div className="trademark-box tm-steps-box">
                            <h3 className="tm-box-title">
                                🚀 {language === 'th' ? 'ขั้นตอนการดำเนินการเบื้องต้น' : language === 'en' ? 'Initial Steps' : '初步步骤'}
                            </h3>
                            <div className="tm-vertical-steps">
                                <div className="tm-v-step">
                                    <div className="tm-v-step-num">1</div>
                                    <div className="tm-v-step-content">
                                        <h4>{language === 'th' ? 'ตรวจสอบชื่อและโลโก้' : language === 'en' ? 'Check Name & Logo' : '检查名称和标志'}</h4>
                                        <p>{language === 'th' ? 'เช็คความเหมือน/คล้าย ในระบบกรมทรัพย์สินทางปัญญา (ใช้เวลา 1-3 วัน)' : language === 'en' ? 'Check DIP system for similarities (1-3 days)' : '检查DIP系统中的相似性（1-3天）'}</p>
                                    </div>
                                </div>
                                <div className="tm-v-step">
                                    <div className="tm-v-step-num">2</div>
                                    <div className="tm-v-step-content">
                                        <h4>{language === 'th' ? 'ยื่นคำขอจดทะเบียน' : language === 'en' ? 'Submit Application' : '提交申请'}</h4>
                                        <p>{language === 'th' ? 'ได้รับ "เลขที่คำขอ" สามารถนำเอกสารรับเรื่องไปใช้ยื่นขอ อย. ต่อได้เลยทันที' : language === 'en' ? 'Get Request Number to proceed with FDA application' : '获取请求号以继续FDA申请'}</p>
                                    </div>
                                </div>
                                <div className="tm-v-step">
                                    <div className="tm-v-step-num">3</div>
                                    <div className="tm-v-step-content">
                                        <h4>{language === 'th' ? 'รอประกาศโฆษณา' : language === 'en' ? 'Publication' : '出版'}</h4>
                                        <p>{language === 'th' ? 'รอประกาศโฆษณาตามกระบวนการ เพื่อให้โอกาสผู้อื่นคัดค้าน' : language === 'en' ? 'Wait for publication process for any opposition' : '等待出版过程以提出任何异议'}</p>
                                    </div>
                                </div>
                                <div className="tm-v-step">
                                    <div className="tm-v-step-num">4</div>
                                    <div className="tm-v-step-content">
                                        <h4>{language === 'th' ? 'รับหนังสือสำคัญ' : language === 'en' ? 'Receive Certificate' : '收到证书'}</h4>
                                        <p>{language === 'th' ? 'ชำระค่าธรรมเนียมและรับใบจริง (ระยะเวลารวมประมาณ 6-12 เดือน)' : language === 'en' ? 'Pay fee and receive certificate (Total approx. 6-12 months)' : '支付费用并获得证书（总计约6-12个月）'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* เอกสารที่ต้องเตรียม - แบ่งตามประเภท */}
            <section className="reg-docs-section bg-light">
                <div className="container">
                    <div className="reg-section-header">
                        <span className="header-icon">📂</span>
                        <h2>
                            {language === 'th' ? 'เอกสารที่ต้อง' : language === 'en' ? 'Required ' : '所需'}
                            <span>{language === 'th' ? 'เตรียม' : language === 'en' ? 'Documents' : '文件'}</span>
                        </h2>
                        <p>
                            {language === 'th'
                                ? 'เอกสารแบ่งตามประเภทการจด: นิติบุคคล หรือ บุคคลธรรมดา'
                                : language === 'en'
                                ? 'Documents categorized by registration type: Corporate or Individual'
                                : '按注册类型分类的文件：公司或个人'}
                        </p>
                    </div>

                    {/* นิติบุคคล */}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        🏢 {language === 'th' ? '1. นิติบุคคล' : language === 'en' ? '1. Corporate (Juristic Person)' : '1. 公司（法人）'}
                    </h3>
                    <div className="reg-docs-grid" style={{ marginBottom: '2.5rem' }}>
                        {corporateDocs.map((doc, index) => (
                            <div key={index} className="doc-card">
                                <span className="doc-icon">{doc.icon}</span>
                                <div>
                                    <h4>{doc.title}</h4>
                                    <p>{doc.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* บุคคลธรรมดา */}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        👤 {language === 'th' ? '2. บุคคลธรรมดา' : language === 'en' ? '2. Individual (Natural Person)' : '2. 个人（自然人）'}
                    </h3>
                    <div className="reg-docs-grid">
                        {individualDocs.map((doc, index) => (
                            <div key={index} className="doc-card">
                                <span className="doc-icon">{doc.icon}</span>
                                <div>
                                    <h4>{doc.title}</h4>
                                    <p>{doc.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--primary-green-dark)', fontWeight: 500, fontSize: '0.95rem' }}>
                        {language === 'th'
                            ? '💡 เอกสารอื่นๆ ที่ใช้ยื่นขึ้นทะเบียน ทางผู้ผลิตหรือตัวแทนจะเป็นผู้ดำเนินการจัดทำ และจัดส่งให้ลูกค้าเซ็นชื่อในกระบวนการต่อไป'
                            : language === 'en'
                            ? '💡 Other registration documents will be prepared by the manufacturer and sent to the customer for signing.'
                            : '💡 其他注册文件将由制造商准备并发送给客户签署。'}
                    </p>
                </div>
            </section>

            {/* ขั้นตอนการสั่งผลิตสินค้า OEM */}
            <section className="reg-steps-section">
                <div className="container">
                    <div className="reg-section-header">
                        <span className="header-icon">🏭</span>
                        <h2>
                            {language === 'th' ? 'ขั้นตอนการสั่งผลิตสินค้า ' : language === 'en' ? 'OEM Production & ' : 'OEM生产和'}
                            <span>{language === 'th' ? '(OEM) และการสร้างแบรนด์' : language === 'en' ? 'Brand Building Steps' : '品牌建设步骤'}</span>
                        </h2>
                        <p>
                            {language === 'th'
                                ? '5 ขั้นตอนหลักในการสั่งผลิตสินค้า OEM และเตรียมความพร้อมสำหรับการจด อย.'
                                : language === 'en'
                                ? '5 key steps for OEM product ordering and preparing for FDA registration'
                                : 'OEM产品订购和准备FDA注册的5个关键步骤'}
                        </p>
                    </div>
                    <div className="reg-steps-grid">
                        {oemSteps.map((step, index) => (
                            <div key={index} className="step-card">
                                <div className="step-number">{index + 1}</div>
                                <div className="step-content">
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                    <div className="step-tags">
                                        {step.tags.map((tag, i) => (
                                            <span key={i} className="step-tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* กระบวนการขึ้นทะเบียน อย. */}
            <section className="reg-steps-section bg-soft">
                <div className="container">
                    <div className="reg-section-header">
                        <span className="header-icon">📝</span>
                        <h2>
                            {language === 'th' ? 'กระบวนการขึ้นทะเบียนตำรับ ' : language === 'en' ? 'FDA Formula Registration ' : 'FDA配方注册'}
                            <span>{language === 'th' ? 'อย.' : language === 'en' ? 'Process' : '流程'}</span>
                        </h2>
                        <p>
                            {language === 'th'
                                ? 'ขั้นตอนหลังจากเตรียมเอกสารและสรุปรายการผลิตภัณฑ์เรียบร้อยแล้ว'
                                : language === 'en'
                                ? 'Steps after documents and product list are finalized'
                                : '文件和产品清单确定后的步骤'}
                        </p>
                    </div>
                    <div className="reg-steps-grid">
                        {fdaProcessSteps.map((step, index) => (
                            <div key={index} className="step-card">
                                <div className="step-number">{index + 1}</div>
                                <div className="step-content">
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                    {step.timeline && (
                                        <p style={{ color: 'var(--primary-green-dark)', fontWeight: 600, marginTop: '0.5rem', fontSize: '0.9rem' }}>
                                            {step.timeline}
                                        </p>
                                    )}
                                    <div className="step-tags">
                                        {step.tags.map((tag, i) => (
                                            <span key={i} className="step-tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certificate Types Section */}
            <section className="reg-types-section">
                <div className="container">
                    <div className="reg-section-header">
                        <span className="header-icon">🏆</span>
                        <h2>
                            {language === 'th' ? 'ใบอนุญาต & การรับรอง' : language === 'en' ? 'Licenses & ' : '许可证和'}
                            <span>{language === 'th' ? 'ที่สำคัญ' : language === 'en' ? 'Certifications' : '认证'}</span>
                        </h2>
                        <p>
                            {language === 'th'
                                ? 'ประเภทใบอนุญาตและการรับรองที่ผลิตภัณฑ์ของคุณอาจต้องมี'
                                : language === 'en'
                                ? 'Types of licenses and certifications your product may need'
                                : '您的产品可能需要的许可证和认证类型'}
                        </p>
                    </div>
                    <div className="reg-types-grid">
                        {certTypes.map((cert, index) => (
                            <div key={index} className={`type-card ${cert.color}`}>
                                <span className="type-icon">{cert.icon}</span>
                                <h3>{cert.title}</h3>
                                <p className="type-subtitle">{cert.subtitle}</p>
                                <p>{cert.desc}</p>
                                <ul className="type-list">
                                    {cert.items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="reg-faq-section bg-light">
                <div className="container">
                    <div className="reg-section-header">
                        <span className="header-icon">❓</span>
                        <h2>
                            {language === 'th' ? 'คำถามที่พบ' : language === 'en' ? 'Frequently Asked ' : '常见'}
                            <span>{language === 'th' ? 'บ่อย' : language === 'en' ? 'Questions' : '问题'}</span>
                        </h2>
                    </div>
                    <div className="reg-faq-list">
                        {faqs.map((faq, index) => (
                            <div key={index} className={`faq-item ${openFaq === index ? 'active' : ''}`}>
                                <div className="faq-question" onClick={() => toggleFaq(index)}>
                                    <h3>{faq.q}</h3>
                                    <span className="faq-toggle">+</span>
                                </div>
                                <div className="faq-answer">
                                    <div className="faq-answer-content">{faq.a}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="reg-cta-section">
                <div className="container">
                    <div className="reg-cta-box">
                        <h2>
                            {language === 'th' ? 'ให้เราช่วยคุณจัดการเรื่อง อย.' : language === 'en' ? 'Let Us Handle Your FDA Registration' : '让我们为您处理FDA注册'}
                        </h2>
                        <p>
                            {language === 'th'
                                ? 'Thai Herb Centers พร้อมให้บริการครบวงจร ตั้งแต่ให้คำปรึกษา ผลิตสินค้า ไปจนถึงช่วยดำเนินการจด อย. ให้คุณ เอกสารต่างๆ ทางผู้ผลิตจัดทำให้ ลูกค้าเพียงเซ็นชื่อเท่านั้น'
                                : language === 'en'
                                ? 'Thai Herb Centers offers complete One Stop Service from consultation, manufacturing, to FDA registration. We prepare all documents — you only need to sign.'
                                : 'Thai Herb Centers提供从咨询、制造到FDA注册的一站式服务。我们准备所有文件——您只需签名。'}
                        </p>
                        <div className="reg-cta-buttons">
                            <Link to="/contact" className="btn btn-white">
                                📞 {language === 'th' ? 'ติดต่อเรา' : language === 'en' ? 'Contact Us' : '联系我们'}
                            </Link>
                            <Link to="/oem" className="btn btn-outline-white">
                                🏭 {language === 'th' ? 'ดูบริการ OEM' : language === 'en' ? 'View OEM Service' : '查看OEM服务'}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Registration;
