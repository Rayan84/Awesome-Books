class AwesomeBooks {
  constructor() {
    this.bookArray = [];
  }

  addBook(booktitle, bookauthor) {
    const book = {
      title: booktitle,
      author: bookauthor,
    };

    let shouldAdd = true;
    if (booktitle && bookauthor) {
      this.bookArray.forEach((b) => {
        if (b.title === booktitle) {
          shouldAdd = false;
        }
      });

      if (shouldAdd) {
        this.bookArray.push(book);
      }
    }
  }

  removeBook(title) {
    this.bookArray = this.bookArray.filter((book) => book.title !== title);
  }

  saveToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.bookArray));
  }

  populateTable() {
    const tableList = document.getElementById('bookList');

    this.bookArray.forEach((book) => {
      const tr = document.createElement('tr');
      tr.className = 'table-row';
      const td = document.createElement('td');
      td.className = 'table-entry';

      td.innerHTML = `<span>${book.title}</span> by ${book.author}`;

      const removeButton = document.createElement('button');
      removeButton.className = 'removeButton';
      removeButton.type = 'button';
      removeButton.innerHTML = 'Remove';

      removeButton.addEventListener('click', (e) => {
        const title = e.target.parentNode.firstChild.textContent;
        this.removeBook(title);
        this.saveToLocalStorage();
        window.location.reload();
      });

      td.appendChild(removeButton);
      tr.appendChild(td);
      tableList.appendChild(tr);
    });
  }

  handleSubmit() {
    const form = document.getElementById('form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleInput = document.getElementById('book_title');
      const authorInput = document.getElementById('book_author');
      this.addBook(titleInput.value, authorInput.value);
      this.saveToLocalStorage();
      titleInput.value = '';
      authorInput.value = '';
      window.location.reload();
    });
  }

insertDateTime = () => {
  // eslint-disable-next-line
  const DateTime = luxon.DateTime.now();
  const timeDisplay = document.getElementById('time-display');
  timeDisplay.innerHTML = DateTime;
};

reloadPage() {
  window.onload = () => {
    if (localStorage.getItem('books') !== null) {
      this.bookArray = JSON.parse(localStorage.getItem('books'));
      this.populateTable();
      this.insertDateTime();
    }
  };
}
}

// eslint-disable-next-line
browsePages = (num) => {
  const section = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  for (let i = 0; i < section.length; i += 1) {
    section[i].style.display = 'none';
    navLinks[i].style.color = 'black';
  }
  section[num].style.display = 'block';
  navLinks[num].style.color = 'blue';
};

const books = new AwesomeBooks();
books.handleSubmit();
books.reloadPage();
