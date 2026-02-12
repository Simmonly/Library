const myLibrary = [];

function Book(title, author,pages,  read) {
  this.id = crypto.randomUUID()
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read

}
Book.prototype.toggleRead = function () {
  this.read = !this.read;
}

function addBookToLibrary(title, author,pages, read) {
  const book = new Book(title, author, pages, read)
  myLibrary.push(book)
}


addBookToLibrary("Harry potter", "J. K. Rowling", 500, false)
addBookToLibrary("Think and Grow Rich", "Napoleon Hill",350, true)

for (const book of myLibrary){
  console.table(book)
}

function renderLibrary(){
  const libraryDiv = document.querySelector("#library");
  libraryDiv.innerHTML = "";

  for (const book of myLibrary){
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id
    
    const title = document.createElement("h3");
    title.textContent = book.title

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;

    const read = document.createElement("p");
    read.textContent = book.read? "Read": "Not read";

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.dataset.action = "remove"

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle Read";
    toggleBtn.dataset.action = "toggle";

    card.append(title, author, pages, read, toggleBtn, removeBtn);
    libraryDiv.appendChild(card);
  }

}

document.querySelector("#library").addEventListener("click", (e) =>{
  const action = e.target.dataset.action;
  if (!action) return;

  const card = e.target.closest(".book-card");
  if (!card) return;

  const bookId = card.dataset.id;
  const book = myLibrary.find(b => b.id === bookId);
  if (!book) return;

  if(action === "toggle"){
    book.toggleRead();
  }
  else if (action === "remove"){
    const index = myLibrary.findIndex(b => b.id === bookId);
    if (index !== -1) myLibrary.splice(index, 1);
  }
  renderLibrary();

  })
renderLibrary();
