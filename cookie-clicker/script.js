// ประกาศตัวแปรรอไว้
// ===================================================
let clicks = 0;
let autoClickRate = 0;
let isFinished = false; // ป้องกันพลุยิงซ้ำรัวๆ ตอนจบเกม
let autoInterval = null;


// ประกาศตัวแปร DOM (ดึง ID bakeRate ให้ตรงกับ HTML)
// ===================================================
const bunBtn = document.getElementById('bunBtn');
const clickCountDisplay = document.getElementById('clickCount');
const bakeRateDisplay = document.getElementById('bakeRate');


// สเตปการให้คะแนนตอนคลิก
// ===================================================
const stepsData = [
  { itemId: 'item-step1', displayId: 'display-step1', target: 10,   rateBonus: 0 },
  { itemId: 'item-step2', displayId: 'display-step2', target: 50,   rateBonus: 1 },  // +1/sec (เริ่ม Auto)
  { itemId: 'item-step3', displayId: 'display-step3', target: 100,  rateBonus: 2 },  // +2/sec (รวมเป็น 3)
  { itemId: 'item-step4', displayId: 'display-step4', target: 200,  rateBonus: 5 },  // +5/sec (รวมเป็น 8)
  { itemId: 'item-step5', displayId: 'display-step5', target: 350,  rateBonus: 10 }, // +10/sec (รวมเป็น 18)
  { itemId: 'item-step6', displayId: 'display-step6', target: 500,  rateBonus: 20 }, // +20/sec (รวมเป็น 38)
  { itemId: 'item-step7', isFinal: true,             target: 1000, rateBonus: 0 }  // Final 
];


// UI UPDATER
// ===================================================
function updateDisplay() {
  clickCountDisplay.textContent = Math.floor(clicks);
  if (bakeRateDisplay) {
    bakeRateDisplay.textContent = autoClickRate;
  }
  
  // โชว์คะแนนบน Tab เบราว์เซอร์
  document.title = `🍞 (${Math.floor(clicks)}) Strawberry Bun Clicker`;
}


// UNLOCKS แต่ละขั้น และ ไฟนอล ยิงพลุปุ้งๆ
// ===================================================
function checkUnlocks() {
  stepsData.forEach(step => {
    if (clicks >= step.target) {
      // 1. ปลดล็อกการ์ดฝั่งขวา
      const cardEl = document.getElementById(step.itemId);
      if (cardEl && !cardEl.classList.contains('unlocked')) {
        cardEl.classList.add('unlocked');
        
        // ถ้า Step นั้นมีโบนัส Auto Click ให้บวกสปีดเพิ่ม
        if (step.rateBonus > 0) {
          autoClickRate += step.rateBonus;
          updateDisplay();
          startAutoClickLoop();
        }
      }

      // 2. ปลดล็อกรูปตรงกลาง (เฉพาะสเตป 1-6)
      if (!step.isFinal) {
        const displayEl = document.getElementById(step.displayId);
        if (displayEl) displayEl.classList.add('show');
      }
    }
  });

  // 3. เช็กเป้าหมายสูงสุด Step 7 (แสดงปุ่มกดรับรางวัลเมื่อครบ 1000 ครั้ง)
  const finalStep = stepsData.find(s => s.isFinal);
  if (clicks >= finalStep.target && !isFinished) {
    isFinished = true; // ล็อกไม่ให้สร้างปุ่มซ้ำรัวๆ

    const rewardContainer = document.getElementById('rewardButtonContainer');
    if (rewardContainer && !document.getElementById('rewardBtn')) {
      const rewardBtn = document.createElement('button');
      rewardBtn.id = 'rewardBtn';
      rewardBtn.className = 'reward-btn';
      rewardBtn.textContent = 'ปลดล็อกสูตรลับขั้นสุดยอด คลิกเลย!!!!! ';
      
      // เมื่อผู้ใช้กดปุ่มรับรางวัล ให้ซ่อนตารางรูป 1-6 และปุ่ม แล้วแสดงภาพที่ 7 พร้อมยิงพลุ
      rewardBtn.addEventListener('click', () => {
        rewardBtn.remove(); // ลบปุ่มออก

        const stepsContainer = document.getElementById('stepsContainer');
        const recipeContainer = document.getElementById('recipeContainer');
        const statusText = document.getElementById('progressStatus');

        if (stepsContainer) stepsContainer.style.display = 'none';
        if (recipeContainer) recipeContainer.classList.add('active');
        if (statusText) statusText.textContent = "🎉 ยินดีด้วย! คุณสำเร็จการทำขนมและปลดล็อกสูตรลับฉบับเต็มแล้ว!";

        // ยิงพลุกระดาษถ้ามี Library canvas-confetti
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
          });
        }
      });

      rewardContainer.appendChild(rewardBtn);
    }
  }
}


// ลูป AUTO CLICK
// ===================================================
function startAutoClickLoop() {
  if (!autoInterval) {
    autoInterval = setInterval(() => {
      if (autoClickRate > 0) {
        clicks += autoClickRate;
        updateDisplay();
        checkUnlocks();
      }
    }, 1000);
  }
}


// FLOATING EFFECT (+1 ANIMATION)
// ===================================================
function createFloatingEffect(x, y) {
  const floatEl = document.createElement('div');
  floatEl.className = 'float-text';
  
  // สุ่มรูปไอคอนแปะคู่กับ +1
  const icons = ['icon_bun_8bit.png', 'icon_ingredients_8bit.png', 'icon_knead_8bit.png', 'icon_bake_8bit.png'];
  const miniImgSrc = icons[Math.floor(Math.random() * icons.length)];
  floatEl.innerHTML = `+1 <img src="${miniImgSrc}" alt="mini icon" />`;

  // วางตำแหน่งตามพิกัดเมาส์
  floatEl.style.left = `${x - 20}px`;
  floatEl.style.top = `${y - 20}px`;

  document.body.appendChild(floatEl);
  setTimeout(() => {
    floatEl.remove();
  }, 800);
}


// EVENT LISTENERS
// ===================================================
if (bunBtn) {
  bunBtn.addEventListener('click', (event) => {
    clicks++;
    updateDisplay();
    createFloatingEffect(event.clientX, event.clientY);
    checkUnlocks();
  });
}