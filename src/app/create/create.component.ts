import { BookDto } from './../dtos/books.dto';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ["",[Validators.required, Validators.maxLength(30)]],
      author: ["",[Validators.required, Validators.maxLength(30)]],
      description: ["",[Validators.required]],
    })

  }





  submit(){
    Object.keys(this.form.controls).forEach(key => this.form.controls[key].markAsDirty());

    if (this.form.invalid) return;

    const {title, author, description} = this.form.value;

    const bookDto : BookDto = {
      title: title,
      author: author,
      description: description,
      id: 0
    }

    this.bookService.add(bookDto).subscribe(
      res => {
        this.toastrService.success("Create new product successfully!", bookDto.title);
        this.form.reset();
        this.form.patchValue({
          name: "",
          category: 1,
          price: 0
        })
      },
      error => this.toastrService.error(error.message)
    )
  }
}
