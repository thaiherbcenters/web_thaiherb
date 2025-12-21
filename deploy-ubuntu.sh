#!/bin/bash

# =====================================================
# ThaiHerb - Ubuntu Server Deploy Script
# =====================================================

set -e  # หยุดทำงานถ้าเกิด error

echo "🚀 เริ่มติดตั้ง ThaiHerb..."

# =====================================================
# 0. ดึง Code ล่าสุดจาก Git
# =====================================================
echo "⬇️  กำลังดึง Code ล่าสุด..."
git pull origin main

# =====================================================
# 1. ปิด Nginx ตัวเก่า (ที่ติดมากับเครื่อง)
# =====================================================
if systemctl is-active --quiet nginx; then
    echo "🛑 ตรวจพบ Nginx ทำงานอยู่... กำลังปิดเพื่อไม่ให้ชนกับ Docker..."
    sudo systemctl stop nginx
    sudo systemctl disable nginx
    echo "✅ ปิด Nginx เรียบร้อย"
fi

# =====================================================
# 2. ติดตั้ง Docker (ถ้ายังไม่มี)
# =====================================================
if ! command -v docker &> /dev/null; then
# =====================================================
# 2. ติดตั้ง Docker (ถ้ายังไม่มี)
# =====================================================
if ! command -v docker &> /dev/null; then
    echo "📦 กำลังติดตั้ง Docker..."
    
    # 2.1 เพิ่ม GPG Key ของ Docker Official
    sudo apt-get update || true # allow update to fail if key missing
    sudo apt-get install -y ca-certificates curl gnupg
    sudo install -m 0755 -d /etc/apt/keyrings
    # ลบ key เก่าถ้ามีเพื่อกัน error
    sudo rm -f /etc/apt/keyrings/docker.gpg
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg

    # 2.2 เพิ่ม Repository
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    # 2.3 ติดตั้ง
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose

    sudo systemctl start docker
    sudo systemctl enable docker
    echo "✅ ติดตั้ง Docker เรียบร้อย"
else
    echo "✅ Docker ติดตั้งแล้ว: $(docker --version)"
fi

# =====================================================
# 2. เปิด Firewall Port 80
# =====================================================
if command -v ufw &> /dev/null; then
    echo "🔓 เปิด Firewall Port 80..."
    sudo ufw allow 80/tcp
    echo "✅ เปิด Port 80 เรียบร้อย"
fi

# =====================================================
# 3. Build และ Run Docker Container
# =====================================================
echo "🔨 กำลัง Build Docker Image..."
docker-compose up -d --build

# =====================================================
# 4. ตรวจสอบสถานะ
# =====================================================
echo ""
echo "📊 สถานะ Container:"
docker ps --filter "name=thaiherb"

echo ""
echo "=============================================="
echo "🎉 Deploy สำเร็จ!"
echo "=============================================="
echo ""
echo "🌐 เข้าเว็บไซต์ได้ที่:"
echo "   - http://localhost"
echo "   - http://$(hostname -I | awk '{print $1}')"
echo ""
echo "📝 คำสั่งที่มีประโยชน์:"
echo "   ดู logs:      docker-compose logs -f"
echo "   หยุด:         docker-compose down"
echo "   รีสตาร์ท:     docker-compose restart"
echo ""
