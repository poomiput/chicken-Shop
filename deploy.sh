#!/bin/bash
# ============================================================
# Chicken Shop — Manual Deploy Script
# ============================================================
# ใช้รันบนเซิร์ฟเวอร์ Ubuntu เพื่อ deploy เว็บไซต์
# วิธีใช้: sudo bash deploy.sh
# ============================================================

set -e

REPO_URL="https://github.com/poomiput/chicken-Shop.git"
WEB_DIR="/var/www/html"
BRANCH="main"

echo "🍗 Chicken Shop — Deploy Script"
echo "================================"

# ตรวจสอบว่ารันด้วย sudo หรือไม่
if [ "$EUID" -ne 0 ]; then
  echo "❌ กรุณารันด้วย sudo: sudo bash deploy.sh"
  exit 1
fi

# ตรวจสอบว่ามี git หรือไม่
if ! command -v git &> /dev/null; then
  echo "📦 ติดตั้ง git..."
  apt update && apt install git -y
fi

# ตรวจสอบว่ามี nginx หรือไม่
if ! command -v nginx &> /dev/null; then
  echo "📦 ติดตั้ง nginx..."
  apt update && apt install nginx -y
  systemctl enable nginx
  systemctl start nginx
fi

# Deploy
if [ -d "$WEB_DIR/.git" ]; then
  echo "🔄 พบ repo อยู่แล้ว — กำลัง pull..."
  cd "$WEB_DIR"
  git pull origin "$BRANCH"
else
  echo "📥 Clone repo ใหม่..."
  rm -rf "$WEB_DIR"/*
  git clone -b "$BRANCH" "$REPO_URL" "$WEB_DIR"
fi

# ตั้งค่า permission
chown -R www-data:www-data "$WEB_DIR"
chmod -R 755 "$WEB_DIR"

# Reload nginx
systemctl reload nginx

echo ""
echo "✅ Deploy สำเร็จ!"
echo "🌐 เปิดเบราว์เซอร์ไปที่ http://$(hostname -I | awk '{print $1}')"
echo "================================"
