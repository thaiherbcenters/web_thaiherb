/**
 * Registration Guide Page
 * คู่มือการจดทะเบียน - ขั้นตอนตั้งแต่เตรียมตัวจนถึงได้เลข อย.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import useTranslation from '../hooks/useTranslation';
import './Registration.css';

function Registration() {
    const { t, language } = useTranslation();
    const [openFaq, setOpenFaq] = useState(null);
    const [activeDocTab, setActiveDocTab] = useState('corporate');

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // คำถามที่พบบ่อย
    const faqs = [
        {
            q: language === 'th' ? 'การจด อย. ใช้เวลาทั้งหมดประมาณกี่เดือน?' : language === 'en' ? 'How long does the entire FDA registration process take?' : 'FDA注册总共需要多长时间？',
            a: language === 'th' ? 'รวมทั้งหมดประมาณ 3-8 เดือน แบ่งเป็น: ขออนุมัติเอกสารส่งตัวอย่าง 2-3 วัน → รอผล LAB 15-30 วัน → รอเลข อย. หลังยื่น ทบ.๑ ประมาณ 6 เดือน (เร็วสุด 2-3 เดือน) ระหว่างนี้จดเครื่องหมายการค้าทำขนานกันได้เลย' : language === 'en' ? 'Total approximately 3-8 months: Document approval 2-3 days → LAB results 15-30 days → FDA number after TB.1 submission about 6 months (fastest 2-3 months). Trademark registration runs in parallel.' : '总计约3-8个月：文件批准2-3天→实验室结果15-30天→提交TB.1后FDA编号约6个月（最快2-3个月）。商标注册可并行进行。'
        },
        {
            q: language === 'th' ? 'ต้องจดเครื่องหมายการค้าก่อนจด อย. หรือไม่?' : language === 'en' ? 'Must I register a trademark before FDA registration?' : '必须在FDA注册之前注册商标吗？',
            a: language === 'th' ? 'ใช่ครับ ต้อง "ยื่นคำขอ" จดเครื่องหมายการค้าก่อน แต่ไม่จำเป็นต้องรอจนได้ใบจริง (ซึ่งใช้เวลา 6 เดือน) เพียงแค่ได้ "เลขที่คำขอ" หรือ "ใบรับเรื่อง" จาก DIP ก็สามารถนำไปยื่นขอ อย. ต่อได้ทันที ทำขนานกันไปได้ครับ' : language === 'en' ? 'Yes, you must submit a trademark application first. However, you don\'t need to wait for the actual certificate (6 months). Once you get the request number from DIP, you can proceed with FDA application immediately.' : '是的，您必须先提交商标申请。但不需要等待实际证书（6个月）。一旦从DIP获得请求号，即可立即进行FDA申请。'
        },
        {
            q: language === 'th' ? 'จดในนามนิติบุคคลหรือบุคคลธรรมดาต่างกันอย่างไร?' : language === 'en' ? 'What\'s the difference between corporate and individual registration?' : '公司注册和个人注册有什么区别？',
            a: language === 'th' ? 'ทั้งสองแบบจดทะเบียน อย. ได้เหมือนกัน แต่เอกสารที่ใช้ต่างกัน: นิติบุคคลต้องใช้หนังสือรับรองบริษัท (ไม่เกิน 6 เดือน), สำเนาบัตรประชาชนกรรมการ, สำเนาทะเบียนกรรมการ, ใบรับรองแพทย์ ส่วนบุคคลธรรมดาใช้เพียงสำเนาบัตรประชาชน, สำเนาทะเบียนบ้าน และใบรับรองแพทย์' : language === 'en' ? 'Both can register for FDA. The difference is in the required documents: Corporate needs a company certificate (not older than 6 months), director\'s ID, director\'s house registration, and medical certificate. Individual needs only ID card, house registration, and medical certificate.' : '两者都可以注册FDA。区别在于所需文件：公司需要公司证书（不超过6个月）、董事身份证、董事户籍登记和医疗证明。个人只需要身份证、户籍登记和医疗证明。'
        },
        {
            q: language === 'th' ? 'ชื่อแบรนด์มีข้อจำกัดอะไรบ้าง?' : language === 'en' ? 'What are the brand name restrictions?' : '品牌名称有什么限制？',
            a: language === 'th' ? 'ชื่อต้องไม่ซ้ำกับแบรนด์อื่น และต้องไม่สื่อหรือชี้นำเกี่ยวกับตัวผลิตภัณฑ์สมุนไพรโดยตรง นอกจากนี้ต้องมีทั้ง "ชื่อ + LOGO" เพื่อใช้ตรวจสอบกับ DIP หากมีแค่ชื่ออย่างเดียว จะไม่สามารถตรวจสอบได้อย่างละเอียด' : language === 'en' ? 'The name must not duplicate other brands and must not directly describe the herbal product. Both name + LOGO are required for DIP verification. Name alone is insufficient for thorough checking.' : '名称不得与其他品牌重复，且不得直接描述草药产品。DIP验证需要名称+LOGO。仅有名称不足以进行彻底检查。'
        },
        {
            q: language === 'th' ? 'ถ้าจ้าง Thai Herb Centers ผลิต จะช่วยจด อย. ให้ด้วยไหม?' : language === 'en' ? 'If I hire Thai Herb Centers for OEM, will you help with FDA registration?' : '如果我聘请Thai Herb Centers进行OEM，你们会帮忙FDA注册吗？',
            a: language === 'th' ? 'ได้ครับ! Thai Herb Centers ให้บริการแบบ One Stop Service ครบวงจร ตั้งแต่คิดสูตร ผลิตสินค้า ออกแบบฉลาก จนถึงช่วยดำเนินการจด อย. เอกสารอื่นๆ ทางโรงงานจะจัดทำให้ ลูกค้าเพียงเซ็นชื่อเท่านั้น' : language === 'en' ? 'Yes! Thai Herb Centers offers a complete One Stop Service — from formulation, manufacturing, label design, to FDA registration assistance. We prepare all documents; you only need to sign.' : '是的！Thai Herb Centers提供一站式服务——从配方、制造、标签设计到FDA注册协助。我们准备所有文件，您只需签名。'
        },
    ];

    return (
        <div className="registration-page page">
            {/* Hero Section */}
            <section className="page-hero">
                <div className="container page-hero-content">
                    <span className="badge slide-text slide-0">
                        {language === 'th' ? '📋 คู่มือการจดทะเบียน' : language === 'en' ? '📋 Registration Guide' : '📋 注册指南'}
                    </span>
                    <h1 className="animate-fadeInUp">
                        {language === 'th' ? 'ขั้นตอนการขึ้นทะเบียนตำรับ ' : language === 'en' ? 'FDA Registration ' : 'FDA注册'}
                        <span className="text-blue">
                            {language === 'th' ? 'อย.' : language === 'en' ? 'Process' : '流程'}
                        </span>
                    </h1>
                    <p className="animate-fadeInUp">
                        {language === 'th'
                            ? 'คู่มือครบจบในหน้าเดียว ตั้งแต่เตรียมเอกสาร สร้างแบรนด์ จดเครื่องหมายการค้า สั่งผลิต OEM จนถึงได้เลข อย.'
                            : language === 'en'
                            ? 'Complete guide from document preparation, branding, trademark registration, OEM production to FDA number.'
                            : '从文件准备、品牌建设、商标注册、OEM生产到FDA编号的完整指南。'}
                    </p>
                </div>
            </section>

            {/* ===== PHASE 1: เตรียมเอกสาร & เครื่องหมายการค้า ===== */}
            <section className="reg-phase-section">
                <div className="container">
                    <div className="phase-badge phase-1">
                        {language === 'th' ? 'ขั้นตอนที่ 1' : language === 'en' ? 'Phase 1' : '第1阶段'}
                    </div>
                    <div className="reg-section-header">
                        <h2>
                            {language === 'th' ? 'เตรียมเอกสาร & ' : language === 'en' ? 'Prepare Documents & ' : '准备文件和'}
                            <span>{language === 'th' ? 'จดเครื่องหมายการค้า' : language === 'en' ? 'Register Trademark' : '注册商标'}</span>
                        </h2>
                        <p>
                            {language === 'th'
                                ? 'ก่อนเริ่มทุกอย่าง ต้องมีชื่อแบรนด์ โลโก้ และเอกสารยืนยันตัวตนให้พร้อม'
                                : language === 'en'
                                ? 'Before everything, have your brand name, logo, and identity documents ready.'
                                : '在开始一切之前，准备好您的品牌名称、标志和身份证明文件。'}
                        </p>
                    </div>

                    <div className="phase1-layout">
                        {/* ฝั่งซ้าย: Tab เอกสาร */}
                        <div className="phase1-docs">
                            <h3>📂 {language === 'th' ? 'เอกสารที่ต้องเตรียม' : language === 'en' ? 'Required Documents' : '所需文件'}</h3>
                            <div className="doc-tabs">
                                <button
                                    className={`doc-tab ${activeDocTab === 'corporate' ? 'active' : ''}`}
                                    onClick={() => setActiveDocTab('corporate')}
                                >
                                    🏢 {language === 'th' ? 'นิติบุคคล' : language === 'en' ? 'Corporate' : '公司'}
                                </button>
                                <button
                                    className={`doc-tab ${activeDocTab === 'individual' ? 'active' : ''}`}
                                    onClick={() => setActiveDocTab('individual')}
                                >
                                    👤 {language === 'th' ? 'บุคคลธรรมดา' : language === 'en' ? 'Individual' : '个人'}
                                </button>
                            </div>

                            {activeDocTab === 'corporate' && (
                                <ul className="doc-checklist">
                                    <li>
                                        <span className="check-icon">✓</span>
                                        <div>
                                            <strong>{language === 'th' ? 'หนังสือรับรองบริษัท' : language === 'en' ? 'Company Certificate' : '公司证书'}</strong>
                                            <span>{language === 'th' ? 'อายุไม่เกิน 6 เดือน' : language === 'en' ? 'Not older than 6 months' : '不超过6个月'}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <span className="check-icon">✓</span>
                                        <div>
                                            <strong>{language === 'th' ? 'สำเนาบัตรประชาชนกรรมการ' : language === 'en' ? 'Director\'s ID Card Copy' : '董事身份证复印件'}</strong>
                                            <span>{language === 'th' ? 'ผู้ยื่นคำขอ / ผู้มีอำนาจลงนาม (1-2 ท่าน)' : language === 'en' ? 'Applicant / Authorized signatory (1-2 persons)' : '申请人/授权签字人（1-2人）'}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <span className="check-icon">✓</span>
                                        <div>
                                            <strong>{language === 'th' ? 'สำเนาทะเบียนกรรมการ' : language === 'en' ? 'Director\'s House Registration' : '董事户籍登记'}</strong>
                                            <span>{language === 'th' ? 'ของผู้ยื่นคำขอ' : language === 'en' ? 'Of the applicant' : '申请人的'}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <span className="check-icon">✓</span>
                                        <div>
                                            <strong>{language === 'th' ? 'ใบรับรองแพทย์' : language === 'en' ? 'Medical Certificate' : '医疗证明'}</strong>
                                            <span>{language === 'th' ? 'อายุไม่เกิน 1 ปี' : language === 'en' ? 'Not older than 1 year' : '不超过1年'}</span>
                                        </div>
                                    </li>
                                </ul>
                            )}

                            {activeDocTab === 'individual' && (
                                <ul className="doc-checklist">
                                    <li>
                                        <span className="check-icon">✓</span>
                                        <div>
                                            <strong>{language === 'th' ? 'สำเนาบัตรประชาชน' : language === 'en' ? 'ID Card Copy' : '身份证复印件'}</strong>
                                            <span>{language === 'th' ? 'ของผู้ยื่นคำขอ' : language === 'en' ? 'Of the applicant' : '申请人的'}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <span className="check-icon">✓</span>
                                        <div>
                                            <strong>{language === 'th' ? 'สำเนาทะเบียนบ้าน' : language === 'en' ? 'House Registration Copy' : '户籍登记复印件'}</strong>
                                            <span>{language === 'th' ? 'ของผู้ยื่นคำขอ' : language === 'en' ? 'Of the applicant' : '申请人的'}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <span className="check-icon">✓</span>
                                        <div>
                                            <strong>{language === 'th' ? 'ใบรับรองแพทย์' : language === 'en' ? 'Medical Certificate' : '医疗证明'}</strong>
                                            <span>{language === 'th' ? 'อายุไม่เกิน 1 ปี' : language === 'en' ? 'Not older than 1 year' : '不超过1年'}</span>
                                        </div>
                                    </li>
                                </ul>
                            )}

                            <div className="doc-note">
                                💡 {language === 'th'
                                    ? 'เอกสารอื่นๆ ทางผู้ผลิตจะจัดทำให้ ลูกค้าเพียงเซ็นชื่อเท่านั้น'
                                    : language === 'en'
                                    ? 'Other documents will be prepared by the manufacturer. You only need to sign.'
                                    : '其他文件由制造商准备。您只需签名。'}
                            </div>
                        </div>

                        {/* ฝั่งขวา: เครื่องหมายการค้า */}
                        <div className="phase1-trademark">
                            <h3>®️ {language === 'th' ? 'จดเครื่องหมายการค้า' : language === 'en' ? 'Register Trademark' : '注册商标'}</h3>
                            <div className="tm-mini-steps">
                                <div className="tm-mini-step">
                                    <div className="tm-mini-num">1</div>
                                    <div>
                                        <strong>{language === 'th' ? 'เตรียมชื่อ + LOGO' : language === 'en' ? 'Prepare Name + LOGO' : '准备名称+LOGO'}</strong>
                                        <p>{language === 'th' ? 'ต้องมีทั้งชื่อและโลโก้ เพื่อตรวจสอบกับกรมทรัพย์สินทางปัญญา (DIP)' : language === 'en' ? 'Both name and logo required for DIP verification' : '需要名称和标志用于DIP验证'}</p>
                                    </div>
                                </div>
                                <div className="tm-mini-step">
                                    <div className="tm-mini-num">2</div>
                                    <div>
                                        <strong>{language === 'th' ? 'ตรวจสอบความซ้ำ' : language === 'en' ? 'Check for Duplicates' : '检查重复'}</strong>
                                        <p>{language === 'th' ? 'ชื่อต้องไม่ซ้ำ และไม่สื่อเกี่ยวกับตัวสินค้าโดยตรง (ใช้เวลา 1-3 วัน)' : language === 'en' ? 'Name must be unique and not describe the product directly (1-3 days)' : '名称必须唯一且不直接描述产品（1-3天）'}</p>
                                    </div>
                                </div>
                                <div className="tm-mini-step">
                                    <div className="tm-mini-num">3</div>
                                    <div>
                                        <strong>{language === 'th' ? 'ยื่นคำขอจดทะเบียน' : language === 'en' ? 'Submit Registration' : '提交注册'}</strong>
                                        <p>{language === 'th' ? 'ได้ "เลขที่คำขอ" → นำไปยื่น อย. ต่อได้ทันที ไม่ต้องรอใบจริง' : language === 'en' ? 'Get request number → Proceed with FDA immediately, no need to wait for certificate' : '获取请求号→立即进行FDA申请，无需等待证书'}</p>
                                    </div>
                                </div>
                                <div className="tm-mini-step">
                                    <div className="tm-mini-num">4</div>
                                    <div>
                                        <strong>{language === 'th' ? 'รับหนังสือสำคัญ' : language === 'en' ? 'Receive Certificate' : '收到证书'}</strong>
                                        <p>{language === 'th' ? 'รอประกาศและรับใบรับรอง (ระยะเวลารวม ~6 เดือน ทำขนานกับ อย. ได้)' : language === 'en' ? 'Wait for publication and receive certificate (~6 months, runs parallel to FDA)' : '等待公示并获得证书（约6个月，与FDA并行）'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== PHASE 2: สั่งผลิต OEM & สร้างแบรนด์ ===== */}
            <section className="reg-phase-section bg-light">
                <div className="container">
                    <div className="phase-badge phase-2">
                        {language === 'th' ? 'ขั้นตอนที่ 2' : language === 'en' ? 'Phase 2' : '第2阶段'}
                    </div>
                    <div className="reg-section-header">
                        <h2>
                            {language === 'th' ? 'สั่งผลิตสินค้า OEM & ' : language === 'en' ? 'OEM Production & ' : 'OEM生产和'}
                            <span>{language === 'th' ? 'สร้างแบรนด์' : language === 'en' ? 'Brand Building' : '品牌建设'}</span>
                        </h2>
                        <p>
                            {language === 'th'
                                ? 'เมื่อเตรียมเอกสารและยื่นจดเครื่องหมายการค้าแล้ว เข้าสู่ขั้นตอนการสั่งผลิตสินค้า'
                                : language === 'en'
                                ? 'After document preparation and trademark submission, proceed to OEM production.'
                                : '文件准备和商标提交后，进入OEM生产。'}
                        </p>
                    </div>
                    <div className="reg-steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <div className="step-content">
                                <h3>{language === 'th' ? 'แจ้ง Concept สินค้า' : language === 'en' ? 'Product Concept' : '产品概念'}</h3>
                                <p>{language === 'th' ? 'แจ้งว่าต้องการผลิตสินค้าประเภทอะไร? สารสกัดตัวไหน? กลิ่น/สี?' : language === 'en' ? 'What product type? Which extracts? Desired scent/color?' : '什么产品类型？哪种提取物？所需香味/颜色？'}</p>
                            </div>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <div className="step-content">
                                <h3>{language === 'th' ? 'ส่ง LOGO & ชื่อแบรนด์' : language === 'en' ? 'Submit LOGO & Brand' : '提交LOGO和品牌'}</h3>
                                <p>{language === 'th' ? 'ส่งให้โรงงานเพื่อใช้ยื่นจดเครื่องหมายการค้ากับ DIP และยื่นขอ อย.' : language === 'en' ? 'Submit to factory for trademark registration with DIP and FDA application.' : '提交给工厂用于DIP商标注册和FDA申请。'}</p>
                            </div>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <div className="step-content">
                                <h3>{language === 'th' ? 'ตรวจเช็คชื่อแบรนด์' : language === 'en' ? 'Verify Brand Name' : '验证品牌名称'}</h3>
                                <p>{language === 'th' ? 'ตรวจสอบว่าชื่อไม่ซ้ำ ไม่สื่อสรรพคุณ และผ่านเกณฑ์ของ DIP' : language === 'en' ? 'Verify the name is unique, doesn\'t describe the product, and meets DIP criteria.' : '验证名称唯一，不描述产品，符合DIP标准。'}</p>
                            </div>
                        </div>
                        <div className="step-card">
                            <div className="step-number">4</div>
                            <div className="step-content">
                                <h3>{language === 'th' ? 'ยื่นจดเครื่องหมายการค้า' : language === 'en' ? 'Submit Trademark' : '提交商标'}</h3>
                                <p>{language === 'th' ? 'ชื่อแบรนด์ผ่าน → รอรับหนังสือสำคัญ (อนุมัติ) ประมาณ 6 เดือน' : language === 'en' ? 'Brand name approved → Wait for certificate approx. 6 months.' : '品牌名称通过→等待证书约6个月。'}</p>
                            </div>
                        </div>
                        <div className="step-card">
                            <div className="step-number">5</div>
                            <div className="step-content">
                                <h3>{language === 'th' ? 'สรุปผลิตภัณฑ์ & สูตร' : language === 'en' ? 'Finalize Products' : '确定产品'}</h3>
                                <p>{language === 'th' ? 'สรุปรายการผลิตภัณฑ์ + สูตรโดยละเอียด เพื่อยื่นขอ อย. ต่อไป' : language === 'en' ? 'Finalize product list + detailed formulas for FDA submission.' : '确定产品清单+详细配方用于FDA提交。'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== PHASE 3: กระบวนการขึ้นทะเบียน อย. ===== */}
            <section className="reg-phase-section">
                <div className="container">
                    <div className="phase-badge phase-3">
                        {language === 'th' ? 'ขั้นตอนที่ 3' : language === 'en' ? 'Phase 3' : '第3阶段'}
                    </div>
                    <div className="reg-section-header">
                        <h2>
                            {language === 'th' ? 'กระบวนการขึ้นทะเบียนตำรับ ' : language === 'en' ? 'FDA Formula Registration ' : 'FDA配方注册'}
                            <span>{language === 'th' ? 'อย.' : language === 'en' ? 'Process' : '流程'}</span>
                        </h2>
                        <p>
                            {language === 'th'
                                ? 'ขั้นตอนสุดท้ายก่อนได้เลข อย. และเริ่มผลิตสินค้าจำหน่าย'
                                : language === 'en'
                                ? 'Final steps before receiving your FDA number and starting production for sale.'
                                : '获得FDA编号并开始生产销售之前的最后步骤。'}
                        </p>
                    </div>
                    <div className="reg-steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <div className="step-content">
                                <h3>{language === 'th' ? 'ขอส่งตัวอย่างกับ อย.' : language === 'en' ? 'Request Sample Submission' : '申请提交样品'}</h3>
                                <p>{language === 'th' ? 'ทำเอกสารขอส่งตัวอย่างสมุนไพรให้ LAB ตรวจสารปนเปื้อน' : language === 'en' ? 'Prepare documents to submit herbal samples to LAB for contamination testing.' : '准备文件将草药样品提交到实验室进行污染物检测。'}</p>
                                <div className="step-timeline">⏱️ {language === 'th' ? '2-3 วัน อนุมัติเอกสาร' : language === 'en' ? '2-3 days for approval' : '2-3天批准'}</div>
                            </div>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <div className="step-content">
                                <h3>{language === 'th' ? 'ส่งตัวอย่างตรวจ LAB' : language === 'en' ? 'LAB Testing' : '实验室检测'}</h3>
                                <p>{language === 'th' ? 'ส่งตัวอย่างสมุนไพรให้ LAB ตรวจหาสารปนเปื้อน รอผลวิเคราะห์' : language === 'en' ? 'Submit herbal samples to LAB for contamination testing and wait for results.' : '将草药样品提交到实验室进行污染物检测并等待结果。'}</p>
                                <div className="step-timeline">⏱️ {language === 'th' ? 'ประมาณ 15-30 วัน' : language === 'en' ? 'Approx. 15-30 days' : '约15-30天'}</div>
                            </div>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <div className="step-content">
                                <h3>{language === 'th' ? 'ยื่น ทบ.๑ ขอเลข อย.' : language === 'en' ? 'Submit TB.1 Form' : '提交TB.1表格'}</h3>
                                <p>{language === 'th' ? 'ได้ผล LAB แล้ว → ยื่นแบบ ทบ.๑ ขึ้นทะเบียนตำรับยา ขอเลข อย.' : language === 'en' ? 'LAB results received → Submit Form TB.1 for drug formula registration.' : '收到实验室结果→提交TB.1表格进行药品配方注册。'}</p>
                                <div className="step-timeline">⏱️ {language === 'th' ? 'รออนุมัติ 6 เดือน (เร็วสุด 2-3 เดือน)' : language === 'en' ? '6 months (fastest 2-3 months)' : '6个月（最快2-3个月）'}</div>
                            </div>
                        </div>
                        <div className="step-card">
                            <div className="step-number">4</div>
                            <div className="step-content">
                                <h3>{language === 'th' ? 'ได้เลข อย. (G) ✅' : language === 'en' ? 'Receive FDA Number (G) ✅' : '获得FDA编号（G）✅'}</h3>
                                <p>{language === 'th' ? 'ขึ้นทะเบียนตำรับผ่าน ได้รับเลข อย. (G) แสดงบนฉลากสินค้าได้ทันที' : language === 'en' ? 'Registration approved! FDA number (G) can be displayed on product labels.' : '注册通过！FDA编号（G）可以显示在产品标签上。'}</p>
                            </div>
                        </div>
                        <div className="step-card">
                            <div className="step-number">5</div>
                            <div className="step-content">
                                <h3>{language === 'th' ? 'ผลิตสินค้า & ส่งมอบ 🎉' : language === 'en' ? 'Production & Delivery 🎉' : '生产和交货🎉'}</h3>
                                <p>{language === 'th' ? 'ผลิตสินค้าตามใบเสนอราคาที่แจ้งลูกค้า พร้อมส่งมอบนำไปจำหน่ายได้ทันที' : language === 'en' ? 'Produce according to quotation and deliver products ready for sale.' : '按报价单生产并交付准备销售的产品。'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="reg-faq-section bg-light">
                <div className="container">
                    <div className="reg-section-header">
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
                            {language === 'th' ? 'ให้เราช่วยดูแลทุกขั้นตอนให้คุณ' : language === 'en' ? 'Let Us Handle Everything For You' : '让我们为您处理一切'}
                        </h2>
                        <p>
                            {language === 'th'
                                ? 'Thai Herb Centers ให้บริการ One Stop Service ครบวงจร ตั้งแต่คิดสูตร ผลิตสินค้า ออกแบบฉลาก จนถึงช่วยดำเนินการจด อย. ลูกค้าเพียงเซ็นชื่อ เราจัดการเอกสารทั้งหมดให้'
                                : language === 'en'
                                ? 'Thai Herb Centers offers complete One Stop Service — from formulation, manufacturing, label design, to FDA registration. You only need to sign; we handle all the paperwork.'
                                : 'Thai Herb Centers提供一站式服务——从配方、制造、标签设计到FDA注册。您只需签名；我们处理所有文件。'}
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
