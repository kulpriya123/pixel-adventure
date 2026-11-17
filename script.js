// ==========================================
// 1. ตัวแปรสถานะเกมของผู้เล่น (Level & Gold)
// ==========================================
let currentLevel = 1;                       // เลเวลเริ่มต้นที่ 1
let currentGold = 500;                      // เงินเริ่มต้นที่ 500G
const visitedMenus = new Set();             // ตัวเก็บรายชื่อเมนูที่ผู้เล่นกดเปิดดูแล้ว (ไม่นับซ้ำ)

const hudLevel = document.getElementById('hud-level'); // ค้นหาข้อความแสดงเลเวลด้านบน
const hudGold = document.getElementById('hud-gold');   // ค้นหาข้อความแสดงเงินด้านบน

// รายการไอเทมลับที่จะสุ่มได้เมื่อกด START GAME
const secretItems = [
    { name: "⌨️ คีย์บอร์ดพิกเซลทองคำ", gold: 150 },
    { name: "🧪 น้ำยาแก้บั๊กขั้นเทพ (Bug Fix Potion)", gold: 100 },
    { name: "🐱 แมวกวักนำโชคของ Kulpriya", gold: 300 },
    { name: "📜 คัมภีร์โค้ดลับ 8-Bit", gold: 200 },
    { name: "☕ กาแฟเพิ่มพลังเขียนโค้ด", gold: 120 }
];

// ฟังก์ชันอัปเดตตัวเลขเงินและเลเวลบนแถบสถานะด้านบน
function updateHUD() {
    if (hudLevel) {
        // แสดงเลขเลเวลแบบ 2 หลัก เช่น LV. 01, LV. 02
        const formattedLv = currentLevel < 10 ? `0${currentLevel}` : currentLevel;
        hudLevel.textContent = currentLevel >= 2 ? `LV. ${formattedLv} ★` : `LV. ${formattedLv}`;
        
        // ถ้าเลเวลอัป ให้เปลี่ยนสีตัวหนังสือเลเวลเป็นสีเหลืองทอง
        if (currentLevel >= 2) {
            hudLevel.style.color = '#ffd700';
        }
    }
    if (hudGold) {
        hudGold.textContent = `GOLD: ${currentGold}G`; // อัปเดตจำนวนเงินล่าสุด
    }
}

// ฟังก์ชันเช็กการเก็บเลเวลจากการสำรวจเมนู
function checkMenuProgress(menuId) {
    visitedMenus.add(menuId); // บันทึกว่ากดเมนูนี้แล้ว

    // ถ้ากดเปิดครบทั้ง 5 เมนู และยังอยู่ที่เลเวล 1 ให้เลเวลอัป!
    if (visitedMenus.size === 5 && currentLevel === 1) {
        currentLevel = 2;       // อัปเลเวลเป็น 2
        currentGold += 500;     // แจกโบนัสเงินเพิ่ม 500G
        updateHUD();            // อัปเดตหน้าจอด้านบนทันที
        
        // แจ้งเตือนผู้เล่นว่าเลเวลอัปแล้ว
        setTimeout(() => {
            alert("🎉 LEVEL UP! คุณสำรวจข้อมูลครบทุกเมนูแล้ว เลื่อนระดับเป็น LV. 02 และได้รับโบนัส +500G!");
        }, 400);
    }
}

// ==========================================
// 2. ฟังก์ชันกลางสำหรับควบคุมป๊อปอัปแต่ละเมนู
// ==========================================
function setupPopup(btnId, popupId, closeId) {
    const btn = document.getElementById(btnId);       // ค้นหาปุ่มกดเปิด
    const popup = document.getElementById(popupId);   // ค้นหากล่องหน้าต่างป๊อปอัป
    const closeBtn = document.getElementById(closeId); // ค้นหาปุ่มปิด (CLOSE)

    if (btn && popup && closeBtn) {
        // เมื่อผู้ใช้คลิกที่ปุ่มเปิดเมนู
        btn.addEventListener('click', () => {
            popup.style.display = 'flex'; // แสดงป๊อปอัป
            checkMenuProgress(btnId);     // นับแต้มสำรวจเมนูเพื่อเก็บเลเวล
        });

        // เมื่อผู้ใช้คลิกที่ปุ่ม CLOSE
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none'; // ซ่อนป๊อปอัป
        });

        // เมื่อผู้ใช้คลิกพื้นที่ว่างรอบนอกกล่องป๊อปอัป
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none'; // ซ่อนป๊อปอัป
            }
        });
    }
}

