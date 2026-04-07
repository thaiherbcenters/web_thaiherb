import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import './News.css';

// -------------------------------------------------------------
// จัดการวิดีโอ TikTok สำคัญ (เพิ่ม/ลบ Embed Code ใน Array นี้ได้เลย)
// -------------------------------------------------------------
export const TIKTOK_EMBEDS = [
    // ตัวอย่างโค้ดฝัง TikTok (ลบและวางของคุณเองได้เลย)
    `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tawat_88/video/7614461866680651009" data-video-id="7614461866680651009" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@tawat_88" href="https://www.tiktok.com/@tawat_88?refer=embed">@tawat_88</a> กระทรวงสาธารณสุข เชิญบรรยาย โครงการ &#34;พัฒนาศักยภาพบุคลากรด้านการดูแลผู้สูงอายุด้วยนวัตกรรมภูมิปัญญาไทยและสมุนไพรสร้างอาชีพ&#34; <a title="ธวัชรับผลิตสินค้าสมุนไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%98%E0%B8%A7%E0%B8%B1%E0%B8%8A%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#ธวัชรับผลิตสินค้าสมุนไพร</a> <a title="บรรยาย" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%A2%E0%B8%B2%E0%B8%A2?refer=embed">#บรรยาย</a> <a title="สุขภาพ" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E?refer=embed">#สุขภาพ</a> <a title="เกษตร" target="_blank" href="https://www.tiktok.com/tag/%E0%B9%80%E0%B8%81%E0%B8%A9%E0%B8%95%E0%B8%A3?refer=embed">#เกษตร</a> <a title="สมุนไพรไทย" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2?refer=embed">#สมุนไพรไทย</a> <a target="_blank" title="♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร" href="https://www.tiktok.com/music/เสียงต้นฉบับ-ธวัช-รับผลิตสินค้าสมุนไพร-7614462005856652039?refer=embed">♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
    `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tawat_88/video/7582492832296897812" data-video-id="7582492832296897812" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@tawat_88" href="https://www.tiktok.com/@tawat_88?refer=embed">@tawat_88</a> &#34;กว่า350 คน!!&#34; รุ่นที่ 9 อบรมโครงการ &#34;เศรษฐกิจพอเพียง สร้างงาน สร้างอาชีพ สร้างรายได้&#34; ชาวชุมพร <a title="อบรม" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%AD%E0%B8%9A%E0%B8%A3%E0%B8%A1?refer=embed">#อบรม</a> <a title="ธวัชรับบผลิตสินค้าสมุนไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%98%E0%B8%A7%E0%B8%B1%E0%B8%8A%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9A%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#ธวัชรับบผลิตสินค้าสมุนไพร</a> <a title="โรงงานผลิตสมุนไพรที่ได้รับมาตรฐานระดับประเทศ" target="_blank" href="https://www.tiktok.com/tag/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%A1%E0%B8%B2%E0%B8%95%E0%B8%A3%E0%B8%90%E0%B8%B2%E0%B8%99%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8?refer=embed">#โรงงานผลิตสมุนไพรที่ได้รับมาตรฐานระดับประเทศ</a> <a title="รับทำoem" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%97%E0%B8%B3oem?refer=embed">#รับทำOEM</a> <a title="ไทรม้าซอย7นนทบุรี" target="_blank" href="https://www.tiktok.com/tag/%E0%B9%84%E0%B8%97%E0%B8%A3%E0%B8%A1%E0%B9%89%E0%B8%B2%E0%B8%8B%E0%B8%AD%E0%B8%A27%E0%B8%99%E0%B8%99%E0%B8%97%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5?refer=embed">#ไทรม้าซอย7นนทบุรี</a> <a target="_blank" title="♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร" href="https://www.tiktok.com/music/เสียงต้นฉบับ-ธวัช-รับผลิตสินค้าสมุนไพร-7582492910768950023?refer=embed">♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
    `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tawat_88/video/7605941177765989633" data-video-id="7605941177765989633" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@tawat_88" href="https://www.tiktok.com/@tawat_88?refer=embed">@tawat_88</a> รักบริษัทได้อะไร? ได้ยาดม! แบบพี่ๆพนักงานที่เมืองทอง!    <a title="valentine" target="_blank" href="https://www.tiktok.com/tag/valentine?refer=embed">#Valentine</a> <a title="พนักงาน" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%9E%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99?refer=embed">#พนักงาน</a> <a title="สมุนไพรไทย" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2?refer=embed">#สมุนไพรไทย</a> <a title="ธวัชรับผลิตสินค้าสมุนไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%98%E0%B8%A7%E0%B8%B1%E0%B8%8A%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#ธวัชรับผลิตสินค้าสมุนไพร</a> <a title="เมืองทอง" target="_blank" href="https://www.tiktok.com/tag/%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%AD%E0%B8%87?refer=embed">#เมืองทอง</a> <a target="_blank" title="♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร" href="https://www.tiktok.com/music/เสียงต้นฉบับ-ธวัช-รับผลิตสินค้าสมุนไพร-7605941376619268882?refer=embed">♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
    `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tawat_88/video/7599238880017108244" data-video-id="7599238880017108244" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@tawat_88" href="https://www.tiktok.com/@tawat_88?refer=embed">@tawat_88</a> &#34;ไทยเฮิร์บเซ็นเตอร์ แปลงเกษตรต้นแบบมุ่งสู่มาตรฐาน จีเอพี&#34;  <a title="มาตรฐานระดับสากล" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%A1%E0%B8%B2%E0%B8%95%E0%B8%A3%E0%B8%90%E0%B8%B2%E0%B8%99%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B1%E0%B8%9A%E0%B8%AA%E0%B8%B2%E0%B8%81%E0%B8%A5?refer=embed">#มาตรฐานระดับสากล</a> <a title="แปลงเกษตรกร" target="_blank" href="https://www.tiktok.com/tag/%E0%B9%81%E0%B8%9B%E0%B8%A5%E0%B8%87%E0%B9%80%E0%B8%81%E0%B8%A9%E0%B8%95%E0%B8%A3%E0%B8%81%E0%B8%A3?refer=embed">#แปลงเกษตรกร</a> <a title="ธวัชรับผลิตสินค้าสมุนไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%98%E0%B8%A7%E0%B8%B1%E0%B8%8A%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#ธวัชรับผลิตสินค้าสมุนไพร</a> #ยกระดับสมุนไพรไทย <a title="ขมิ้นชัน" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%82%E0%B8%A1%E0%B8%B4%E0%B9%89%E0%B8%99%E0%B8%8A%E0%B8%B1%E0%B8%99?refer=embed">#ขมิ้นชัน</a> <a target="_blank" title="♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร" href="https://www.tiktok.com/music/เสียงต้นฉบับ-ธวัช-รับผลิตสินค้าสมุนไพร-7599239232862849799?refer=embed">♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
    `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tawat_88/video/7595448977563176213" data-video-id="7595448977563176213" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@tawat_88" href="https://www.tiktok.com/@tawat_88?refer=embed">@tawat_88</a> &#34;อายุเป็นเพียงตัวเลข แต่สุขภาพที่ดีเราสร้างเองได้  อยากอายุยืนต้องกินขมิ้นชัน“  <a title="ขมิ้นชัน" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%82%E0%B8%A1%E0%B8%B4%E0%B9%89%E0%B8%99%E0%B8%8A%E0%B8%B1%E0%B8%99?refer=embed">#ขมิ้นชัน</a> <a title="ธวัชรับผลิตสินค้าสมุนไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%98%E0%B8%A7%E0%B8%B1%E0%B8%8A%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#ธวัชรับผลิตสินค้าสมุนไพร</a> <a title="สมุนไพรไทย" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2?refer=embed">#สมุนไพรไทย</a> <a title="แม่ลาว" target="_blank" href="https://www.tiktok.com/tag/%E0%B9%81%E0%B8%A1%E0%B9%88%E0%B8%A5%E0%B8%B2%E0%B8%A7?refer=embed">#แม่ลาว</a> <a title="เชียงราย" target="_blank" href="https://www.tiktok.com/tag/%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B8%A3%E0%B8%B2%E0%B8%A2?refer=embed">#เชียงราย</a> <a target="_blank" title="♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร" href="https://www.tiktok.com/music/เสียงต้นฉบับ-ธวัช-รับผลิตสินค้าสมุนไพร-7595449051982695176?refer=embed">♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
    `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tawat_88/video/7593767953909304594" data-video-id="7593767953909304594" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@tawat_88" href="https://www.tiktok.com/@tawat_88?refer=embed">@tawat_88</a> ก้าวสู่ปีที่ 49 : The Bloomer for All” งานเฉลิมฉลองวาระสำคัญแห่งการก้าวสู่ปีที่ 49 ของมติชน ภายใต้แนวคิด การผลิบาน เพื่อทุกคน เติบโตไปด้วยกัน      คุณธวัช จรุงพิรวงค์ ประธานวิสาหกิจชุมชนไทย เฮิร์บ เซ็นเตอร์ และคุณณัฐกิตติ์ จรุงพิรวงค์ ประธานวิสาหกิจชุมชน ไทย เฮิร์บ ซิตี้  ได้รับเกียรติจากมติชน ร่วมเป็นส่วนหนึ่งของการเริ่มต้นปีที่ 49 ไปด้วยกัน <a title="มติชน49ปี" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%A1%E0%B8%95%E0%B8%B4%E0%B8%8A%E0%B8%9949%E0%B8%9B%E0%B8%B5?refer=embed">#มติชน49ปี</a> <a title="ร่วมเเสดงความยินดี" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%A3%E0%B9%88%E0%B8%A7%E0%B8%A1%E0%B9%80%E0%B9%80%E0%B8%AA%E0%B8%94%E0%B8%87%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A2%E0%B8%B4%E0%B8%99%E0%B8%94%E0%B8%B5?refer=embed">#ร่วมเเสดงความยินดี</a> <a title="วิสาหกิจชุมชนไทยเฮิร์บเซ็นเตอร์" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%A7%E0%B8%B4%E0%B8%AA%E0%B8%B2%E0%B8%AB%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%8A%E0%B8%B8%E0%B8%A1%E0%B8%8A%E0%B8%99%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B9%80%E0%B8%AE%E0%B8%B4%E0%B8%A3%E0%B9%8C%E0%B8%9A%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C?refer=embed">#วิสาหกิจชุมชนไทยเฮิร์บเซ็นเตอร์</a> <a title="thebloomerforall" target="_blank" href="https://www.tiktok.com/tag/thebloomerforall?refer=embed">#thebloomerforall</a> <a title="มติชน" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%A1%E0%B8%95%E0%B8%B4%E0%B8%8A%E0%B8%99?refer=embed">#มติชน</a> <a target="_blank" title="♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร" href="https://www.tiktok.com/music/เสียงต้นฉบับ-ธวัช-รับผลิตสินค้าสมุนไพร-7593768017910369032?refer=embed">♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
    `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tawat_88/video/7513816440227515654" data-video-id="7513816440227515654" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@tawat_88" href="https://www.tiktok.com/@tawat_88?refer=embed">@tawat_88</a> เราขอส่งกำลังใจให้พี่น้องทหารไทยปลอดภัยทุกคน <a title="ธวัชรับผลิตสมุนไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%98%E0%B8%A7%E0%B8%B1%E0%B8%8A%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#ธวัชรับผลิตสมุนไพร</a> <a title="thaiherbcenter" target="_blank" href="https://www.tiktok.com/tag/thaiherbcenter?refer=embed">#ThaiHerbCenter</a> <a title="เจ้าของแบรนด์" target="_blank" href="https://www.tiktok.com/tag/%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B9%81%E0%B8%9A%E0%B8%A3%E0%B8%99%E0%B8%94%E0%B9%8C?refer=embed">#เจ้าของแบรนด์</a> <a title="โรงงานผลิตสินค้าสมุนไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#โรงงานผลิตสินค้าสมุนไพร</a> <a title="ซุปเปอร์ริช" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%8B%E0%B8%B8%E0%B8%9B%E0%B9%80%E0%B8%9B%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%A3%E0%B8%B4%E0%B8%8A?refer=embed">#ซุปเปอร์ริช</a> <a title="ข่าวtiktok" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%82%E0%B9%88%E0%B8%B2%E0%B8%A7tiktok?refer=embed">#ข่าวtiktok</a> <a target="_blank" title="♬ Emotional Inspiring Music - BeardMusicStock" href="https://www.tiktok.com/music/Emotional-Inspiring-Music-7448294692755392548?refer=embed">♬ Emotional Inspiring Music - BeardMusicStock</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
    `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tawat_88/video/7486129754697927954" data-video-id="7486129754697927954" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@tawat_88" href="https://www.tiktok.com/@tawat_88?refer=embed">@tawat_88</a> <a title="กำลังใจทีดี" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%81%E0%B8%B3%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B9%83%E0%B8%88%E0%B8%97%E0%B8%B5%E0%B8%94%E0%B8%B5?refer=embed">#กำลังใจทีดี</a><a title="สมุนไพรไทยทีดี" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%97%E0%B8%B5%E0%B8%94%E0%B8%B5?refer=embed">#สมุนไพรไทยทีดี</a><a title="สมุนไพรผลไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3%E0%B8%9C%E0%B8%A5%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#สมุนไพรผลไพร</a><a title="ผลไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%9C%E0%B8%A5%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#ผลไพร</a> <a target="_blank" title="♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร" href="https://www.tiktok.com/music/เสียงต้นฉบับ-ธวัช-รับผลิตสินค้าสมุนไพร-7486129788785822481?refer=embed">♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
    `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tawat_88/video/7484804547014102290" data-video-id="7484804547014102290" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@tawat_88" href="https://www.tiktok.com/@tawat_88?refer=embed">@tawat_88</a> สเปรย์น้ำมันนวดสมุนไพร ตรา ผลไพร ใส่ใจให้คนที่คุณรัก <a title="สมุนไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#สมุนไพร</a> <a title="สมุนไพรไทย" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2?refer=embed">#สมุนไพรไทย</a> <a title="ไทยเฮิร์บเซ็นเตอร์" target="_blank" href="https://www.tiktok.com/tag/%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B9%80%E0%B8%AE%E0%B8%B4%E0%B8%A3%E0%B9%8C%E0%B8%9A%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C?refer=embed">#ไทยเฮิร์บเซ็นเตอร์</a> <a title="thaiherbcenter" target="_blank" href="https://www.tiktok.com/tag/thaiherbcenter?refer=embed">#thaiherbcenter</a> <a title="ผลไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%9C%E0%B8%A5%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#ผลไพร</a> <a title="สเปรย์นวด" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%AA%E0%B9%80%E0%B8%9B%E0%B8%A3%E0%B8%A2%E0%B9%8C%E0%B8%99%E0%B8%A7%E0%B8%94?refer=embed">#สเปรย์นวด</a> <a title="ออฟฟิศซินโดรม" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%AD%E0%B8%AD%E0%B8%9F%E0%B8%9F%E0%B8%B4%E0%B8%A8%E0%B8%8B%E0%B8%B4%E0%B8%99%E0%B9%82%E0%B8%94%E0%B8%A3%E0%B8%A1?refer=embed">#ออฟฟิศซินโดรม</a> <a title="สุขภาพดี" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%94%E0%B8%B5?refer=embed">#สุขภาพดี</a> <a target="_blank" title="♬ Acoustic Guitar Peaceful - Cassiopeia" href="https://www.tiktok.com/music/Acoustic-Guitar-Peaceful-7378256289557006377?refer=embed">♬ Acoustic Guitar Peaceful - Cassiopeia</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
    `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tawat_88/video/7474049043652693303" data-video-id="7474049043652693303" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@tawat_88" href="https://www.tiktok.com/@tawat_88?refer=embed">@tawat_88</a> <a title="อนาคตของชาติ" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%AD%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%95%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4?refer=embed">#อนาคตของชาติ</a><a title="ทุกศาสนาสอนให้คนทำดี" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%97%E0%B8%B8%E0%B8%81%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%99%E0%B8%B2%E0%B8%AA%E0%B8%AD%E0%B8%99%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%84%E0%B8%99%E0%B8%97%E0%B8%B3%E0%B8%94%E0%B8%B5?refer=embed">#ทุกศาสนาสอนให้คนทำดี</a><a title="ผลไพรพร้อมสนับสนุนเรื่องการศึกษา" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%9C%E0%B8%A5%E0%B9%84%E0%B8%9E%E0%B8%A3%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%AA%E0%B8%99%E0%B8%B1%E0%B8%9A%E0%B8%AA%E0%B8%99%E0%B8%B8%E0%B8%99%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2?refer=embed">#ผลไพรพร้อมสนับสนุนเรื่องการศึกษา</a><a title="ผลไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%9C%E0%B8%A5%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#ผลไพร</a> <a target="_blank" title="♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร" href="https://www.tiktok.com/music/เสียงต้นฉบับ-ธวัช-รับผลิตสินค้าสมุนไพร-7474049062367497015?refer=embed">♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
    `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tawat_88/video/7423770726466964756" data-video-id="7423770726466964756" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@tawat_88" href="https://www.tiktok.com/@tawat_88?refer=embed">@tawat_88</a> <a title="อบรมแปรรูปสมุนไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%AD%E0%B8%9A%E0%B8%A3%E0%B8%A1%E0%B9%81%E0%B8%9B%E0%B8%A3%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#อบรมแปรรูปสมุนไพร</a><a title="คณะพยาบาลศาสตร์เกื้อการุณย์" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%84%E0%B8%93%E0%B8%B0%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C%E0%B9%80%E0%B8%81%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%B8%E0%B8%93%E0%B8%A2%E0%B9%8C?refer=embed">#คณะพยาบาลศาสตร์เกื้อการุณย์</a><a title="มหาวิทยาลัยนวมินทราธิราช" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B8%99%E0%B8%A7%E0%B8%A1%E0%B8%B4%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B2%E0%B8%98%E0%B8%B4%E0%B8%A3%E0%B8%B2%E0%B8%8A?refer=embed">#มหาวิทยาลัยนวมินทราธิราช</a><a title="โรงงานผลิตสมุนไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#โรงงานผลิตสมุนไพร</a><a title="รับผลิตสมุนไพร🐥🐥🐥" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3%F0%9F%90%A5%F0%9F%90%A5%F0%9F%90%A5?refer=embed">#รับผลิตสมุนไพร🐥🐥🐥</a> <a target="_blank" title="♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร" href="https://www.tiktok.com/music/เสียงต้นฉบับ-ธวัช-รับผลิตสินค้าสมุนไพร-7423770776240655105?refer=embed">♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
    `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tawat_88/video/7383886319941848337" data-video-id="7383886319941848337" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@tawat_88" href="https://www.tiktok.com/@tawat_88?refer=embed">@tawat_88</a> <a title="กรมแพทย์แผนไทย" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B9%81%E0%B8%9E%E0%B8%97%E0%B8%A2%E0%B9%8C%E0%B9%81%E0%B8%9C%E0%B8%99%E0%B9%84%E0%B8%97%E0%B8%A2?refer=embed">#กรมแพทย์แผนไทย</a><a title="อบรมการนวดแผนไทย" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%AD%E0%B8%9A%E0%B8%A3%E0%B8%A1%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%99%E0%B8%A7%E0%B8%94%E0%B9%81%E0%B8%9C%E0%B8%99%E0%B9%84%E0%B8%97%E0%B8%A2?refer=embed">#อบรมการนวดแผนไทย</a><a title="รุ่น" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%A3%E0%B8%B8%E0%B9%88%E0%B8%99?refer=embed">#รุ่น</a> ” นหารู“<a title="ธวัช" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%98%E0%B8%A7%E0%B8%B1%E0%B8%8A?refer=embed">#ธวัช</a> <a target="_blank" title="♬ เสียงต้นฉบับ - ธวัช ผลไพร - ธวัช รับผลิตสินค้าสมุนไพร" href="https://www.tiktok.com/music/เสียงต้นฉบับ-ธวัช-ผลไพร-7383886368180636432?refer=embed">♬ เสียงต้นฉบับ - ธวัช ผลไพร - ธวัช รับผลิตสินค้าสมุนไพร</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
    `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tawat_88/video/7376637856611126535" data-video-id="7376637856611126535" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@tawat_88" href="https://www.tiktok.com/@tawat_88?refer=embed">@tawat_88</a> บรรยากาศงานอบรบธาตุทั่ง4กับกรมแพทย์แผนไทยครับ🏞️🌿 <a title="ผลไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%9C%E0%B8%A5%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#ผลไพร</a> <a title="softpowerthailand" target="_blank" href="https://www.tiktok.com/tag/softpowerthailand?refer=embed">#softpowerthailand</a> <a title="นวดไทย" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%99%E0%B8%A7%E0%B8%94%E0%B9%84%E0%B8%97%E0%B8%A2?refer=embed">#นวดไทย</a> <a title="กรมแพทย์แผนไทย" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B9%81%E0%B8%9E%E0%B8%97%E0%B8%A2%E0%B9%8C%E0%B9%81%E0%B8%9C%E0%B8%99%E0%B9%84%E0%B8%97%E0%B8%A2?refer=embed">#กรมแพทย์แผนไทย</a> <a title="สมุนไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#สมุนไพร</a> <a target="_blank" title="♬ we had everything... - Casey Lowry" href="https://www.tiktok.com/music/we-had-everything-7031781876045973506?refer=embed">♬ we had everything... - Casey Lowry</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
    `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tawat_88/video/7365887815378308359" data-video-id="7365887815378308359" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@tawat_88" href="https://www.tiktok.com/@tawat_88?refer=embed">@tawat_88</a> ก้าวทันโลจิสติกส์ ผลักดันสมุนไพรไทยไปไกลสู่ตลาดโลก🗺️🌿กับมหาลัยหอการค้าครับ🎖️ต้องขอบคุณมากๆที่ให้โอกาสผลไพร🏵️✨<a title="ผลไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%9C%E0%B8%A5%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#ผลไพร</a> <a title="thaiherb" target="_blank" href="https://www.tiktok.com/tag/thaiherb?refer=embed">#thaiherb</a> <a title="รางวัล" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%A7%E0%B8%B1%E0%B8%A5?refer=embed">#รางวัล</a> <a title="หอการค้า" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%AB%E0%B8%AD%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%84%E0%B9%89%E0%B8%B2?refer=embed">#หอการค้า</a> <a title="งาน" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%87%E0%B8%B2%E0%B8%99?refer=embed">#งาน</a> <a target="_blank" title="♬ เพราะใจ (Pre Hook) - วรรธนา วีรยวรรธน" href="https://www.tiktok.com/music/เพราะใจ-Pre-Hook-7281585191205652481?refer=embed">♬ เพราะใจ (Pre Hook) - วรรธนา วีรยวรรธน</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
    `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tawat_88/video/7546196952153722133" data-video-id="7546196952153722133" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@tawat_88" href="https://www.tiktok.com/@tawat_88?refer=embed">@tawat_88</a> สร้างงามสร้างอาชีพแก่พี่น้องชาวภูเก็ต <a title="ธวัชรับผลิตสมุนไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%98%E0%B8%A7%E0%B8%B1%E0%B8%8A%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#ธวัชรับผลิตสมุนไพร</a> <a title="สมุนไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#สมุนไพร</a> <a title="โรงงานผลิตสินค้าสมุนไพร" target="_blank" href="https://www.tiktok.com/tag/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B9%84%E0%B8%9E%E0%B8%A3?refer=embed">#โรงงานผลิตสินค้าสมุนไพร</a> <a title="ไทยเฮิร์บเซ็นเตอร์" target="_blank" href="https://www.tiktok.com/tag/%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B9%80%E0%B8%AE%E0%B8%B4%E0%B8%A3%E0%B9%8C%E0%B8%9A%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C?refer=embed">#ไทยเฮิร์บเซ็นเตอร์</a> <a title="ไทยเฮิร์บเซ็นเตอร์" target="_blank" href="https://www.tiktok.com/tag/%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B9%80%E0%B8%AE%E0%B8%B4%E0%B8%A3%E0%B9%8C%E0%B8%9A%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C?refer=embed">#ไทยเฮิร์บเซ็นเตอร์</a> <a target="_blank" title="♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร" href="https://www.tiktok.com/music/เสียงต้นฉบับ-ธวัช-รับผลิตสินค้าสมุนไพร-7546196986668583696?refer=embed">♬ เสียงต้นฉบับ  - ธวัช รับผลิตสินค้าสมุนไพร</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`
];

