import { BookDto } from './../dtos/books.dto';
import { BookService } from './../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form!: FormGroup;
  id!: string;

  constructor(
    private bookService : BookService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private route: ActivatedRoute
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

    this.bookService.update(this.id, bookDto).subscribe(
      res => {
        this.toastrService.success("Update   product successfully!", bookDto.title);
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

