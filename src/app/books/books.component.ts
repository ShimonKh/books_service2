import {Component, OnInit} from '@angular/core';

import {BooksService} from "../shared/services/books.service";
import {Book} from "../shared/models/books.models";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(private booksService: BooksService,) {
  }

  ngOnInit() {
    if (localStorage.getItem('books')) {
      this.books = JSON.parse(localStorage.getItem('books'));
    }
    else {
      this.booksService.getAllBooks()
        .subscribe((books) => {
          localStorage.setItem("books", JSON.stringify(books.books));
          this.books = books.books;
        })
    }

  }

  updateEditedBook(event: Book) {
    this.replaceProperty(this.books.find((obj) => ( obj.id === event.id)), event);
    localStorage.setItem("books", JSON.stringify(this.books));
  }

  replaceProperty(currentBook, editedBook) {
    for (let property in editedBook) {
      currentBook[property] = editedBook[property]
    }
  }

  deleteCurrentBook(book) {
    this.books.splice(this.books.indexOf(book), 1);
    localStorage.setItem("books", JSON.stringify(this.books));
  }

  addBook(book: Book) {
    this.books.push(book);
    localStorage.setItem("books", JSON.stringify(this.books));
  }

}