const TikTokEmbedBlock = ({ htmlString }) => {
    // ดึง Video ID ออกมาจาก Embed Code
    const match = htmlString.match(/data-video-id="(\d+)"/);
    const videoId = match ? match[1] : null;

    if (!videoId) {
        // Fallback: ถ้าหา ID ไม่เจอ ให้ลองใช้โค้ดเดิมแบบตรงๆ
        return (
            <div 
                className="tiktok-embed-wrapper"
                dangerouslySetInnerHTML={{ __html: htmlString }} 
                style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '325px', overflow: 'hidden', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
        );
    }

    // ใช้วิธีฝังผ่าน Iframe โดยตรง (เวิร์ค 100% ใน React)
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '325px', height: '575px', overflow: 'hidden', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', background: '#000' }}>
            <iframe 
                src={`https://www.tiktok.com/embed/v2/${videoId}`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allowFullScreen
                scrolling="no"
                allow="encrypted-media;"
            ></iframe>
        </div>
    );
};

const News = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const initialTab = new URLSearchParams(window.location.search).get('tab') || 'all';
    const [filter, setFilter] = useState(initialTab); // 'all', 'video', 'photo'
    const [activePost, setActivePost] = useState(null); // stores the entire post object
    const [activeImageIndex, setActiveImageIndex] = useState(0); // index for photo gallery
    const { t, language } = useTranslation();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // If you host backend on different port or domain, you might need exact URL
                // e.g. /api/news during dev (Vite proxy handles it)
                const backendUrl = import.meta.env.VITE_API_URL || '';
                const response = await fetch(`${backendUrl}/api/news`);
                const data = await response.json();
                
                if (data.status === 'success') {
                    setPosts(data.data);
                } else {
                    throw new Error('Failed to load news');
                }
            } catch (err) {
                console.error("Error fetching news:", err);
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('th-TH', options);
    };

    return (
        <div className="news-page">
            <div className="news-header">
                <h1>{t('navbar.news')}</h1>
                <p className="news-subtitle">
                    {language === 'th' ? 'เกาะติดทุกความเคลื่อนไหว และอัปเดตข่าวสารล่าสุดจาก Thai Herb Centers'
                        : language === 'en' ? 'Stay tuned for all the latest updates and news from Thai Herb Centers'
                            : '随时了解泰国草药中心的最新动态和新闻'}
                </p>
                <div className="header-line"></div>
            </div>

            {loading ? (
                <div className="news-container">
                    <div className="skeleton-hero"></div>
                    <div className="news-grid">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="skeleton-card">
                                <div className="skeleton-img"></div>
                                <div className="skeleton-content">
                                    <div className="skeleton-text short"></div>
                                    <div className="skeleton-text"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : error ? (
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h3>{language === 'th' ? 'ไม่สามารถโหลดข่าวสารได้ในขณะนี้' : language === 'en' ? 'Unable to load news at this time' : '目前无法加载新闻'}</h3>
                    <p>{error}</p>
                </div>
            ) : posts.length === 0 ? (
                <div className="empty-container">
                    <h3>{language === 'th' ? 'ยังไม่มีข่าวสารใหม่' : language === 'en' ? 'No new news yet' : '暂无最新新闻'}</h3>
                    <p>{language === 'th' ? 'ติดตามเพจของเราเพื่อรับข่าวสารล่าสุด' : language === 'en' ? 'Follow our page for the latest updates' : '关注我们的主页获取最新动态'}</p>
                </div>
            ) : (() => {
                const filteredPosts = posts.filter(post => {
                    if (filter === 'video') return post.isVideo;
                    if (filter === 'photo') return !post.isVideo;
                    return true;
                });

                return (
                <>
                {/* Custom Tabs */}
                <div className="news-tabs">
                    <button className={`news-tab-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
                        {t('navbar.news')} {language === 'th' ? 'ทั้งหมด' : language === 'en' ? 'All' : '全部'}
                    </button>
                    <button className={`news-tab-btn ${filter === 'video' ? 'active' : ''}`} onClick={() => setFilter('video')}>
                        {language === 'th' ? 'วิดีโอคลิป' : language === 'en' ? 'Video Clips' : '视频'}
                    </button>
                    <button className={`news-tab-btn ${filter === 'photo' ? 'active' : ''}`} onClick={() => setFilter('photo')}>
                        {language === 'th' ? 'รูปภาพ/บทความ' : language === 'en' ? 'Photos & Articles' : '照片/文章'}
                    </button>
                </div>



                {filteredPosts.length === 0 ? (
                    <div className="empty-container">
                        <h3>{language === 'th' ? 'ไม่พบโพสต์ในหมวดหมู่นี้' : language === 'en' ? 'No posts found in this category' : '未找到该类别的帖子'}</h3>
                        <p>{language === 'th' ? 'ลองเปลี่ยนหมวดหมู่เพื่อดูข่าวสารเพิ่มเติมครับ' : language === 'en' ? 'Try changing categories to see more news' : '尝试更改类别以查看更多新闻'}</p>
                    </div>
                ) : (
                <div className="news-container">
                    {/* Featured / Hero News */}
                    <div className="featured-news-card">
                        <div className="featured-image-wrapper" onClick={() => { setActivePost(filteredPosts[0]); setActiveImageIndex(0); }} style={{ cursor: 'pointer' }}>
                            {filteredPosts[0].full_picture ? (
                                <img src={filteredPosts[0].full_picture} alt="Featured News" className="featured-image" />
                            ) : (
                                <div className="featured-image placeholder">
                                    <span>THAI HERB CENTERS</span>
                                </div>
                            )}
                            {filteredPosts[0].isVideo && (
                                <div className="video-indicator-large">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            )}
                            {!filteredPosts[0].isVideo && <div className="news-badge">{language === 'th' ? 'ข่าวล่าสุด' : language === 'en' ? 'Latest' : '最新'}</div>}
                        </div>
                        <div className="featured-content">
                            <div className="news-meta">
                                <span className="news-date">{formatDate(filteredPosts[0].created_time)}</span>
                                <span className="facebook-source">
                                    <svg className="fb-icon-small" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    {language === 'th' ? 'โพสต์จากเพจ' : language === 'en' ? 'Facebook Post' : 'Facebook 帖子'}
                                </span>
                            </div>
                            <h2 className="featured-message">
                                {filteredPosts[0].message ? (filteredPosts[0].message.length > 120 ? filteredPosts[0].message.substring(0, 120) + '...' : filteredPosts[0].message) : (language === 'th' ? 'อัปเดตกิจกรรมและข่าวสารจากหน้าเพจอย่างเป็นทางการ' : language === 'en' ? 'Official news and updates from our page' : '来自官方页面的活动的更新')}
                            </h2>
                            <p className="featured-excerpt">
                                {filteredPosts[0].message && filteredPosts[0].message.length > 120 ? filteredPosts[0].message.substring(120, 280) + '...' : ''}
                            </p>
                            <a href={filteredPosts[0].permalink_url} target="_blank" rel="noopener noreferrer" className="read-more-btn" style={{ textDecoration: 'none' }}>
                                {language === 'th' ? 'ดูต้นฉบับบน Facebook' : language === 'en' ? 'View on Facebook' : '在 Facebook 上查看'} <span className="arrow">→</span>
                            </a>
                        </div>
                    </div>

                    {/* TikTok Important Videos Section - Carousel */}
                    {(filter === 'video' || filter === 'all') && TIKTOK_EMBEDS.length > 0 && (() => {
                        const scrollRef = React.createRef();
                        const scrollLeft = () => { if (scrollRef.current) scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' }); };
                        const scrollRight = () => { if (scrollRef.current) scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' }); };
                        return (
                        <div className="important-videos-section" style={{ padding: '0 20px', marginTop: '40px', marginBottom: '40px' }}>
                            <div className="news-section-title" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '40px', height: '4px', backgroundColor: '#e2434b', borderRadius: '2px' }}></div>
                                    <h3 style={{ margin: 0, color: '#111', fontSize: '1.5rem' }}>
                                        {language === 'th' ? 'วิดีโอสำคัญ' : language === 'en' ? 'Important Videos' : '重要视频'}
                                    </h3>
                                    <span style={{ color: '#888', fontSize: '0.9rem', marginLeft: '8px' }}>({TIKTOK_EMBEDS.length} {language === 'th' ? 'คลิป' : 'clips'})</span>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button onClick={scrollLeft} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #ddd', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#333', transition: 'all 0.2s' }} onMouseEnter={e => { e.target.style.background = '#10b981'; e.target.style.color = '#fff'; e.target.style.borderColor = '#10b981'; }} onMouseLeave={e => { e.target.style.background = '#fff'; e.target.style.color = '#333'; e.target.style.borderColor = '#ddd'; }}>❮</button>
                                    <button onClick={scrollRight} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #ddd', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#333', transition: 'all 0.2s' }} onMouseEnter={e => { e.target.style.background = '#10b981'; e.target.style.color = '#fff'; e.target.style.borderColor = '#10b981'; }} onMouseLeave={e => { e.target.style.background = '#fff'; e.target.style.color = '#333'; e.target.style.borderColor = '#ddd'; }}>❯</button>
                                </div>
                            </div>
                            <div ref={scrollRef} className="tiktok-carousel" style={{ display: 'flex', gap: '16px', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', paddingBottom: '16px', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                                {TIKTOK_EMBEDS.map((embedHtml, index) => (
                                    <div key={`tiktok-${index}`} style={{ flex: '0 0 auto', scrollSnapAlign: 'start' }}>
                                        <TikTokEmbedBlock htmlString={embedHtml} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        );
                    })()}

                    {filteredPosts.length > 1 && (
                        <>
                            <div className="news-section-title">
                                <h3>{language === 'th' ? 'ข่าวสารอื่นๆ' : language === 'en' ? 'Other News' : '其他新闻'}</h3>
                            </div>
                            <div className="news-grid">
                                {filteredPosts.slice(1).map((post) => (
                                    <div key={post.id} className="grid-news-card">
                                        <div className="grid-image-wrapper" onClick={() => { setActivePost(post); setActiveImageIndex(0); }} style={{ cursor: 'pointer' }}>
                                            {post.full_picture ? (
                                                <img src={post.full_picture} alt="News thumbnail" className="grid-image" loading="lazy" />
                                            ) : (
                                                <div className="grid-image placeholder">THAI HERB</div>
                                            )}
                                            {post.isVideo && (
                                                <div className="video-indicator-small">
                                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {!post.isVideo && (
                                                <div className="hover-overlay-link" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                                                    <div className="hover-overlay">
                                                        <span>{language === 'th' ? 'ดูรูปภาพ' : language === 'en' ? 'View Image' : '查看图片'}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="grid-content">
                                            <div className="news-meta">
                                                <span className="news-date">{formatDate(post.created_time)}</span>
                                            </div>
                                            <p className="grid-message">
                                                {post.message ? (post.message.length > 130 ? post.message.substring(0, 130) + '...' : post.message) : (language === 'th' ? 'ไม่มีข้อความ...' : language === 'en' ? 'No text...' : '没有文字...')}
                                            </p>
                                            <a href={post.permalink_url} target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', paddingTop: '15px', color: '#10b981', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                {language === 'th' ? 'ดูต้นฉบับ' : language === 'en' ? 'View Original' : '查看原贴'} <span style={{ fontSize: '1.2rem' }}>→</span>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                )}

                {/* Video / Photo Gallery Modal Split Layout */}
                {activePost && (
                    <div className="video-modal-overlay" onClick={() => setActivePost(null)}>
                        <div className="video-modal-content split-layout" onClick={(e) => e.stopPropagation()}>
                            <button className="video-modal-close" onClick={() => setActivePost(null)}>✕</button>
                            
                            <div className="modal-left-video">
                                {activePost.isVideo ? (
                                    <iframe 
                                        src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(activePost.permalink_url)}&show_text=false`} 
                                        style={{ border: 'none', overflow: 'hidden', width: '100%', height: '100%' }} 
                                        scrolling="no" 
                                        frameBorder="0" 
                                        allowFullScreen={true} 
                                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                                    </iframe>
                                ) : activePost.images && activePost.images.length > 0 ? (
                                    <div className="modal-gallery-container">
                                        <img key={activeImageIndex} src={activePost.images[activeImageIndex]} alt="Gallery view" className="modal-gallery-image" />
                                        
                                        {activePost.images.length > 1 && (
                                            <>
                                                <button className="gallery-nav-btn prev" onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => prev === 0 ? activePost.images.length - 1 : prev - 1); }}>
                                                    ❮
                                                </button>
                                                <button className="gallery-nav-btn next" onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => prev === activePost.images.length - 1 ? 0 : prev + 1); }}>
                                                    ❯
                                                </button>
                                                <div className="gallery-indicators">
                                                    {activePost.images.map((_, idx) => (
                                                        <span 
                                                            key={idx} 
                                                            className={`gallery-dot ${idx === activeImageIndex ? 'active' : ''}`} 
                                                            onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                                                        ></span>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                                        {language === 'th' ? 'ไม่มีรูปภาพ หรือวิดีโอ' : language === 'en' ? 'No images or videos' : '没有图片或视频'}
                                    </div>
                                )}
                            </div>
                            
                            <div className="modal-right-caption">
                                <div className="modal-author-header">
                                    <div className="modal-author-avatar">
                                        <img src="/logo-icon.png" alt="Thai Herb Centers" />
                                    </div>
                                    <div className="modal-author-info">
                                        <h4>Thai Herb Centers</h4>
                                        <span>{formatDate(activePost.created_time)}</span>
                                    </div>
                                </div>
                                <div className="modal-caption-text">
                                    {activePost.message || (language === 'th' ? 'ติดตามเรื่องราวและความเคลื่อนไหวล่าสุดจากเพจ Thai Herb Centers ได้ที่นี่' : language === 'en' ? 'Follow the latest stories and updates from the Thai Herb Centers page here' : '在此处关注泰国草药中心主页的最新故事和动态')}
                                </div>
                                <a href={activePost.permalink_url} target="_blank" rel="noopener noreferrer" className="modal-fb-btn">
                                    {language === 'th' ? 'เปิดใน Facebook' : language === 'en' ? 'Open in Facebook' : '在 Facebook 打开'}
                                </a>
                            </div>
                        </div>
                    </div>
                )}
                </>
                );
            })()}
        </div>
    );
};

export default News;
