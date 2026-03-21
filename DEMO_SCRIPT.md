# 🎓 Chicken Shop — Git/GitHub Version Control Demo Script

> คู่มือสาธิตสำหรับนำเสนอรายวิชา Computer System Engineering & System Administration
> 
> **เตรียมไว้แล้ว**: branches, conflict scenarios, rollback scenario
> **ผู้สาธิตแค่ต้อง**: ทำตามขั้นตอนทีละขั้น

---

## 📌 สิ่งที่เตรียมไว้ให้แล้ว

| Branch | สถานะ | ใช้สาธิตเรื่อง |
|---|---|---|
| `main` | ✅ Production — เว็บที่ใช้งานจริง | Branch Strategy |
| `dev` | ✅ Development — สำหรับรวมโค้ดก่อน deploy | Branch Strategy |
| `feature/update-promotion` | ✅ มีการแก้โปรโมชั่นใหม่ | Feature Development + PR |
| `feature/add-new-menu` | ✅ มีการแก้จุดเดียวกัน (สร้าง conflict) | Merge Conflict |

---

## 🎬 ลำดับการสาธิต

---

### ขั้นที่ 1: อธิบาย Branch Strategy (แค่พูด + โชว์ GitHub)

**เปิด GitHub แสดงให้เห็น branches ทั้งหมด**

พูดว่า:
> "ในองค์กรจริงเราจะไม่แก้โค้ดบน main โดยตรง เพราะ main คือโค้ดที่ deploy อยู่บนเซิร์ฟเวอร์
> ถ้าแก้แล้วพัง เว็บจะล่มทันที เราจึงต้องแยก branch"

วาดรูปบนกระดาน (หรือพูดอธิบาย):

```
main (production)  ←  เว็บที่ deploy อยู่บนเซิร์ฟเวอร์
  └── dev          ←  รวมโค้ดทดสอบก่อน deploy
       ├── feature/update-promotion  ← คนที่ 1 แก้โปรโมชั่น
       └── feature/add-new-menu      ← คนที่ 2 เพิ่มเมนู
```

---

### ขั้นที่ 2: สาธิต Feature Development

**เปิด Terminal แล้วพิมพ์:**

```bash
# ดู branch ทั้งหมด
git branch -a

# สลับไปดู feature branch
git checkout feature/update-promotion
```

**เปิดไฟล์ `index.html` ดู** — จะเห็นว่าโปรโมชั่นถูกแก้เป็น "ซื้อ 2 แถม 1"

```bash
# ดู commit history
git log --oneline -5
```

พูดว่า:
> "นี่คือสิ่งที่คนที่ 1 ทำ — เขาสร้าง branch ใหม่ แก้ไขโปรโมชั่น แล้ว commit
> โค้ดของเขาถูกแยกออกจาก main ไม่กระทบเว็บที่ online อยู่"

---

### ขั้นที่ 3: สาธิต Merge Conflict ⚡ (จุด WOW)

พูดว่า:
> "ทีนี้ ถ้าคนที่ 2 แก้ไขจุดเดียวกันล่ะ? Git จะจัดการยังไง?"

```bash
# กลับไป dev ก่อน
git checkout dev

# merge คนที่ 1 เข้ามา (สำเร็จ ไม่มี conflict)
git merge feature/update-promotion
```

พูดว่า:
> "merge คนแรกสำเร็จ เพราะยังไม่มีใครแก้จุดเดียวกัน ทีนี้ลอง merge คนที่ 2..."

```bash
# merge คนที่ 2 — จะเกิด CONFLICT!
git merge feature/add-new-menu
```

**⚡ จะเห็นข้อความ CONFLICT!**

พูดว่า:
> "Git บอกว่ามี conflict — แปลว่าทั้ง 2 คนแก้ไขจุดเดียวกัน Git ไม่รู้จะเอาของใคร
> นี่แหละคือเหตุผลที่ Version Control สำคัญ — มันไม่ overwrite โค้ดของใครทิ้ง
> แต่ให้เราตัดสินใจเอง"

**เปิด index.html ดู** — จะเห็น conflict markers:
```
<<<<<<< HEAD
(โค้ดจาก dev / คนที่ 1)
=======
(โค้ดจาก คนที่ 2)
>>>>>>> feature/add-new-menu
```

**แก้ conflict** — เลือกเอาของคนที่ต้องการ หรือรวมทั้ง 2 เข้าด้วยกัน แล้ว:

```bash
git add index.html
git commit -m "แก้ conflict: รวมโปรโมชั่นกับเมนูใหม่เข้าด้วยกัน"
```

---

### ขั้นที่ 4: Pull Request + Code Review

**เปิด GitHub** → สร้าง Pull Request จาก `dev` → `main`

พูดว่า:
> "ในองค์กรจริง เราจะไม่ merge เข้า main เลย ต้องเปิด Pull Request ก่อน
> เพื่อให้คนอื่นในทีม review โค้ดก่อน อนุมัติแล้วค่อย merge"

