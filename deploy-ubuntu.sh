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
# 0.5 กำหนดสิทธิ์ไฟล์ Certs (ป้องกัน Permission Denied ใน Docker)
# =====================================================
if [ -d "certs" ]; then
    echo "🔑 กำลังปรับสิทธิ์ไฟล์ Certificates..."
    sudo chmod 755 certs
    sudo chmod 644 certs/*
    echo "✅ ปรับสิทธิ์เรียบร้อย"
fi

# =====================================================
# 1. เคลียร์ Port 80 (ปิด Nginx, Apache, หรือ Process อื่นๆ)
# =====================================================
echo "🧹 กำลังเคลียร์ Port 80..."

# หยุด Container ใดๆ ก็ตามที่บังอาจแย่ง Port 80 (Dynamic Filter)
PORT_80_CONTAINER=$(sudo docker ps -q --filter "publish=80")
if [ -n "$PORT_80_CONTAINER" ]; then
    echo "🛑 เจอตัวการยึด Port 80 (ID: $PORT_80_CONTAINER)... สั่งลบทันที!"
    sudo docker rm -f $PORT_80_CONTAINER
fi

# หยุด Apache2 ถ้ามี
if systemctl is-active --quiet apache2; then
    echo "🛑 หยุด Apache2..."
    sudo systemctl stop apache2
    sudo systemctl disable apache2
fi

# หยุด Nginx ถ้ามี
if systemctl is-active --quiet nginx; then
    echo "🛑 หยุด Nginx..."
    sudo systemctl stop nginx
    sudo systemctl disable nginx
fi

# ฆ่า Process ที่ยังคา Port 80 อยู่ (Nuclear Option)
if command -v fuser &> /dev/null; then
    sudo fuser -k 80/tcp || true
    echo "✅ ฆ่า Process บน Port 80 เรียบร้อย"
else
    # ถ้าไม่มี fuser ให้ลงเพิ่ม
    sudo apt-get install -y psmisc
    sudo fuser -k 80/tcp || true
    echo "✅ ฆ่า Process บน Port 80 เรียบร้อย (ติดตั้ง psmisc เพิ่ม)"
fi

# =====================================================
# 2. ติดตั้ง Docker (ถ้ายังไม่มี)
# =====================================================
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
    # Start docker anyway to be safe
    sudo systemctl start docker
    sudo systemctl enable docker
fi

# =====================================================
# 2. เปิด Firewall Port 80
# =====================================================
if command -v ufw &> /dev/null; then
    echo "🔓 เปิด Firewall Port 80 และ 443..."
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    echo "✅ เปิด Port 80, 443 เรียบร้อย"
fi

# =====================================================
# 3. Build และ Run Docker Container
# =====================================================
echo "🔨 กำลัง Build Docker Image..."
sudo docker-compose up -d --build

# =====================================================
# 4. ตรวจสอบสถานะ
# =====================================================
echo ""
echo "📊 สถานะ Container:"
sudo docker ps --filter "name=thaiherb"

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
echo "   ดู logs:      sudo docker-compose logs -f"
echo "   หยุด:         sudo docker-compose down"
echo "   รีสตาร์ท:     sudo docker-compose restart"
echo ""
