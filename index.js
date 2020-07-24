let myLibrary = JSON.parse(localStorage.getItem('book-library-data')) || [];
const saveData = (arr) => {
    localStorage.setItem('book-library-data', JSON.stringify(arr));
  };

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function(){
    if(this.read == "Yes")
        return `${this.title} by ${this.author}, ${this.pages} pages, already read`;
    else{
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
    }
}

document.getElementById("submit").addEventListener("click", addBookToLibrary)
document.addEventListener("DOMContentLoaded", render);
function addBookToLibrary() {

    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const pages = document.getElementById("book-pages").value;
    const read = document.querySelector('input[name="read"]:checked').value;
  
    let book = new Book(title, author, pages, read)
        myLibrary.push(book)
    
        saveData(myLibrary);
        render()
        clearInput()
   }

   function render(){
       let output;
       JSON.parse(localStorage["book-library-data"]).forEach(element => {
            output += `
            <div class="card ml-3 mb-3" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">Title: ${element.title}</h5>
                <p class="card-text">Author: ${element.author}</p>
                <p class="card-text">Pages: ${element.pages}</p>
                <p class="card-text">Read: ${element.read}</p>
                <a href="#" class="btnEdit btn btn-secondary" data-id="">Edit</a>
                <a href="#" class="btnDelete btn btn-danger" onclick="deleteItem">Delete</a>
                </div>
            </div>
            `;
        })

        document.getElementById("bookslist").innerHTML = output;
   }

   function clearInput(){
     document.getElementById("book-title").value = " "
     document.getElementById("book-author").value = " "
     document.getElementById("book-pages").value = " "
   }