import { BookService } from './../services/book.service';
import { BookDto } from './../dtos/books.dto';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  title = 'Book list';

  books: BookDto[] = [];

  constructor(
    private _bookService: BookService,
    private toastrService: ToastrService
    ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks():void {
    this._bookService.getList().subscribe(
      res => this.books = res
    )
  }

  delete(dto: BookDto): void {
    if (confirm('Are you sure?')) {
      this._bookService.delete(dto.id).subscribe(
        res => this.books = this.books.filter(d => d != dto),
        error => alert('Error!')
      )
    }
  }

}
