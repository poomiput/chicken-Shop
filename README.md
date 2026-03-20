# 🍗 Chicken Shop — Static Website

> ไก่ทอดกรอบ อร่อย ส่งไว

เว็บไซต์ร้านไก่ทอด **Chicken Shop** สร้างขึ้นเพื่อใช้ในรายวิชา **Computer System Engineering & System Administration** เน้นการเรียนรู้ด้านการ deploy, การจัดการเซิร์ฟเวอร์ และ Git-based workflow

---

## 📋 จุดประสงค์ของโปรเจกต์

เว็บนี้ใช้เป็น **ตัวกลาง (demo application)** สำหรับสาธิตเรื่อง:

- การ deploy เว็บไซต์บน **Ubuntu + Nginx**
- การจัดการไฟล์ด้วย **Git** และ **GitHub**
- การทำงานเป็นทีมผ่าน **branch** และ **pull request**
- การอัปเดตเว็บไซต์ผ่าน **deployment workflow**
- ตัวอย่างของ **system administration** และ **configuration management**

---

## 🛠 เทคโนโลยีที่ใช้

| เทคโนโลยี | รายละเอียด |
|-----------|-----------|
| HTML5 | โครงสร้างหน้าเว็บ |
| CSS3 | จัดรูปแบบและ responsive design |
| JavaScript | ฟังก์ชันพื้นฐาน (scroll, alert) |
| Google Fonts | ฟอนต์ Kanit |

> ❌ **ไม่ใช้** framework (React, Vue, Next.js), backend, หรือ database

---

## 📁 โครงสร้างไฟล์

```
ChickenShop/
├── index.html                        ← หน้าเว็บหลัก
├── style.css                         ← สไตล์ทั้งหมด
├── script.js                         ← JavaScript พื้นฐาน
├── deploy.sh                         ← สคริปต์ deploy บนเซิร์ฟเวอร์
├── README.md                         ← ไฟล์นี้
└── .github/workflows/deploy.yml      ← GitHub Actions auto-deploy
```

---

## 🚀 การ Deploy บน Ubuntu + Nginx

### 1. ติดตั้ง Nginx

```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 2. Copy ไฟล์ไปยัง Web Root

```bash
sudo cp index.html style.css script.js /var/www/html/
```

### 3. ตั้งค่า Permission

```bash
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

### 4. ทดสอบ

เปิดเบราว์เซอร์ไปที่ `http://<server-ip>` เพื่อดูเว็บไซต์

### วิธีลัด: ใช้ Deploy Script

```bash
# บนเซิร์ฟเวอร์ Ubuntu — รันครั้งเดียวจบ
curl -sSL https://raw.githubusercontent.com/poomiput/chicken-Shop/main/deploy.sh | sudo bash
```

หรือ clone แล้วรัน:

```bash
git clone https://github.com/poomiput/chicken-Shop.git
sudo bash chicken-Shop/deploy.sh
```

---

## 🤖 Auto Deploy (GitHub Actions)

เมื่อ **push เข้า main** หรือ **merge PR** → GitHub Actions จะ SSH ไปที่เซิร์ฟเวอร์แล้ว deploy ให้อัตโนมัติ

### ตั้งค่า Secrets ที่ GitHub

ไปที่ Repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Secret Name | ค่า |
|---|---|
| `SERVER_HOST` | IP ของเซิร์ฟเวอร์ (เช่น `192.168.1.100`) |
| `SERVER_USER` | username SSH (เช่น `ubuntu`) |
| `SERVER_SSH_KEY` | private key สำหรับ SSH (เนื้อหาไฟล์ `id_rsa`) |

### วิธีเตรียม SSH Key บนเซิร์ฟเวอร์

```bash
# บนเครื่อง local — สร้าง key
ssh-keygen -t ed25519 -f ~/.ssh/deploy_key -N ""

# copy public key ไปยังเซิร์ฟเวอร์
ssh-copy-id -i ~/.ssh/deploy_key.pub ubuntu@<server-ip>

# นำ private key ไปใส่ใน GitHub Secret (SERVER_SSH_KEY)
cat ~/.ssh/deploy_key
```

### Flow การทำงาน

```
แก้โค้ด → push/merge เข้า main → GitHub Actions trigger
→ SSH ไปเซิร์ฟเวอร์ → git pull → เว็บอัปเดตอัตโนมัติ ✅
```

---

## 🔄 Git/GitHub Workflow

### Quick Start

```bash
git clone https://github.com/<username>/ChickenShop.git
cd ChickenShop
```

### Demo Workflow: แก้ไขโปรโมชั่นและ Deploy

```bash
# 1. สร้าง feature branch
git checkout -b feature/update-promotion

# 2. แก้ไขไฟล์ index.html (เช่น เปลี่ยนข้อความโปรโมชั่น)
nano index.html

# 3. Commit และ Push
git add .
git commit -m "อัปเดตโปรโมชั่นประจำสัปดาห์"
git push origin feature/update-promotion

# 4. เปิด Pull Request บน GitHub แล้ว Merge เข้า main

# 5. GitHub Actions จะ deploy ไปยังเซิร์ฟเวอร์ให้อัตโนมัติ!
#    (หรือ deploy manual: ssh เข้าเซิร์ฟเวอร์แล้วรัน sudo bash deploy.sh)
```

### จุดที่แก้ไขง่ายสำหรับ Demo

ในไฟล์ `index.html` มี comment `*** EASY EDIT POINT ***` กำกับไว้ที่:

1. **Announcement Banner** — ข้อความแถบประกาศด้านบน
2. **Daily Special** — เมนูแนะนำประจำวัน
3. **Promotion Section** — โปรโมชั่นพิเศษ

---

## 👥 สมาชิกในทีม

| ชื่อ | หน้าที่ |
|-----|--------|
| — | — |

---

## 📜 License

โปรเจกต์นี้สร้างเพื่อการศึกษาในรายวิชา Computer System Engineering & System Administration
