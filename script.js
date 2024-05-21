const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.setAttribute('data-index', index);

        bookDiv.innerHTML = `
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
            <button class="remove-btn">Remove</button>
            <button class="toggle-read-btn"> Read Status</button>
        `;

        libraryDiv.appendChild(bookDiv);
    });

    addBookEventListeners();
}

function addBookEventListeners() {
    const removeButtons = document.querySelectorAll('.remove-btn');
    const toggleReadButtons = document.querySelectorAll('.toggle-read-btn');

    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.parentNode.getAttribute('data-index');
            myLibrary.splice(index, 1);
            displayBooks();
        });
    });

    toggleReadButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.parentNode.getAttribute('data-index');
            myLibrary[index].toggleReadStatus();
            displayBooks();
        });
    });
}

document.getElementById('new-book-btn').addEventListener('click', () => {
    document.getElementById('form-container').classList.toggle('hidden');
});

document.getElementById('book-form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    document.getElementById('book-form').reset();
    document.getElementById('form-container').classList.add('hidden');
});

displayBooks();