// ==========================================
// 3. ควบคุมป๊อปอัป START GAME (ระบบสุ่มไอเทมลับ)
// ==========================================
const startBtn = document.querySelector('.btn-start');   // ค้นหาปุ่ม START GAME
const gamePopup = document.getElementById('game-popup'); // ค้นหากล่องป๊อปอัปเกม
const closeGameBtn = document.getElementById('close-popup'); // ค้นหาปุ่มปิด
const gameResult = document.getElementById('game-result');   // ค้นหาข้อความแสดงผลไอเทมที่สุ่มได้

if (startBtn && gamePopup && closeGameBtn) {
    startBtn.addEventListener('click', () => {
        // สุ่มเลือกไอเทม 1 ชิ้นจากรายการ secretItems
        const randomIndex = Math.floor(Math.random() * secretItems.length);
        const reward = secretItems[randomIndex];

        // บวกเงินรางวัลเข้ากระเป๋าผู้เล่น
        currentGold += reward.gold;
        updateHUD(); // อัปเดตเงินบนแถบด้านบนทันที

        // แสดงชื่อไอเทมและเงินที่ได้รับในกล่องป๊อปอัป
        if (gameResult) {
            gameResult.innerHTML = `คุณค้นพบไอเทมลับ:<br><strong style="color: #ffd700; font-size: 22px;">${reward.name}</strong><br>ได้รับเงินรางวัล +${reward.gold}G!`;
        }

        gamePopup.style.display = 'flex'; // เปิดป๊อปอัปโชว์รางวัล
    });

    closeGameBtn.addEventListener('click', () => {
        gamePopup.style.display = 'none'; // ปิดป๊อปอัป
    });

    gamePopup.addEventListener('click', (e) => {
        if (e.target === gamePopup) {
            gamePopup.style.display = 'none';
        }
    });
}

// ==========================================
// 4. เรียกใช้งานฟังก์ชันกลางสำหรับเมนูทั้ง 5 ปุ่ม
// ==========================================
setupPopup('about-btn', 'about-popup', 'close-about');          // ปุ่ม ABOUT ME
setupPopup('edu-btn', 'edu-popup', 'close-edu');                // ปุ่ม การศึกษา
setupPopup('skills-btn', 'skills-popup', 'close-skills');       // ปุ่ม ทักษะ
setupPopup('projects-btn', 'projects-popup', 'close-projects'); // ปุ่ม ผลงาน
setupPopup('chat-btn', 'chat-popup', 'close-chat');             // ปุ่ม แชทกับเลขา

// ==========================================
// 5. ระบบแชทเลือกคำถามอัตโนมัติกับเลขาฯ
// ==========================================
const chatOptions = document.querySelectorAll('.chat-option-btn'); // ค้นหาปุ่มคำถามทั้งหมด
const chatMessages = document.getElementById('chat-messages');     // ค้นหากล่องแสดงข้อความแชท

// ฐานข้อมูลคำถามและคำตอบของเลขาฯ
const qaDatabase = {
    skills: {
        q: "ทักษะหลักของคุณ Kulpriya คือด้านไหน?",
        a: "กำลังมุ่งมั่นพัฒนาทักษะด้าน HTML5, CSS3, JavaScript และการสร้างสรรค์เว็บพอร์ตฟิโอสไตล์ 8-Bit ค่ะ!"
    },
    goal: {
        q: "เป้าหมายในการสร้างเว็บไซต์นี้คืออะไร?",
        a: "เพื่อฝึกฝนทักษะการเขียนโปรแกรม และสร้างพื้นที่แสดงผลงานสุดเท่ในรูปแบบเกมย้อนยุคค่ะ!"
    },
    contact: {
        q: "ช่องทางการติดต่อมีอะไรบ้าง?",
        a: "สามารถติดต่อผ่าน Email, line,  หรือติดตามGitHub (kulpriya123)โปรเจกต์อื่นๆ ได้เลยนะคะ ยินดีต้อนรับค่ะ!"
    }
};