**กด Merge Pull Request บน GitHub**

---

### ขั้นที่ 5: Deploy ขึ้นเซิร์ฟเวอร์ (Manual SSH)

พูดว่า:
> "พอ merge เข้า main แล้ว ต่อไปก็นำโค้ดไปอัปเดตบนเซิร์ฟเวอร์
> เนื่องจากเซิร์ฟเวอร์เราเป็น IP ภายใน ผมจึงต้อง SSH เข้าไปดึงโค้ดสดๆ ให้ดูครับ
> แต่ถ้าเป็นของจริงในองค์กร จะใช้ระบบ CI/CD ทำตรงนี้ให้อัตโนมัติ"

**เปิด Terminal:**

```bash
# SSH เข้าเซิร์ฟเวอร์ Ubuntu (password: 1)
ssh analyze@192.168.0.111

# เข้าไปที่โฟลเดอร์เว็บ
cd /var/www/html

# ดึงโค้ดล่าสุดจาก GitHub มาอัปเดต
git fetch origin
git reset --hard origin/main
```

**Refresh browser ที่เปิดเว็บ** → เห็นเว็บอัปเดตเป็นของใหม่แล้ว!

---

### ขั้นที่ 6: Rollback (สำคัญมากสำหรับ Sysadmin!) 🔙

พูดว่า:
> "ถ้า deploy แล้วพัง? เว็บล่ม? เราจะทำยังไง?"

**ทำให้เว็บพัง (จงใจ):**

```bash
# พิมพ์ในเครื่องของเรา (ไม่ใช่ใน SSH)
echo "<h1>พังแล้วจ้าาา</h1>" > index.html
git add index.html
git commit -m "อัปเดตหน้าเว็บ (มี bug!)"
git push origin main
```

**SSH เข้าไปอัปเดตบนเซิร์ฟเวอร์:**
```bash
ssh analyze@192.168.0.111
cd /var/www/html
git fetch origin
git reset --hard origin/main
```

**Refresh browser** → เว็บพัง! 😱

พูดว่า:
> "ถ้าไม่มี Version Control เราต้องนั่งแก้ไฟล์ใหม่ นั่งจำว่าแก้ตรงไหน
> แต่เพราะเราใช้ Git เราสามารถ revert กลับได้ทันที!"

**Rollback ในเครื่องเรา:**

```bash
# ดู history — จะเห็น commit ที่พังอยู่บนสุด
git log --oneline -5

# revert commit ล่าสุด (ย้อนกลับ)
git revert HEAD --no-edit

# push กลับขึ้นไป
git push origin main
```

**SSH เข้าไปดึงโค้ดที่แก้แล้ว:**
```bash
# กลับไปที่ SSH session ของเซิร์ฟเวอร์
git fetch origin
git reset --hard origin/main
```

**Refresh browser** → เว็บกลับมาปกติ! 🎉

พูดว่า:
> "ถึงแม้เซิร์ฟเวอร์เราจะเป็นระบบ manual 
> แต่เพราะ Git เก็บประวัติไว้ ทำให้เรากู้คืนระบบได้อย่างรวดเร็วและปลอดภัย
> นี่คือพลังของ Version Control ในงาน System Administration"

---

## 📝 สรุปสิ่งที่สาธิตได้

| หัวข้อ | สิ่งที่ทำ | ทำไมถึงสำคัญ |
|---|---|---|
| Branch Strategy | แยก main / dev / feature | ป้องกันโค้ดพังบน production |
| Feature Development | สร้าง branch, แก้ไข, commit | แต่ละคนทำงานไม่กระทบกัน |
| Merge Conflict | 2 คนแก้จุดเดียวกัน | Git ตรวจจับและให้เราแก้ไข ไม่ overwrite |
| Pull Request | merge ผ่าน PR + review | ตรวจสอบโค้ดก่อน deploy |
| Manual Deploy | SSH ดึงโค้ด | กระบวนการ deploy ขึ้น Server จริง |
| Rollback | git revert + deploy ใหม่ | กู้คืนได้ทันทีเมื่อเกิดปัญหา |

---

## 💡 คำสั่ง Git ที่ใช้ในการสาธิต (สรุปรวม)

```bash
git branch -a                    # ดู branch ทั้งหมด
git checkout <branch>            # สลับ branch
git log --oneline -5             # ดู commit 5 อันล่าสุด
git merge <branch>               # merge branch เข้ามา
git add .                        # เตรียมไฟล์ที่แก้
git commit -m "ข้อความ"          # บันทึกการเปลี่ยนแปลง
git push origin <branch>         # push ขึ้น GitHub
git revert HEAD --no-edit        # ย้อนกลับ commit ล่าสุด
git diff                         # ดูความแตกต่าง
```
