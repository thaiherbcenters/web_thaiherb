# คู่มือตั้งค่า CI/CD ด้วย GitHub Actions 🚀

## ภาพรวม

เมื่อตั้งค่าเสร็จ:
```
git push → GitHub Actions → Deploy อัตโนมัติ → Server ออนไลน์!
```

---

## ขั้นตอนที่ 1: เตรียม Server (ทำครั้งเดียว)

### 1.1 SSH เข้า Server
```bash
ssh user@your-server-ip
```

### 1.2 ติดตั้ง Docker และ Git
```bash
sudo apt update
sudo apt install -y docker.io docker-compose git
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

### 1.3 Clone โปรเจกต์ครั้งแรก
```bash
sudo mkdir -p /var/www
cd /var/www
sudo git clone https://github.com/YOUR_USERNAME/thaiherb.git
sudo chown -R $USER:$USER /var/www/thaiherb
```

### 1.4 Deploy ครั้งแรก (manual)
```bash
cd /var/www/thaiherb
docker-compose up -d --build
```

---

## ขั้นตอนที่ 2: สร้าง SSH Key สำหรับ GitHub Actions

### 2.1 สร้าง SSH Key บน Server
```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions -N ""
```

### 2.2 เพิ่ม Public Key ใน authorized_keys
```bash
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 2.3 Copy Private Key (เก็บไว้ใช้ในขั้นตอนที่ 3)
```bash
cat ~/.ssh/github_actions
```
⚠️ Copy ทั้งหมดตั้งแต่ `-----BEGIN OPENSSH PRIVATE KEY-----` ถึง `-----END OPENSSH PRIVATE KEY-----`

---

## ขั้นตอนที่ 3: ตั้งค่า GitHub Secrets

1. ไปที่ GitHub Repository ของคุณ
2. Settings → Secrets and variables → Actions → New repository secret

### Secrets ที่ต้องเพิ่ม:

| Secret Name | ค่า | ตัวอย่าง |
|-------------|-----|----------|
| `SERVER_HOST` | IP หรือ Domain ของ Server | `192.168.1.100` หรือ `example.com` |
| `SERVER_USER` | Username SSH | `ubuntu` หรือ `root` |
| `SERVER_SSH_KEY` | Private Key ที่ copy มา | `-----BEGIN OPENSSH PRIVATE KEY----- ...` |
| `SERVER_PORT` | Port SSH (ปกติ 22) | `22` |

---

## ขั้นตอนที่ 4: Push และทดสอบ

```bash
# บนเครื่องคุณ
cd c:\test_ai\thaiherb
git add .
git commit -m "Add CI/CD"
git push origin main
```

### ดูผลลัพธ์:
1. ไปที่ GitHub Repository
2. คลิก **Actions** tab
3. ดู workflow run

---

## 📊 Flow การทำงาน

```
┌─────────────────┐
│   git push      │
│   main branch   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GitHub Actions │
│                 │
│  1. Checkout    │
│  2. SSH to      │
│     Server      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Ubuntu Server  │
│                 │
│  1. git pull    │
│  2. docker-     │
│     compose up  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  ✅ เว็บออนไลน์ │
│  http://IP:80   │
└─────────────────┘
```

---

## 🔧 แก้ไขปัญหาที่พบบ่อย

### Error: Permission denied
```bash
# บน Server - ตรวจสอบสิทธิ์
sudo chown -R $USER:$USER /var/www/thaiherb
```

### Error: Connection refused
```bash
# บน Server - ตรวจสอบ SSH service
sudo systemctl status ssh
sudo systemctl start ssh
```

### Error: docker-compose not found
```bash
# บน Server - ติดตั้ง docker-compose
sudo apt install -y docker-compose
```

---

## 🎉 เสร็จสิ้น!

หลังจากตั้งค่าครบแล้ว ทุกครั้งที่คุณ:
```bash
git push origin main
```

โค้ดจะ deploy ไป server โดยอัตโนมัติภายใน 1-2 นาที! 🚀
