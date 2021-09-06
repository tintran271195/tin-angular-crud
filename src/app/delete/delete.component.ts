import {Location} from '@angular/common';
import { BookDto } from './../dtos/books.dto';
import { BookService } from './../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  books: BookDto[] = [];

  constructor(
    private bookService : BookService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ["",[Validators.required, Validators.maxLength(30)]],
      author: ["",[Validators.required, Validators.maxLength(30)]],
      description: ["",[Validators.required]],
    })

    this.id = this.route.snapshot.params.id;

    this.bookService.getById(this.id).subscribe(
      res => this.form.patchValue({
        title: res.title,
        author: res.author,
        description : res.description
      })
    )
  }

  submit(){
    Object.keys(this.form.controls).forEach(key => this.form.controls[key].markAsDirty());

    if (this.form.invalid) return;

    const {title, author, description} = this.form.value;

    const bookDto: BookDto = {
      title: title,
      author: author,
      description: description,
      id:0
    }

    this.bookService.delete(this.id).subscribe(
      res => {
        this.location.go('/list');
        this.toastrService.success("Delete book successfully!", bookDto.title);
      },
      error => this.toastrService.error(error.message)
    )
  }
}

