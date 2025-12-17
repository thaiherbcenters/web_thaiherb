# คู่มือการ Deploy ด้วย Docker บน Linux Server 🐳

## ไฟล์ที่สร้างขึ้น

| ไฟล์ | คำอธิบาย |
|------|----------|
| `Dockerfile` | Multi-stage build สำหรับ build และ serve แอป |
| `nginx.conf` | การตั้งค่า Nginx สำหรับ SPA routing |
| `.dockerignore` | ไฟล์ที่ไม่ต้องการใน Docker image |
| `docker-compose.yml` | สำหรับ deploy ด้วยคำสั่งเดียว |

---

## การติดตั้ง Docker บน Linux Server

### Ubuntu / Debian
```bash
# อัปเดต package
sudo apt update

# ติดตั้ง Docker
sudo apt install -y docker.io docker-compose

# เพิ่ม user เข้า docker group (ไม่ต้องใช้ sudo)
sudo usermod -aG docker $USER

# Logout แล้ว Login ใหม่ หรือรัน:
newgrp docker

# ตรวจสอบการติดตั้ง
docker --version
docker-compose --version
```

### CentOS / RHEL / Rocky Linux
```bash
# ติดตั้ง Docker
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker

# เพิ่ม user เข้า docker group
sudo usermod -aG docker $USER
```

---

## วิธีใช้งาน

---

### วิธีที่ 1: ใช้ Docker Compose (แนะนำ) ✨

```bash
# Build และ Run ในคำสั่งเดียว
docker-compose up -d

# ดู logs
docker-compose logs -f

# หยุด container
docker-compose down
```

---

### วิธีที่ 2: ใช้ Docker โดยตรง

```bash
# Build image
docker build -t thaiherb .

# Run container
docker run -d -p 80:80 --name thaiherb-app thaiherb

# หยุด container
docker stop thaiherb-app

# ลบ container
docker rm thaiherb-app
```

---

## การเข้าถึงเว็บไซต์

หลังจาก run container แล้ว เข้าถึงเว็บได้ที่:
- **Local**: http://localhost
- **Server**: http://[IP-ของ-server]

---

## การ Deploy บน Server

### 1. Upload โปรเจกต์ไปยัง Server
```bash
# ใช้ scp, rsync, หรือ git clone
scp -r ./thaiherb user@server:/path/to/project
```

### 2. SSH เข้า Server และ Build
```bash
ssh user@server
cd /path/to/project
docker-compose up -d --build
```

---

## การเปลี่ยน Port

แก้ไข `docker-compose.yml` หากต้องการใช้ port อื่น:

```yaml
ports:
  - "8080:80"  # เปลี่ยนจาก 80 เป็น 8080
```

---

## การใช้ HTTPS (SSL)

สำหรับ production แนะนำใช้ reverse proxy เช่น:
- **Nginx reverse proxy** + Let's Encrypt
- **Traefik**
- **Cloudflare Tunnel**

---

## คำสั่งที่มีประโยชน์

```bash
# ดู container ที่กำลังทำงาน
docker ps

# ดู logs ของ container
docker logs thaiherb-app

# ดู logs แบบ real-time
docker logs -f thaiherb-app

# เข้าไปใน container
docker exec -it thaiherb-app sh

# ลบ images ที่ไม่ใช้
docker image prune

# Rebuild หลังแก้ไขโค้ด
docker-compose up -d --build
```

---

## เปิด Firewall Port

### Ubuntu (UFW)
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp  # ถ้าใช้ HTTPS
sudo ufw reload
```

### CentOS / RHEL (firewalld)
```bash
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp  # ถ้าใช้ HTTPS
sudo firewall-cmd --reload
```

---

## ให้ Docker รัน Auto Start เมื่อ Reboot

```bash
# ให้ Docker service รันอัตโนมัติ
sudo systemctl enable docker

# ให้ container รันอัตโนมัติ (ถ้าใช้ docker run)
docker update --restart unless-stopped thaiherb-app
```

> **หมายเหตุ**: docker-compose.yml ที่สร้างไว้มี `restart: unless-stopped` อยู่แล้ว

---

## Quick Deploy Commands (สรุปคำสั่งสำหรับ Deploy เร็วๆ)

```bash
# 1. Clone หรือ Upload โปรเจกต์ไป server
git clone <your-repo> /var/www/thaiherb
cd /var/www/thaiherb

# 2. Build และ Run
docker-compose up -d --build

# 3. ตรวจสอบว่าทำงานแล้ว
docker ps
curl http://localhost
```

🎉 **เสร็จสิ้น!** เว็บไซต์พร้อมใช้งานที่ http://[IP-ของ-Server]
