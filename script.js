/* ============================================================
   Chicken Shop — JavaScript
   เน้นความเรียบง่าย ไม่ใช้ framework ใดๆ
   ============================================================ */

// --- ปิด Announcement Banner ---
function closeBanner() {
    var banner = document.getElementById('announcement-banner');
    if (banner) {
        banner.style.transition = 'all 0.3s ease';
        banner.style.transform = 'translateY(-100%)';
        banner.style.opacity = '0';
        setTimeout(function () {
            banner.classList.add('hidden');
        }, 300);
    }
}

// --- เลื่อนหน้าไปยัง section ที่ต้องการ ---
function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- สั่งซื้อ (mockup alert) ---
function orderNow() {
    alert(
        '🍗 ขอบคุณที่สนใจ Chicken Shop!\n\n' +
        '📱 ติดต่อสั่งซื้อได้ที่:\n' +
        '   โทร: 081-234-5678\n' +
        '   LINE: @chickenshop\n\n' +
        '⏰ เปิดบริการทุกวัน 10:00 - 22:00'
    );
}

// --- สั่งเมนูเฉพาะ (mockup alert) ---
function orderItem(name, price) {
    alert(
        '🛒 เพิ่ม "' + name + '" ลงตะกร้า\n\n' +
        '💰 ราคา: ฿' + price + '\n\n' +
        '(ระบบสั่งซื้อจริงจะเปิดเร็วๆ นี้)'
    );
}

// --- Mobile Menu Toggle ---
function toggleMobileMenu() {
    var navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// --- ปิด Mobile Menu เมื่อคลิกลิงก์ ---
document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('.nav-links a');
    links.forEach(function (link) {
        link.addEventListener('click', function () {
            var navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        });
    });
});
