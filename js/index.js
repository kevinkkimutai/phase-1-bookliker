document.addEventListener("DOMContentLoaded", function() {
    const bookListContainer = document.getElementById("list-panel")
    const bookContainer = document.getElementById("list")
    const bookDataContainer = document.getElementById("show-panel")

    function getBooks() {
        fetch("http://localhost:3000/books")
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            data.forEach(element => {
                displayBookTitle(element)
            });
        })
    }

    function displayBookTitle(book) {
        const li = document.createElement("li")
        li.innerText = book.title
        bookContainer.append(li)
        li.addEventListener("click", () => {
            bookDataContainer.innerHTML = ''
            displayBookInfo(book)
        })
    }

    function displayBookInfo(book) {
        const div = document.createElement("div")
        const bookItem = `
            <img src="${book.img_url}">
            <h2>${book.author}</h2>
            <h3>${book.title}</h3>
            <h4>${book.subtitle}</h4>
            <p>${book.description}</p>
            <h3>This book has been liked By: </h3>
        `
        const ul = document.createElement("ul")
        book.users.forEach(user => {
            // console.log(user)
            const li = document.createElement("li")
            li.innerText = user.username
            ul.append(li)
        })
        const button = document.createElement("button")
        button.innerText = "Like"
        div.innerHTML = bookItem
        div.append(ul)
        div.append(button)
        bookDataContainer.append(div)

        button.addEventListener("click", () => {
            handleBtnClick(book.id, book.users)
        })
        
    }
    getBooks()

    
    fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(data => console.log(data))

    function handleBtnClick(id, users) {
        const userInfo = {
            users: [
                ...users,
                {
                    id: (users.length+1),
                    username: "collins"
                }
            ]
        }
        fetch(`http://localhost:3000/books/${id}`, {
            method: 'PATCH', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }
});