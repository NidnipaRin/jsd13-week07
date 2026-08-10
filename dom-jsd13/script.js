// Write your demo code here, section by section.
// The HTML file has matching ids/classes for each topic:
//
// 1. Selecting Elements   -> #main-title, .submit-btn, .task
//console.log(document.getElementById("main-title").textContent);
//console.log(document.getElementsByClassName("submit-btn"));
//console.log(document.getElementsByClassName("task")[i].textContent)

// 2. Modifying Content    -> .label, #msg, #card
//console.log(document.getElementsByClassName("label"));
//console.log(document.getElementById("msg"));
//console.log(document.getElementById("card"));

// 3. classList            -> #themeBtn, .card
//console.log(document.getElementsByClassName("submit-btn"))

// 4. Create & Remove      -> #addTaskBtn, #resetTasksBtn, #tasks

// 5. Events               -> #click-me, #list, #signupForm, #email, .error
const btn = document.querySelector("#click me");
let count = 0;
    btn.addEventListener("click", () => {
        btn.textContent = "Clicked" + " " + count;
    })

// 6. Pokémon Card Fetcher -> #fetchBtn, #resetBtn, #gallery


console.log(document.getElementById("modify-name").textContent);
const h2Name = document.getElementById("modify-name");
h2Name.textContent = "Today I feel Good"
console.log(h2Name);
h2Name.style.backgroundColor = '#5372d9';
const cardImg = document.getElementById("card");
cardImg.innerHTML = `<img src="https://images.pexels.com/photos/38792523/pexels-photo-38792523.jpeg">`