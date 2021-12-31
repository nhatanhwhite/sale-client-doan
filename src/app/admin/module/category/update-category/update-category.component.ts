import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/model/category';
import { MessageResponse } from 'src/app/response/message-response';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  category:Category | null = null;

  submitted = false;
  message?:string;

  myForm = this.formBuilder.group({
    id: ['', [Validators.required]],
    categoryName: ['', [Validators.required, Validators.maxLength(50)]],
  });

  constructor(
    private formBuilder: FormBuilder, 
    protected categoryService: CategoryService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params.id);
  }

  findById(id:any): void {
    this.categoryService.findById(id).subscribe(
      (res:HttpResponse<Category>) => {
        this.category = res.body;
        if(this.category) {
          this.updateForm(this.category);
        }
      }
    );
  }

  get f() {
    return this.myForm.controls;
  }

  updateForm(category: Category): void {
    this.myForm.patchValue({
      id: category.id,
      categoryName: category.categoryName
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.categoryService.update(this.myForm.value).subscribe(
      (response:HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Cập nhật danh mục sản phẩm thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Cập nhật danh mục sản phẩm không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }

}
