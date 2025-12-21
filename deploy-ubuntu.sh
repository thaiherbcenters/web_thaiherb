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
# 1. ติดตั้ง Docker (ถ้ายังไม่มี)
# =====================================================
if ! command -v docker &> /dev/null; then
    echo "📦 กำลังติดตั้ง Docker..."
    sudo apt update
    sudo apt install -y docker.io docker-compose
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker $USER
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
