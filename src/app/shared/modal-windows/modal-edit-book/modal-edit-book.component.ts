import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Book} from "../../models/books.models";

@Component({
  selector: 'app-modal-edit-book',
  templateUrl: './modal-edit-book.component.html',
  styleUrls: ['./modal-edit-book.component.css']
})
export class ModalEditBookComponent implements OnInit {
  AUTHOR_MAX_LENGTH = 120;
  TITLE_MAX_LENGTH = 120;
  form: FormGroup;
  @Input() book: Book;
  @Output() onEditedBook = new EventEmitter<any>();
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,) {}

  ngOnInit() {
    this.form = new FormGroup({
      'author': new FormControl(this.book.author, [Validators.required, Validators.maxLength(this.AUTHOR_MAX_LENGTH)]),
      'title': new FormControl(this.book.title, [Validators.required, Validators.maxLength(this.TITLE_MAX_LENGTH)], this.forbiddenTitles.bind(this)),
      'date': new FormControl(this.book.date, [Validators.required])
    });
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit() {
    const {author, title, date} = this.form.value;
    const editedBook = new Book(author, title, date, this.book.id);
      this.modalRef.hide();
      this.sendBook(editedBook);
  }

  sendBook(book) {
    this.onEditedBook.emit(book)
  }

  forbiddenTitles(control: FormControl) {
    return new Promise((req, res) => {
      if (this.ifBookExist(control.value)) {
        req({forbidden: true})
      }
      else {
        req(null);
      }
    });
  }

  ifBookExist(title) {
    return this.book.title !== title && JSON.parse(localStorage.getItem('books')).find((obj) => obj.title === title);
  }

}