// วนลูปใส่คำสั่งคลิกให้ปุ่มคำถามทุกปุ่ม
chatOptions.forEach(button => {
    button.addEventListener('click', () => {
        const qKey = button.getAttribute('data-q'); // ดึงรหัสคำถามจากปุ่มที่กด
        const qa = qaDatabase[qKey];                // ค้นหาคู่คำถาม-คำตอบ

        if (qa && chatMessages) {
            // สร้างกล่องข้อความคำถามฝั่งผู้เล่น
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-msg user-msg';
            userMsg.innerHTML = `> ${qa.q}`;
            chatMessages.appendChild(userMsg);

            // หน่วงเวลา 0.3 วินาที ให้เลขาฯ ตอบกลับ
            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'chat-msg bot-msg';
                botMsg.innerHTML = `<strong>เลขาฯ:</strong> ${qa.a}`;
                chatMessages.appendChild(botMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight; // เลื่อนลงล่างสุด
            }, 300);

            chatMessages.scrollTop = chatMessages.scrollHeight; // เลื่อนลงล่างสุด
        }
    });
});

// ==========================================
// 6. ระบบสลับธีมกลางวัน / กลางคืน (Day / Night Mode)
// ==========================================
const themeBtn = document.getElementById('theme-btn'); // ค้นหาปุ่มสลับธีมบนแถบด้านบน

if (themeBtn) {
    // เมื่อผู้ใช้คลิกที่ปุ่มสลับธีม
    themeBtn.addEventListener('click', () => {
        // สลับคลาส 'day-mode' ให้กับแท็ก <body> (ถ้ามีอยู่จะเอาออก ถ้ายังไม่มีจะใส่เพิ่ม)
        document.body.classList.toggle('day-mode');

        // ตรวจสอบว่าตอนนี้หน้าเว็บอยู่ในโหมดกลางวัน (day-mode) หรือไม่
        if (document.body.classList.contains('day-mode')) {
            themeBtn.textContent = '🌙 DUNGEON';       // เปลี่ยนข้อความปุ่มให้กดกลับเป็นโหมดกลางคืน
            themeBtn.style.backgroundColor = '#334155'; // เปลี่ยนสีปุ่มเป็นสีเทาเข้มกลางคืน
        } else {
            themeBtn.textContent = '☀️ SUNNY';         // เปลี่ยนข้อความปุ่มให้กดเป็นโหมดกลางวัน
            themeBtn.style.backgroundColor = '#f59e0b'; // เปลี่ยนสีปุ่มกลับเป็นสีส้มพระอาทิตย์
        }
    });
}

// ==========================================
// 7. ระบบข้อความพิมพ์ดีดอัตโนมัติ (Typewriter Effect)
// ==========================================
const typewriterElement = document.getElementById('typewriter-text'); // ค้นหากล่องข้อความต้อนรับ

// ข้อความต้อนรับที่ต้องการให้ค่อยๆ พิมพ์ทีละตัวอักษร (ใช้ \n เพื่อขึ้นบรรทัดใหม่)
const welcomeMessage = "> ยินดีต้อนรับสู่พอร์ตฟิโอสไตล์ 8-Bit ของฉันค่ะ!\n> เลือกหัวข้อเมนูด้านล่างเพื่อสำรวจข้อมูลการเดินทางได้เลย...";

let charIndex = 0;          // ตัวนับตำแหน่งตัวอักษรปัจจุบัน (เริ่มที่ตัวที่ 0)
const typingSpeed = 45;     // ความเร็วในการพิมพ์ (มิลลิวินาทีต่อตัวอักษร ยิ่งน้อยยิ่งพิมพ์เร็ว)

// ฟังก์ชันสำหรับพิมพ์ข้อความทีละตัวอักษร
function typeWriter() {
    if (typewriterElement) {
        // ตรวจสอบว่ายังพิมพ์ไม่ครบทุกตัวอักษรใช่ไหม
        if (charIndex < welcomeMessage.length) {
            // ดึงข้อความตั้งแต่ตัวแรกจนถึงตำแหน่งปัจจุบัน และเปลี่ยน \n เป็นแท็กขึ้นบรรทัดใหม่ <br>
            const currentText = welcomeMessage.substring(0, charIndex + 1).replace(/\n/g, '<br>');
            
            // แสดงข้อความพร้อมเคอร์เซอร์กระพริบท้ายประโยค
            typewriterElement.innerHTML = `${currentText}<span class="cursor-blink">█</span>`;
            
            charIndex++; // ขยับไปตัวอักษรถัดไป
            setTimeout(typeWriter, typingSpeed); // หน่วงเวลาแล้วเรียกฟังก์ชันพิมพ์ตัวถัดไป
        }
    }
}

// สั่งเริ่มทำงานเอฟเฟกต์พิมพ์ดีดทันทีที่โหลดหน้าเว็บเสร็จ
window.addEventListener('DOMContentLoaded', () => {
    typeWriter();
});

