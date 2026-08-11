// 1. ตั้งตัวแปรนับคะแนนเริ่มต้น
let clicks = 0;
let autoClickRate = 0;

// 2. ดึง Element จาก HTML มาเตรียมใช้งาน
const bunBtn = document.getElementById('bunBtn');
const clickCountDisplay = document.getElementById('clickCount');
const bakeRateDisplay = document.getElementById('bakeRate');

// 3. UI Update Function
// แบบเดิม (Manual Click Only) เขียนแบบนี้ได้ แต่พอเพิ่ม Auto-click โค้ดจะเริ่มซ้ำซ้อน จึงต้องแยกฟังก์ชัน updateDisplay() จะได้ไม่ต้องเขียนซ้ำหลายอัน
// --------------------------------------------------
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