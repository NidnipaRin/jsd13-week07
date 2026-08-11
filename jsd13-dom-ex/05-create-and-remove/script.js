// Creating & Removing Elements
// Open index.html and work through these in order.

// TODO 1: Select #item-input, #add-item-btn, #items (the <ul>), and
// #item-count (the <span>).
const itemInput = document.querySelector("#item-input");
const addItembtn = document.querySelector("#add-item-btn");
const items = document.querySelector("#items");
const itemCount = document.querySelector("#item-count");

// TODO 2: Write a function updateCount() that sets item-count's textContent
// to the number of <li> elements currently in the list (items.children.length).
function updateCount() {
    itemCount.textContent = items.children.length

}

// TODO 3: Add a "click" listener on #add-item-btn. Inside it:
//   - read and trim the input's value; if empty, do nothing
//   - create a new <li>, set its textContent to the value
//   - add a "click" listener on the <li> that removes it (li.remove())
//     and then calls updateCount() again
//   - add the <li> to the TOP of the list using items.prepend(li)
//   - clear the input
//   - call updateCount()


addItembtn.addEventListener("click", () => {
  const val = itemInput.value.trim(); //อ่านค่าจาก input และตัดช่องว่าง

  if (val === "") { 
    return;
  }   // ถ้าเป็นค่าว่าง ให้หยุดทำงานทันที

  
  const li = document.createElement("li"); //สร้าง <li> ใหม่ แล้วใส่ข้อความลงไป
  li.textContent = val;

  li.addEventListener("click", () => {  //click listener ให้ <li> เพื่อลบตัวเองเมื่อโดนคลิก และอัปเดตจำนวน
    li.remove();
    updateCount();
  });

  items.prepend(li);


  itemInput.value = "";


  updateCount();   //อัปเดตจำนวนนับทั้งหมด
});