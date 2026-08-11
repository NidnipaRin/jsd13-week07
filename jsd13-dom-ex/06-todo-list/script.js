// DOM Exercise: To-Do List
// Work through the TODOs in order. Open index.html in a browser to test.

// TODO 1: Select the elements you'll need:
//   - the form (#todo-form)
//   - the input (#todo-input)
//   - the list (#todo-list)

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

// TODO 2: Listen for the form's "submit" event. Inside the handler:
//   - call event.preventDefault() so the page doesn't reload
//   - read and trim the input's value
//   - if it's empty, do nothing (return)
//   - otherwise, create a new to-do item (see TODO 3) and clear the input

todoForm.addEventListener("submit", (event) => {
  event.preventDefault(); // กันไม่ให้หน้าเว็บรีเฟรช

  const text = todoInput.value.trim(); // อ่านข้อความและตัดช่องว่าง

  if (text === "") {
    return; // ถ้าเป็นค่าว่าง ให้หยุดทำงาน
  }

  addTodo(text); // เรียกฟังก์ชันสร้างรายการ (จาก TODO 3)
  todoInput.value = ""; // ล้างช่องพิมพ์
});

// TODO 3: Write a function addTodo(text) that:
//   - creates an <li>
//   - creates a <span class="todo-text"> inside it containing the text
//   - creates a <button class="delete-btn"> inside it with text "x"
//   - appends the <li> to the list
//
// Hint: use document.createElement, textContent, and append/appendChild.

function addTodo(text) {
  // สร้าง <li>
  const li = document.createElement("li");

  //สร้าง <span> ใส่ข้อความ
  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = text;

  // สร้าง <button> สำหรับลบ
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "x";

  //เอา span และ deleteBtn ใส่ใน <li> แล้วเอา <li> ไปใส่ใน <ul>
  li.append(span, deleteBtn);
  todoList.appendChild(li);
}

// TODO 4: When the delete button inside an <li> is clicked, remove that <li>
// from the list. (Attach this listener when you create the button in TODO 3.)

deleteBtn.addEventListener("click", () => {
  li.remove();
});

// TODO 5: When the todo-text span inside an <li> is clicked, toggle the
// "completed" class on the <li>. (Attach this listener when you create the
// span in TODO 3.)
span.addEventListener("click", () => {
  li.classList.toggle("completed");
});