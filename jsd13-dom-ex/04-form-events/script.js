// Form Events
// Open index.html and work through these in order.

// TODO 1: Select #signup-form, #name-input, #char-count, and #feedback.
const signupForm = document.querySelector("#signup-form")
const nameInput = document.querySelector("#name-input")
const charCount = document.querySelector("#char-count")
const feedback = document.querySelector("#feedback")



// TODO 2: Add an "input" listener on #name-input. Every time the user types,
// set char-count's textContent to the current length of the input's value
// (name-input.value.length).
nameInput.addEventListener("input", (event) => {
charCount.textContent = nameInput.value.length;
//console.log(event);
console.log(name-input.value.length)
}); 


// TODO 3: Add a "submit" listener on #signup-form. Inside it:
//   - call event.preventDefault() so the page doesn't reload
//   - read and trim the name input's value
//   - if it's empty, set feedback's textContent to "Name required"
//   - otherwise, set feedback's textContent to `Welcome, ${name}!`

signupForm.addEventListener("submit", (event) => {
     event.preventDefault()
     //console.log(nameInput.value.trim())
    const name = nameInput.value.trim()
    //ถ้า name emtpty ให้ feedback เป็น name required
    if (name === "") {
        feedback.textContent = "Name required"
    }
    //ถ้าไม่ใช่ให้เซ็ต feedback ว่า `Welcome, ${name}!`
    else {
         feedback.textContent = `Welcome, ${name}!`
    }
})