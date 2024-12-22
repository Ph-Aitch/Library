const theme = document.querySelector(".theme-switch")
const addBtn = document.querySelector(".btn")
const form = document.querySelector("form")
const overlay = document.querySelector(".overlay")

let book_id = 1

class Book {
    constructor(id, title, author, pages, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read ;
    }
}

function displayCard(book) {
    const grid = document.querySelector(".grid")
    const card = document.createElement("div")
    card.className = "card"
    card.dataset.id = book.id
    grid.appendChild(card)
    card.innerHTML =
        `<h3>Title: ${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p class = "chck">Status: ${book.read? `Read` : `Not Read`}</p>
        <button class="dlt">Delete</button>
        <span class="read">Mark as Read<div class="checkbtn ${book.read ? "active" : ""}"></div></span>`
}

theme.addEventListener("click", () => {
    let check = document.body.dataset.theme
    if (check === "") {
        document.body.dataset.theme = "night"
    } else {
        document.body.dataset.theme = ""
    }
    theme.classList.toggle("active")
})

addBtn.addEventListener("click", () => {
    form.classList.toggle("active")
    overlay.classList.toggle("active")
})

overlay.addEventListener("click", () => {
    form.classList.toggle("active")
    overlay.classList.toggle("active")
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const title = document.getElementById("title").value
    const author = document.getElementById("author").value
    const pages = document.getElementById("pages").value
    const read = document.getElementById("read").checked

    const book = new Book(book_id, title, author, pages, read)
    book_id++
    
    displayCard(book)
    form.reset()
    overlay.click()

})

document.addEventListener("click", (e)=>{
    if (e.target.classList.contains("dlt")) {
        const dlt = e.target;
        const card = dlt.closest(".card");
        card.remove();
    } else if (e.target.classList.contains("checkbtn")) {
        const btn = e.target;
        btn.classList.toggle("active");
        const card = btn.closest(".card");
        const chck = card.querySelector(".chck");
        if (btn.classList.contains("active")) {
            chck.textContent = `Stat: Read`;
        } else {
            chck.textContent = `Stat: Not Read`;
        }
    }
})

document.addEventListener("keydown",(e)=>{
    if (e.key === "+") {
        addBtn.click()
    } else if (e.key === "m") {
        theme.click()
    }
})