// ==========================================
// 8. ระบบป๊อปอัปติดต่อทางอีเมล & ปุ่มคัดลอกอีเมลอัตโนมัติ
// ==========================================
const openEmailModalBtn = document.getElementById('open-email-modal-btn'); // ปุ่ม "ส่งอีเมลติดต่อ" ในหน้า About Me
const emailPopup = document.getElementById('email-popup');                 // กล่องป๊อปอัปติดต่อทางอีเมล
const closeEmailX = document.getElementById('close-email-x');              // ปุ่มกากบาท (✖) ปิดหน้าต่างอีเมล
const copyEmailBtn = document.getElementById('copy-email-btn');            // ปุ่ม "คัดลอก"
const emailAddressText = document.getElementById('email-address-text');    // ข้อความที่อยู่อีเมล

// ควบคุมการเปิด-ปิดป๊อปอัปอีเมล
if (openEmailModalBtn && emailPopup && closeEmailX) {
    // กดปุ่ม "ส่งอีเมลติดต่อ" เพื่อเปิดหน้าต่างอีเมล
    openEmailModalBtn.addEventListener('click', () => {
        emailPopup.style.display = 'flex';
    });

    // กดปุ่มกากบาท ✖ เพื่อปิดหน้าต่างอีเมล
    closeEmailX.addEventListener('click', () => {
        emailPopup.style.display = 'none';
    });

    // กดพื้นที่ว่างรอบนอกเพื่อปิดหน้าต่างอีเมล
    emailPopup.addEventListener('click', (e) => {
        if (e.target === emailPopup) {
            emailPopup.style.display = 'none';
        }
    });
}

// ระบบปุ่มกดคัดลอกอีเมลลงคลิปบอร์ด (Clipboard)
if (copyEmailBtn && emailAddressText) {
    copyEmailBtn.addEventListener('click', () => {
        const emailToCopy = emailAddressText.textContent.trim(); // ดึงข้อความอีเมลออกมา

        // สั่งคัดลอกข้อความลงคลิปบอร์ด
        navigator.clipboard.writeText(emailToCopy).then(() => {
            // เปลี่ยนข้อความปุ่มชั่วคราวเพื่อแจ้งให้ผู้ใช้รู้ว่าคัดลอกสำเร็จแล้ว
            copyEmailBtn.textContent = 'คัดลอกแล้ว! ✓';
            copyEmailBtn.style.backgroundColor = '#16a34a'; // เปลี่ยนปุ่มเป็นสีเขียว

            // หน่วงเวลา 2 วินาที แล้วเปลี่ยนปุ่มกลับเป็นคำว่า "คัดลอก" เหมือนเดิม
            setTimeout(() => {
                copyEmailBtn.textContent = 'คัดลอก';
                copyEmailBtn.style.backgroundColor = ''; 
            }, 2000);
        });
    });
}

// ==========================================
// 9. ระบบป๊อปอัปสแกน QR Code LINE & ปุ่มคัดลอก LINE ID
// ==========================================
const openLineModalBtn = document.getElementById('open-line-modal-btn'); // ปุ่ม "LINE" ในหน้า About Me
const linePopup = document.getElementById('line-popup');                 // กล่องป๊อปอัป QR Code LINE
const closeLineX = document.getElementById('close-line-x');              // ปุ่มกากบาท (✖) ปิดหน้าต่าง LINE
const copyLineBtn = document.getElementById('copy-line-btn');            // ปุ่ม "คัดลอก ID"
const lineIdText = document.getElementById('line-id-text');              // ข้อความ LINE ID

// ควบคุมการเปิด-ปิดป๊อปอัป LINE
if (openLineModalBtn && linePopup && closeLineX) {
    openLineModalBtn.addEventListener('click', () => {
        linePopup.style.display = 'flex';
    });

    closeLineX.addEventListener('click', () => {
        linePopup.style.display = 'none';
    });

    linePopup.addEventListener('click', (e) => {
        if (e.target === linePopup) {
            linePopup.style.display = 'none';
        }
    });
}

// ระบบปุ่มกดคัดลอก LINE ID
if (copyLineBtn && lineIdText) {
    copyLineBtn.addEventListener('click', () => {
        const idToCopy = lineIdText.textContent.trim();

        navigator.clipboard.writeText(idToCopy).then(() => {
            copyLineBtn.textContent = 'คัดลอกแล้ว! ✓';
            copyLineBtn.style.backgroundColor = '#16a34a';

            setTimeout(() => {
                copyLineBtn.textContent = 'คัดลอก ID';
                copyLineBtn.style.backgroundColor = '';
            }, 2000);
        });
    });
}