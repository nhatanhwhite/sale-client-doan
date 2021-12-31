import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageResponse } from 'src/app/response/message-response';
import { CategoryNewsService } from 'src/app/service/category-news.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category-news',
  templateUrl: './add-category-news.component.html',
  styleUrls: ['./add-category-news.component.css']
})
export class AddCategoryNewsComponent implements OnInit {

  submitted = false;
  message?:string;

  myForm = this.formBuilder.group({
    categoryName: ['', [Validators.required, Validators.maxLength(50)]],
  });

  constructor(private formBuilder: FormBuilder, protected categoryNewsService: CategoryNewsService) { }

  ngOnInit(): void {
  }

  get f() {
    return this.myForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.categoryNewsService.create(this.myForm.value).subscribe(
      (response: HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Thêm danh mục tin tức thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Thêm danh mục tin tức không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }

}
