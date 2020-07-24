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
document.getElementById("new-book").addEventListener("click", newBookForm)
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
       let output = "";
       for(let i = 0; i < myLibrary.length; i++){
            output += `
            <div class="card ml-3 mb-3">
                <div class="card-body">
                <h5 class="card-title">Title: ${myLibrary[i].title}</h5>
                <p class="card-text">Author: ${myLibrary[i].author}</p>
                <p class="card-text">Pages: ${myLibrary[i].pages}</p>
                <p class="card-text">Already Read: ${myLibrary[i].read}</p>
                <a href="#" class="btnEdit btn btn-secondary" onclick="updateRead(${i})">Change Status</a>
                <a href="#" class="btnDelete btn btn-danger" onclick="deleteItem(${i})">Delete</a>
                </div>
            </div>
            `;
        }

        document.getElementById("bookslist").innerHTML = output;
   }

   function deleteItem(index){
        myLibrary.splice(index, 1)
        updatesDB()
        render()
   }

   function updateRead(index){
    let book = myLibrary[index]
        if(book.read == "No"){
            book.read = "Yes"
            updatesDB()
            render()
        }else if(book.read == "Yes"){
            book.read = "No"
            updatesDB()
            render()
        }
   }

   function clearInput(){
     document.getElementById("book-title").value = " "
     document.getElementById("book-author").value = " "
     document.getElementById("book-pages").value = " "
   }

   const modal = document.getElementById("books-form")
   
   function newBookForm(){
        modal.classList.toggle('toggle-two');
   }

   function updatesDB(){
    return localStorage["book-library-data"] = JSON.stringify(myLibrary)
   }