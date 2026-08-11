// 1. ตั้งตัวแปรนับคะแนนเริ่มต้น
let clicks = 0;
let autoClickRate = 0;


// 2. ดึง Element จาก HTML มาเตรียมใช้งาน
const bunBtn = document.getElementById('bunBtn');
const clickCountDisplay = document.getElementById('clickCount');
const bakeRateDisplay = document.getElementById('bakeRate');


// 3. UI Update Function
// แบบเดิม (Manual Click Only) เขียนแบบนี้ได้ แต่พอเพิ่ม Auto-click โค้ดจะเริ่มซ้ำซ้อน จึงต้องแยกฟังก์ชัน updateDisplay() จะได้ไม่ต้องเขียนซ้ำหลายอัน
/*
bunBtn.addEventListener("click", (event) => {
  clicks++; //อัปเดต Data บวกคะแนนเพิ่มทีละ 1
  clickCountDisplay.textContent = clicks; //อัปเดต UI เอาตัวเลขใหม่ไปแปะบนหน้าจอ
});
*/

function updateDisplay() {
  clickCountDisplay.textContent = clicks;
  bakeRateDisplay.textContent = autoClickRate;
}

//ระบบออโต้คลิก
function checkAutoClick() {
  // เงื่อนไข: คะแนนถึง 50 และยังไม่เคยเปิด Auto Click (autoClickRate ยังเป็น 0 อยู่)
  if (clicks >= 50 && autoClickRate === 0) {
    autoClickRate = 1; // กำหนดอัตราเป็น 1 ชิ้น/วินาที
    updateDisplay();   // อัปเดตหน้าจอทันที

    // สั่งให้ทำงานซ้ำทุกๆ 1,000 มิลลิวินาที (1 วินาที)
    setInterval(() => {
      clicks += autoClickRate; // บวกคะแนนเพิ่มตามอัตรา
      updateDisplay();          // อัปเดตตัวเลขใหม่บนหน้าจอ
    }, 1000);
  }
}


// ทุกครั้งที่คลิก ให้เช็กระบบ Auto Click ด้วย
bunBtn.addEventListener("click", (event) => {
  clicks++;
  updateDisplay();
  checkAutoClick(); // เรียกใช้โค้ดตรงนี้
});


//ปลดล็อกไอเทมตามคะแนน
const unlocks = [
  { id: 'item-10', displayId: 'display-10', target: 10 },
  { id: 'item-50', displayId: 'display-50', target: 50 },
  { id: 'item-100', displayId: 'display-100', target: 100 },
  { id: 'item-150', displayId: 'display-150', target: 150 }
];

function checkUnlocks() {
  unlocks.forEach(item => {
    // ใช้ if เช็กว่าคะแนนปัจจุบันถึงเป้าหมายหรือยัง
    if (clicks >= item.target) {
      
      // 1. ปลดล็อกการ์ดฝั่งขวา (เติม class 'unlocked')
      const cardEl = document.getElementById(item.id);
      if (cardEl) {
        cardEl.classList.add('unlocked');
      }

      // 2. แสดงรูปภาพตรงกลาง (เติม class 'show')
      const displayEl = document.getElementById(item.displayId);
      if (displayEl) {
        displayEl.classList.add('show');
      }
    }
  });
}