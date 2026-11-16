// เพิ่มการทำงานด้วย JavaScript (เพื่อให้กดปุ่มแล้วป๊อปอัปเด้ง/ปิด)

// ดึงค่าปุ่มและหน้าต่างป๊อปอัปมาควบคุม
const startBtn = document.querySelector('.btn-start');
const popup = document.getElementById('game-popup');
const closeBtn = document.getElementById('close-popup');

// เมื่อคลิกปุ่ม START GAME ให้แสดงป๊อปอัปขึ้นมา
startBtn.addEventListener('click', () => {
    popup.style.display = 'flex';
});

// เมื่อคลิกปุ่ม CLOSE ให้ปิดหน้าต่างป๊อปอัป
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// (แถม) ถ้าคลิกพื้นที่ว่างรอบนอกกล่อง ก็ให้ปิดป๊อปอัปด้วย
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});