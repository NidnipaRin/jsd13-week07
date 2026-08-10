// Content, Attributes & Classes
// Open index.html and work through these in order.

// TODO 1: Select #heading and change its textContent to "Welcome!"
console.log(document.getElementById("heading").textContent);
const h2Heading = document.getElementById("heading");
h2Heading.textContent = "Welcome"
console.log(h2Heading);

// TODO 2: Select #bio (it currently reads "I am learning the DOM."). Set its
// innerHTML so the word "learning" is wrapped in a <strong> tag, i.e. the
// paragraph should read: I am <strong>learning</strong> the DOM.
const storngLearning = document.getElementById("bio");
storngLearning.innerHTML = 'I am <strong>learning</strong> the DOM.'

// TODO 3: Select #card. Read its "class" attribute with getAttribute and
// console.log() it.
const card = document.getElementById("card"); //ให้เบราว์เซอร์ไปหากล่องที่มี id="card" ในหน้าเว็บ แล้วเอามาเก็บไว้ในตัวแปรชื่อ card
const cardClass = card.getAttribute('class'); //เอาตัวแปร card มา ต่อด้วย .getAttribute('class')เพื่อบอกว่า "ไปดูป้าย class ของกล่องนี้ให้หน่อยว่าเขียนว่าอะไร"
//ลองพมพ์เล่นๆดู getAttribute('id') จะได้ค่า "card" , getAttribute('class') จะได้ค่า "card", getAttribute('data-visits')จะได้ค่า "0" ตอนสั่ง console.logออกมา
console.log(cardClass); //๋JS ไปดูแล้วเจอคำว่า "card" มันจะส่งคำว่า "card" กลับมาเก็บไว้ในตัวแปร cardClass แล้วแสดงผลออกมาตอนที่มีคำสั่ง console.log


// TODO 4: Add the "highlight" class to #card using classList.add, then
// console.log(card.className) to see it there. (You'll learn to do this in
// response to a click in the next exercise, 03-events-basics.)
//const card = document.getElementById("card"); ใช้ของข้อ 3 ได้ พิมพ์สองอันแล้วเว็บไม่อ่าน
card.classList.add('highlight'); // สั่งเพิ่ม class "highlight" เข้าไปที่ตัวแปร card 
console.log(card.className)


// TODO 5: #card starts with a data-visits="0" attribute. Read the current
// value with card.dataset.visits, convert it to a number, add 1, write it
// back to card.dataset.visits, and console.log() the new value.
//const card = document.getElementById("card"); ใช้ของข้อ 3 ได้ พิมพ์สองอันแล้วเว็บไม่อ่าน
let currentVisits = Number(card.dataset.visits) + 1; //ค่าที่อ่านได้จาก HTML จะเป็น ข้อความString เสมอ (ได้ "0") เลยต้องใช้ Number("0") เพื่อแปลงให้เป็น ตัวเลข 0 ก่อน ถึงจะเอาไปบวก 1 ได้(ถ้าไม่แปลง มันจะเอาข้อความมาต่อกันกลายเป็น "01")
card.dataset.visits = currentVisits;
console.log(card.dataset.visits);