/**
 * Registration & FDA Info Page
 * หน้าข้อมูลขั้นตอนการจด อย. และใบอนุญาตต่างๆ
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

    // ขั้นตอนการจด อย.
    const fdaSteps = [
        {
            title: language === 'th' ? 'ศึกษาประเภทผลิตภัณฑ์' : language === 'en' ? 'Study Product Type' : '研究产品类型',
            desc: language === 'th'
                ? 'ศึกษาว่าผลิตภัณฑ์ของคุณจัดอยู่ในประเภทใด เช่น อาหาร, เครื่องสำอาง, ยาสมุนไพร หรืออาหารเสริม เพราะแต่ละประเภทมีขั้นตอนและเอกสารที่แตกต่างกัน'
                : language === 'en'
                ? 'Study which category your product falls into: food, cosmetics, herbal medicine, or supplements. Each type has different requirements.'
                : '研究您的产品属于哪个类别：食品、化妆品、草药或补充剂。每种类型都有不同的要求。',
            tags: language === 'th' ? ['อาหาร', 'เครื่องสำอาง', 'ยาสมุนไพร', 'อาหารเสริม'] : language === 'en' ? ['Food', 'Cosmetics', 'Herbal Medicine', 'Supplements'] : ['食品', '化妆品', '草药', '补充剂']
        },
        {
            title: language === 'th' ? 'เตรียมสถานที่ผลิตให้ได้มาตรฐาน' : language === 'en' ? 'Prepare Manufacturing Facility' : '准备生产设施',
            desc: language === 'th'
                ? 'สถานที่ผลิตต้องผ่านมาตรฐาน GMP (Good Manufacturing Practice) หรือ Primary GMP ตามที่ อย. กำหนด โดยต้องมีการจัดแบ่งพื้นที่อย่างเหมาะสม ระบบสุขอนามัยที่ดี และอุปกรณ์ที่ได้มาตรฐาน'
                : language === 'en'
                ? 'The production facility must meet GMP (Good Manufacturing Practice) standards as required by the FDA, with proper area division, good hygiene systems, and standard equipment.'
                : '生产设施必须符合FDA要求的GMP（良好生产规范）标准，具有适当的区域划分、良好的卫生系统和标准设备。',
            tags: language === 'th' ? ['GMP', 'Primary GMP', 'สุขอนามัย'] : language === 'en' ? ['GMP', 'Primary GMP', 'Hygiene'] : ['GMP', '初级GMP', '卫生']
        },
        {
            title: language === 'th' ? 'เตรียมเอกสารที่จำเป็น' : language === 'en' ? 'Prepare Required Documents' : '准备所需文件',
            desc: language === 'th'
                ? 'รวบรวมเอกสารสำคัญ ได้แก่ สำเนาบัตรประชาชน, สำเนาทะเบียนบ้าน, หนังสือรับรองบริษัท (กรณีนิติบุคคล), แผนที่สถานที่ผลิต, สูตรส่วนประกอบผลิตภัณฑ์, ผลการตรวจวิเคราะห์จากห้องปฏิบัติการ และฉลากผลิตภัณฑ์'
                : language === 'en'
                ? 'Collect essential documents: ID card copy, house registration, company certificate (for juristic persons), factory location map, product formula, lab analysis results, and product labels.'
                : '收集必要文件：身份证复印件、户籍登记、公司证书（法人）、工厂位置图、产品配方、实验室分析结果和产品标签。',
            tags: language === 'th' ? ['บัตรประชาชน', 'ทะเบียนบริษัท', 'สูตรผลิตภัณฑ์', 'ผลแล็บ'] : language === 'en' ? ['ID Card', 'Company Cert', 'Formula', 'Lab Results'] : ['身份证', '公司证书', '配方', '实验室结果']
        },
        {
            title: language === 'th' ? 'ยื่นคำขอผ่านระบบ e-Submission' : language === 'en' ? 'Submit via e-Submission System' : '通过电子提交系统提交',
            desc: language === 'th'
                ? 'สมัครบัญชีผู้ใช้งานในระบบ e-Submission ของ อย. (privus.fda.moph.go.th) และยื่นคำขอจดทะเบียนตามประเภทผลิตภัณฑ์ พร้อมแนบเอกสารประกอบทั้งหมดในรูปแบบดิจิทัล'
                : language === 'en'
                ? 'Register on the FDA e-Submission system (privus.fda.moph.go.th) and submit your registration application with all supporting digital documents.'
                : '在FDA电子提交系统（privus.fda.moph.go.th）上注册，并提交所有数字支持文件的注册申请。',
            tags: language === 'th' ? ['e-Submission', 'ยื่นออนไลน์'] : language === 'en' ? ['e-Submission', 'Online'] : ['电子提交', '在线']
        },
        {
            title: language === 'th' ? 'รอการตรวจสอบและอนุมัติ' : language === 'en' ? 'Wait for Review & Approval' : '等待审核和批准',
            desc: language === 'th'
                ? 'เจ้าหน้าที่ อย. จะตรวจสอบเอกสารและอาจเข้าตรวจสถานที่ผลิต ระยะเวลาพิจารณาประมาณ 30-90 วันทำการ ขึ้นอยู่กับประเภทผลิตภัณฑ์ หากเอกสารครบถ้วนจะได้รับเลข อย. เพื่อนำไปแสดงบนฉลากสินค้า'
                : language === 'en'
                ? 'FDA officers will review documents and may inspect the facility. Processing takes about 30-90 working days depending on product type. Upon approval, you will receive an FDA number for your product label.'
                : 'FDA官员将审查文件并可能检查设施。处理时间约为30-90个工作日。批准后，您将获得用于产品标签的FDA编号。',
            tags: language === 'th' ? ['30-90 วันทำการ', 'เลข อย.'] : language === 'en' ? ['30-90 working days', 'FDA Number'] : ['30-90个工作日', 'FDA编号']
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
            desc: language === 'th' ? 'การรับรองว่าผลิตภัณฑ์ถูกต้องตามหลักศาสนาอิสลาม ซึ่งเปิดตลาดไปยังกลุ่มลูกค้ามุสลิมทั่วโลก' : language === 'en' ? 'Certification that products comply with Islamic law, opening markets to Muslim consumers worldwide.' : '产品符合伊斯兰法律的认证，向全球穆斯林消费者开放市场。',
            items: language === 'th' ? ['วัตถุดิบฮาลาล', 'กระบวนการผลิตฮาลาล', 'เปิดตลาดมุสลิม', 'เพิ่มโอกาสส่งออก'] : language === 'en' ? ['Halal raw materials', 'Halal production process', 'Access Muslim market', 'Export opportunities'] : ['清真原料', '清真生产过程', '进入穆斯林市场', '出口机会'],
            color: 'card-amber'
        },
        {
            icon: '🧪',
            title: language === 'th' ? 'ตรวจวิเคราะห์แล็บ' : language === 'en' ? 'Lab Analysis' : '实验室分析',
            subtitle: language === 'th' ? 'ผลวิเคราะห์ทางห้องปฏิบัติการ' : language === 'en' ? 'Laboratory Test Results' : '实验室测试结果',
            desc: language === 'th' ? 'การส่งตัวอย่างผลิตภัณฑ์ไปตรวจวิเคราะห์ทางห้องปฏิบัติการที่ได้รับการรับรองเพื่อใช้ประกอบการยื่น อย.' : language === 'en' ? 'Sending product samples to accredited laboratories for analysis, required for FDA submission.' : '将产品样品送到认可的实验室进行分析，FDA提交所需。',
            items: language === 'th' ? ['ตรวจจุลินทรีย์', 'ตรวจโลหะหนัก', 'ตรวจสารสำคัญ', 'ตรวจความคงตัว'] : language === 'en' ? ['Microbiology test', 'Heavy metals test', 'Active ingredient test', 'Stability test'] : ['微生物检测', '重金属检测', '有效成分检测', '稳定性测试'],
            color: 'card-purple'
        },
        {
            icon: '🏷️',
            title: language === 'th' ? 'ออกแบบฉลาก' : language === 'en' ? 'Label Design' : '标签设计',
            subtitle: language === 'th' ? 'ฉลากตามข้อกำหนด อย.' : language === 'en' ? 'FDA-Compliant Labels' : '符合FDA的标签',
            desc: language === 'th' ? 'การออกแบบฉลากผลิตภัณฑ์ให้ถูกต้องตามกฎหมายและข้อกำหนดของ อย. ซึ่งเป็นสิ่งจำเป็นในการจดทะเบียน' : language === 'en' ? 'Designing product labels that comply with FDA regulations, essential for registration.' : '设计符合FDA法规的产品标签，这对注册至关重要。',
            items: language === 'th' ? ['ชื่อผลิตภัณฑ์', 'ส่วนประกอบ/วัตถุดิบ', 'วิธีใช้ / คำเตือน', 'วันผลิต-หมดอายุ'] : language === 'en' ? ['Product name', 'Ingredients', 'Directions / Warnings', 'Manufacturing-Expiry dates'] : ['产品名称', '成分', '使用方法/警告', '生产-到期日期'],
            color: 'card-red'
        },
        {
            icon: '📋',
            title: language === 'th' ? 'จดทะเบียนเครื่องหมายการค้า' : language === 'en' ? 'Trademark Registration' : '商标注册',
            subtitle: language === 'th' ? 'คุ้มครองแบรนด์ของคุณ' : language === 'en' ? 'Protect Your Brand' : '保护您的品牌',
            desc: language === 'th' ? 'การจดทะเบียนเครื่องหมายการค้ากับกรมทรัพย์สินทางปัญญา เพื่อปกป้องแบรนด์สินค้าของคุณ' : language === 'en' ? 'Register your trademark with the Department of Intellectual Property to protect your brand.' : '在知识产权部门注册您的商标以保护您的品牌。',
            items: language === 'th' ? ['คุ้มครองชื่อแบรนด์', 'คุ้มครองโลโก้', 'ป้องกันการลอกเลียน', 'สิทธิ์ตามกฎหมาย'] : language === 'en' ? ['Brand name protection', 'Logo protection', 'Anti-counterfeit', 'Legal rights'] : ['品牌名称保护', '标志保护', '防伪', '合法权利'],
            color: 'card-teal'
        }
    ];

    // เอกสารที่ต้องเตรียม
    const requiredDocs = [
        {
            icon: '📄',
            title: language === 'th' ? 'สำเนาบัตรประชาชน' : language === 'en' ? 'ID Card Copy' : '身份证复印件',
            desc: language === 'th' ? 'ของผู้ขออนุญาต (เจ้าของกิจการ) พร้อมรับรองสำเนาถูกต้อง' : language === 'en' ? 'Of the applicant (business owner), certified true copy' : '申请人（企业主）的认证真实副本'
        },
        {
            icon: '🏠',
            title: language === 'th' ? 'สำเนาทะเบียนบ้าน' : language === 'en' ? 'House Registration' : '户籍登记',
            desc: language === 'th' ? 'ของสถานที่ผลิตและผู้ขออนุญาต' : language === 'en' ? 'Of the manufacturing location and applicant' : '生产地点和申请人的'
        },
        {
            icon: '🏢',
            title: language === 'th' ? 'หนังสือรับรองบริษัท' : language === 'en' ? 'Company Certificate' : '公司证书',
            desc: language === 'th' ? 'กรณีนิติบุคคล ใช้หนังสือรับรองจากกรมพัฒนาธุรกิจการค้า (ไม่เกิน 6 เดือน)' : language === 'en' ? 'For juristic persons, from the Department of Business Development (not older than 6 months)' : '法人的，来自商业发展部（不超过6个月）'
        },
        {
            icon: '🗺️',
            title: language === 'th' ? 'แผนที่สถานที่ผลิต' : language === 'en' ? 'Factory Location Map' : '工厂位置图',
            desc: language === 'th' ? 'แผนที่แสดงที่ตั้งสถานที่ผลิตพร้อมแผนผังภายในอาคาร' : language === 'en' ? 'Map showing factory location with internal building layout' : '显示工厂位置的地图和内部建筑布局'
        },
        {
            icon: '📝',
            title: language === 'th' ? 'สูตรส่วนประกอบ' : language === 'en' ? 'Product Formula' : '产品配方',
            desc: language === 'th' ? 'รายละเอียดส่วนประกอบทั้งหมดของผลิตภัณฑ์ พร้อมปริมาณที่ใช้' : language === 'en' ? 'Complete product ingredient details with quantities used' : '完整的产品成分详情及使用量'
        },
        {
            icon: '🔬',
            title: language === 'th' ? 'ผลตรวจวิเคราะห์' : language === 'en' ? 'Lab Analysis Results' : '实验室分析结果',
            desc: language === 'th' ? 'ผลการตรวจวิเคราะห์จากห้องปฏิบัติการที่ได้รับการรับรอง' : language === 'en' ? 'Analysis results from an accredited laboratory' : '来自认可实验室的分析结果'
        },
    ];

    // คำถามที่พบบ่อย
    const faqs = [
        {
            q: language === 'th' ? 'การจด อย. ใช้เวลากี่วัน?' : language === 'en' ? 'How long does FDA registration take?' : 'FDA注册需要多长时间？',
            a: language === 'th' ? 'ระยะเวลาขึ้นอยู่กับประเภทผลิตภัณฑ์ โดยทั่วไปเครื่องสำอางใช้เวลาประมาณ 3-5 วันทำการ, อาหารและเครื่องดื่มประมาณ 30-45 วันทำการ, ยาสมุนไพรประมาณ 60-90 วันทำการ ทั้งนี้ขึ้นอยู่กับความครบถ้วนของเอกสารที่ยื่น' : language === 'en' ? 'Duration depends on product type: cosmetics take about 3-5 working days, food & beverages about 30-45 working days, herbal medicines about 60-90 working days. This depends on the completeness of submitted documents.' : '时间取决于产品类型：化妆品约3-5个工作日，食品和饮料约30-45个工作日，草药约60-90个工作日。这取决于提交文件的完整性。'
        },
        {
            q: language === 'th' ? 'ค่าใช้จ่ายในการจด อย. ประมาณเท่าไหร่?' : language === 'en' ? 'How much does FDA registration cost?' : 'FDA注册费用是多少？',
            a: language === 'th' ? 'ค่าธรรมเนียมของ อย. สำหรับการจดทะเบียนจะแตกต่างกันตามประเภทผลิตภัณฑ์ เริ่มตั้งแต่ 2,000 - 20,000 บาท โดยยังไม่รวมค่าตรวจวิเคราะห์จากห้องปฏิบัติการ และค่าบริการอื่นๆ สามารถติดต่อทีมงานเราเพื่อประเมินค่าใช้จ่ายเบื้องต้นได้' : language === 'en' ? 'FDA registration fees vary by product type, ranging from 2,000 - 20,000 THB, excluding lab analysis and other service charges. Contact our team for a cost estimate.' : 'FDA注册费用因产品类型而异，从2,000-20,000泰铢不等，不包括实验室分析和其他服务费用。联系我们的团队获取费用估算。'
        },
        {
            q: language === 'th' ? 'สินค้าประเภทไหนต้องจด อย. บ้าง?' : language === 'en' ? 'Which product types require FDA registration?' : '哪些产品类型需要FDA注册？',
            a: language === 'th' ? 'ผลิตภัณฑ์ที่ต้องจด อย. ได้แก่ อาหาร, เครื่องดื่ม, เครื่องสำอาง, ยาแผนโบราณ, ยาสมุนไพร, อาหารเสริม, วัตถุอันตราย และเครื่องมือแพทย์ โดยแต่ละประเภทมีรายละเอียดข้อกำหนดที่แตกต่างกัน' : language === 'en' ? 'Products requiring FDA registration include: food, beverages, cosmetics, traditional medicines, herbal medicines, supplements, hazardous substances, and medical devices. Each type has different requirements.' : '需要FDA注册的产品包括：食品、饮料、化妆品、传统药品、草药、补充剂、危险物质和医疗器械。每种类型都有不同的要求。'
        },
        {
            q: language === 'th' ? 'ถ้าจ้าง Thai Herb Centers ผลิต จะช่วยจด อย. ให้ด้วยไหม?' : language === 'en' ? 'If I hire Thai Herb Centers for OEM, will you help with FDA registration?' : '如果我聘请Thai Herb Centers进行OEM，你们会帮忙FDA注册吗？',
            a: language === 'th' ? 'ได้ค่ะ/ครับ! Thai Herb Centers ให้บริการแบบ One Stop Service ครบวงจร ตั้งแต่คิดสูตร, ผลิตสินค้า, ออกแบบฉลาก, จนถึงการช่วยดำเนินการจด อย. ให้กับลูกค้าของเรา โดยทีมงานผู้เชี่ยวชาญจะดูแลทุกขั้นตอนให้' : language === 'en' ? 'Yes! Thai Herb Centers provides a complete One Stop Service from formulation, manufacturing, label design, to FDA registration assistance. Our expert team handles every step for you.' : '是的！Thai Herb Centers提供从配方、制造、标签设计到FDA注册协助的一站式服务。我们的专家团队为您处理每一个步骤。'
        },
        {
            q: language === 'th' ? 'ต้องมี GMP ก่อนจด อย. หรือไม่?' : language === 'en' ? 'Is GMP required before FDA registration?' : '在FDA注册之前需要GMP吗？',
            a: language === 'th' ? 'ใช่ครับ สถานที่ผลิตต้องได้รับการรับรอง GMP ก่อนจึงจะสามารถยื่นขอจดทะเบียน อย. ได้ แต่หากคุณใช้บริการ OEM กับ Thai Herb Centers ไม่ต้องกังวล เพราะโรงงานของเราได้รับการรับรอง GMP เรียบร้อยแล้ว' : language === 'en' ? 'Yes, the manufacturing facility must have GMP certification before applying for FDA registration. But if you use our OEM service, our factory is already GMP certified.' : '是的，生产设施必须在申请FDA注册之前获得GMP认证。但如果您使用我们的OEM服务，我们的工厂已经获得GMP认证。'
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
                        <span className="slide-text slide-1">
                            {language === 'th' ? 'ขั้นตอนการจดทะเบียน' : language === 'en' ? 'Registration Steps for' : '注册步骤'}
                        </span>
                        <br />
                        <span className="slide-text slide-2 text-blue">
                            {language === 'th' ? 'อย. และใบอนุญาตที่สำคัญ' : language === 'en' ? 'FDA & Essential Certifications' : 'FDA和重要认证'}
                        </span>
                    </h1>
                    <p className="animate-fadeInUp">
                        {language === 'th'
                            ? 'ข้อมูลครบถ้วนเกี่ยวกับขั้นตอนการขอ อย., GMP, Halal และใบรับรองต่างๆ ที่จำเป็นสำหรับผลิตภัณฑ์สมุนไพรและเครื่องสำอาง'
                            : language === 'en'
                            ? 'Complete information about FDA, GMP, Halal registration steps and essential certifications for herbal and cosmetic products.'
                            : '关于FDA、GMP、清真注册步骤和草药及化妆品产品必要认证的完整信息。'}
                    </p>
                </div>
            </section>

            {/* Intro Section */}
            <section className="reg-intro-section">
                <div className="container">
                    <div className="reg-intro-grid">
                        <div className="reg-intro-text">
                            <h2>
                                {language === 'th' ? 'อย. คืออะไร? ' : language === 'en' ? 'What is ' : '什么是'}
                                <span>{language === 'th' ? 'ทำไมต้องจด?' : language === 'en' ? 'FDA Thailand?' : 'FDA泰国？'}</span>
                            </h2>
                            <p>
                                {language === 'th'
                                    ? 'อย. ย่อมาจาก สำนักงานคณะกรรมการอาหารและยา (Food and Drug Administration) เป็นหน่วยงานภายใต้กระทรวงสาธารณสุข มีหน้าที่ควบคุมดูแลผลิตภัณฑ์สุขภาพต่างๆ ให้มีคุณภาพ ปลอดภัย และมีประสิทธิผลต่อผู้บริโภค'
                                    : language === 'en'
                                    ? 'The Thai FDA (Food and Drug Administration) is an agency under the Ministry of Public Health responsible for regulating health products to ensure quality, safety, and efficacy for consumers.'
                                    : '泰国FDA（食品药品管理局）是卫生部下属机构，负责监管健康产品，以确保消费者的质量、安全和功效。'}
                            </p>
                            <p>
                                {language === 'th'
                                    ? 'การจด อย. เป็นสิ่งจำเป็นสำหรับผลิตภัณฑ์ที่จะวางจำหน่ายในประเทศไทย เพราะเป็นการรับรองว่าผลิตภัณฑ์ของคุณผ่านมาตรฐานความปลอดภัย และช่วยสร้างความน่าเชื่อถือให้กับแบรนด์ของคุณ'
                                    : language === 'en'
                                    ? 'FDA registration is essential for products sold in Thailand. It certifies that your product meets safety standards and helps build brand credibility and consumer trust.'
                                    : 'FDA注册对于在泰国销售的产品至关重要。它证明您的产品符合安全标准，并有助于建立品牌信誉和消费者信任。'}
                            </p>
                            <div className="reg-intro-highlights">
                                <div className="highlight-item">
                                    <span className="highlight-icon">✅</span>
                                    <span className="highlight-label">{language === 'th' ? 'สินค้าถูกกฎหมาย' : language === 'en' ? 'Legal Compliance' : '合法合规'}</span>
                                </div>
                                <div className="highlight-item">
                                    <span className="highlight-icon">🛡️</span>
                                    <span className="highlight-label">{language === 'th' ? 'สร้างความน่าเชื่อถือ' : language === 'en' ? 'Build Trust' : '建立信任'}</span>
                                </div>
                                <div className="highlight-item">
                                    <span className="highlight-icon">🌏</span>
                                    <span className="highlight-label">{language === 'th' ? 'วางจำหน่ายได้ทั่วประเทศ' : language === 'en' ? 'Nationwide Sales' : '全国销售'}</span>
                                </div>
                                <div className="highlight-item">
                                    <span className="highlight-icon">📈</span>
                                    <span className="highlight-label">{language === 'th' ? 'เพิ่มโอกาสส่งออก' : language === 'en' ? 'Export Opportunities' : '出口机会'}</span>
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

            {/* FDA Steps Section */}
            <section className="reg-steps-section bg-light">
                <div className="container">
                    <div className="reg-section-header">
                        <span className="header-icon">📝</span>
                        <h2>
                            {language === 'th' ? '5 ขั้นตอนการจด ' : language === 'en' ? '5 Steps to ' : '5个步骤'}
                            <span>{language === 'th' ? 'อย.' : language === 'en' ? 'FDA Registration' : 'FDA注册'}</span>
                        </h2>
                        <p>
                            {language === 'th'
                                ? 'ขั้นตอนหลักในการดำเนินการจดทะเบียน อย. สำหรับผลิตภัณฑ์สมุนไพรและเครื่องสำอาง'
                                : language === 'en'
                                ? 'Key steps for FDA registration of herbal and cosmetic products'
                                : '草药和化妆品产品FDA注册的关键步骤'}
                        </p>
                    </div>
                    <div className="reg-steps-grid">
                        {fdaSteps.map((step, index) => (
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

            {/* Required Documents Section */}
            <section className="reg-docs-section bg-soft">
                <div className="container">
                    <div className="reg-section-header">
                        <span className="header-icon">📂</span>
                        <h2>
                            {language === 'th' ? 'เอกสารที่ต้อง' : language === 'en' ? 'Required ' : '所需'}
                            <span>{language === 'th' ? 'เตรียม' : language === 'en' ? 'Documents' : '文件'}</span>
                        </h2>
                        <p>
                            {language === 'th'
                                ? 'รายการเอกสารพื้นฐานที่ต้องจัดเตรียมสำหรับการยื่นจดทะเบียน อย.'
                                : language === 'en'
                                ? 'Basic documents required for FDA registration submission'
                                : 'FDA注册提交所需的基本文件'}
                        </p>
                    </div>
                    <div className="reg-docs-grid">
                        {requiredDocs.map((doc, index) => (
                            <div key={index} className="doc-card">
                                <span className="doc-icon">{doc.icon}</span>
                                <div>
                                    <h4>{doc.title}</h4>
                                    <p>{doc.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="reg-faq-section">
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
                                ? 'Thai Herb Centers พร้อมให้บริการครบวงจร ตั้งแต่ให้คำปรึกษา ผลิตสินค้า ไปจนถึงช่วยดำเนินการจด อย. ให้คุณ'
                                : language === 'en'
                                ? 'Thai Herb Centers offers complete One Stop Service from consultation, manufacturing, to FDA registration assistance.'
                                : 'Thai Herb Centers提供从咨询、制造到FDA注册协助的一站式服务。'}
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
