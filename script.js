// เพิ่มการทำงานด้วย JavaScript (เพื่อให้กดปุ่มแล้วป๊อปอัปเด้ง/ปิด)

// --- ควบคุมป๊อปอัป START GAME ---
const startBtn = document.querySelector('.btn-start');
const popup = document.getElementById('game-popup');
const closeBtn = document.getElementById('close-popup');

//startBtn = ค้นหาปุ่มที่มีคลาสชื่อ .btn-start (ปุ่มเปิดเกม)

//popup = ค้นหากล่องป๊อปอัปเกมที่มี ID ชื่อ game-popup

//closeBtn = ค้นหาปุ่มปิดที่มี ID ชื่อ close-popup

if (startBtn && popup && closeBtn) {
    startBtn.addEventListener('click', () => {
        popup.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
}

// --- ควบคุมป๊อปอัป ABOUT ME ---
const aboutBtn = document.getElementById('about-btn');
const aboutPopup = document.getElementById('about-popup');
const closeAboutBtn = document.getElementById('close-about');

if (aboutBtn && aboutPopup && closeAboutBtn) {
    // เมื่อคลิกปุ่ม ABOUT ME ให้แสดงหน้าต่างป๊อปอัปขึ้นมา
    aboutBtn.addEventListener('click', () => {
        aboutPopup.style.display = 'flex';
    });

    // เมื่อคลิกปุ่ม CLOSE ให้ซ่อนหน้าต่างป๊อปอัป
    closeAboutBtn.addEventListener('click', () => {
        aboutPopup.style.display = 'none';
    });

    // ถ้าคลิกพื้นที่ว่างสีดำรอบนอก ให้ปิดหน้าต่างป๊อปอัป
    aboutPopup.addEventListener('click', (e) => {
        if (e.target === aboutPopup) {
            aboutPopup.style.display = 'none';
        }
    });
}