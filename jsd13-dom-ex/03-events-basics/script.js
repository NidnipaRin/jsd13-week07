// Events Basics
// Open index.html and work through these in order.

// TODO 1: Select #box, #log, and #key-display.
const box = document.querySelector("#box");
const log = document.querySelector("#log");
const keyDisplay = document.querySelector("#key-display");

// TODO 2: Add a "click" listener on #box that sets log's textContent to
// "Box clicked!". Inside the same listener, console.log() the event's
// event.type and event.target (the event object is the first argument
// your listener function receives).
//const box = document.querySelector("#box");
box.addEventListener("click", (event) => {
log.textContent = "Box clicked!";
console.log(event.type);
console.log(event.target);

}); 

// TODO 3: Add a "mouseover" listener on #box that adds the "hover" class
// to it, and a "mouseout" listener that removes the "hover" class.
//const box = document.querySelector("#box");
box.addEventListener("mouseover", (event) => {
  box.classList.add("hover");
});
box.addEventListener("mouseout", (event) => {
  box.classList.remove("hover");
});


// TODO 4: Add a "keydown" listener on the whole document. Inside it, set
// key-display's textContent to event.key (the key that was pressed).
//const keyDisplay = document.querySelector("#key-display");
let count = 0;
document.addEventListener("keydown", (event) => {
count++
    keyDisplay.textContent =`${event.key} keypressed ${count}`;
    console.log(event.key)
})
//เพิ่มแบบนับคลิก