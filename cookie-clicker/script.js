// 1. ตั้งตัวแปรนับคะแนนเริ่มต้น
let clicks = 0;
let autoClickRate = 0;
let isFinished = false; //ป้องกันพลุยิงซ้ำรัวๆ

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
      clicks += autoClickRate;   // บวกคะแนนเพิ่มตามอัตรา
      updateDisplay();          // อัปเดตตัวเลขใหม่บนหน้าจอ
      checkUnlocks();           //จุดที่เช็กเมื่อ Auto Click ทำงานทุกวินาที
    }, 1000);
  }
}


// กำหนด Mapping 7 Steps ให้ตรงกันทั้งการ์ดขวา และ รูปภาพกลาง
const stepsData = [
  { itemId: 'item-step1', displayId: 'display-step1', target: 10 },
  { itemId: 'item-step2', displayId: 'display-step2', target: 50 },
  { itemId: 'item-step3', displayId: 'display-step3', target: 100 },
  { itemId: 'item-step4', displayId: 'display-step4', target: 200 },
  { itemId: 'item-step5', displayId: 'display-step5', target: 350 },
  { itemId: 'item-step6', displayId: 'display-step6', target: 500 },
  { itemId: 'item-step7', isFinal: true, target: 1000 } // ภาพที่ 7 ปลายทาง
];

function checkUnlocks() {
  stepsData.forEach(step => {
    if (clicks >= step.target) {
      // 1. ปลดล็อกการ์ดฝั่งขวา
      const cardEl = document.getElementById(step.itemId);
      if (cardEl) cardEl.classList.add('unlocked');

      // 2. ปลดล็อกรูปตรงกลาง (เฉพาะสเตป 1-6)
      if (!step.isFinal) {
        const displayEl = document.getElementById(step.displayId);
        if (displayEl) displayEl.classList.add('show');
      }
    }
  });

  // 3. เช็กเป้าหมายสูงสุด Step 7
  const finalStep = stepsData.find(s => s.isFinal);
  if (clicks >= finalStep.target && !isFinished) {
    isFinished = true; // ล็อกไว้ทันทีว่าจุดพลุแล้ว ให้ทำงานท่อนนี้แค่ครั้งเดียวพอ

    const stepsContainer = document.getElementById('stepsContainer');
    const recipeContainer = document.getElementById('recipeContainer');
    const statusText = document.getElementById('progressStatus');

    if (stepsContainer) stepsContainer.style.display = 'none';
    if (recipeContainer) recipeContainer.classList.add('active');
    if (statusText) statusText.textContent = "🎉 ยินดีด้วย! คุณสำเร็จการทำขนมและปลดล็อกสูตรลับฉบับเต็มแล้ว!";

    // --- จุดพลุฉลองจบเกมตรงนี้ ---
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }
}

//เอฟเฟกต์ตัวเลข +1 ลอยตามเมาส์
function createFloatingEffect(x, y) {
    // 1. สร้าง HTML <div> ขึ้นมากลางอากาศด้วย JS
    const floatEl = document.createElement('div');
    floatEl.className = 'float-text';
    
    // 2. สุ่มรูปไอคอน แปะคู่กับtext +1
    const icons = ['icon_bun_8bit.png', 'icon_strawberry_8bit.png', 'icon_ingredients_8bit.png'];
    const miniImgSrc = icons[Math.floor(Math.random() * icons.length)];
    floatEl.innerHTML = `+1 <img src="${miniImgSrc}" alt="mini icon" />`;

    // 3. วางตำแหน่งให้ตรงกับพิกัดเมาส์ (x, y) ที่ผู้ใช้กด
    floatEl.style.left = `${x - 20}px`;
    floatEl.style.top = `${y - 20}px`;

    // 4. แปะ Element ลงหน้าเว็บ แล้วสั่งลบพร่องออกเมื่อแอนิเมชันเล่นจบ (800ms ประมาณ 0.8วิ)
    document.body.appendChild(floatEl);
    setTimeout(() => {
        floatEl.remove();
    }, 800);
}

// ทุกครั้งที่คลิก ให้เช็กระบบ Auto Click และ เช็ก Unlock ด้วย
bunBtn.addEventListener("click", (event) => {
  clicks++;
  updateDisplay();
  createFloatingEffect(event.clientX, event.clientY); //ส่งพิกัดเมาส์ไปสร้างเอฟเฟกต์
  checkAutoClick(); // เรียกใช้โค้ดตรงนี้
  checkUnlocks(); // จุดที่เช็กเมื่อผู้เล่นกดคลิก
});