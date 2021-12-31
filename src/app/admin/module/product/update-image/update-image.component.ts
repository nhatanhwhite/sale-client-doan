import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductDTO } from 'src/app/dto/product-dto';
import { ProductImage } from 'src/app/model/product-image';
import { MessageResponse } from 'src/app/response/message-response';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {

  productDTO:ProductDTO | null = null;
  productImages?: ProductImage[];

  submitted = false;
  message?:string;

  selectedFiles?: FileList;
  files:any[] = [];
  imgURLs:any[] = [];

  myForm = this.formBuilder.group({
    id: ['', [Validators.required]],
  });

  constructor(
    protected productService: ProductService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder, 
  ) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params.id);
  }

  findById(id:any): void {
    this.productService.view(id).subscribe(
      (res:HttpResponse<ProductDTO>) => {
        this.productDTO = res.body;
        if(this.productDTO) {
          this.updateForm(this.productDTO);
        }

        this.productImages = this.productDTO?.productImages;
      }
    );
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
   
    if(this.selectedFiles) {
      if(this.files.length + this.selectedFiles?.length > 3) {
        Swal.fire('Thông báo', 'Bạn chỉ được chọn tối đa 3 bức ảnh', 'warning');
      } else {
        for(let i = 0; i < this.selectedFiles.length; i++) {
          let file: File | null = this.selectedFiles.item(i);
          
          if(file) {
            this.files?.push(file);
  
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
             this.imgURLs?.push({base64String: reader.result})
            };
          }
        }
      }
    }
  }

  deleteImage(i:any): void {
      this.imgURLs?.forEach((item, index) => {
        if (index === i) {
          this.imgURLs.splice(index, 1);
          this.files.splice(index, 1);
        }
      });
  }

  get f() {
    return this.myForm.controls;
  }

  updateForm(productDTO: ProductDTO): void {
    this.myForm.patchValue({
      id: productDTO.id
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    const formData: FormData = new FormData();

    if (this.files.length === 0) {
      Swal.fire('Thông báo', 'Bạn phải chọn ít nhất 1 bước ảnh cho sản phẩm', 'error');
    } else {
      this.files?.forEach((item, index) => {
        formData.append('files', item);
      });
      formData.append('id', JSON.stringify(this.myForm.value.id));
      
      console.log(this.myForm.value.id);
      this.productService.updateImage(formData).subscribe(
        (response: HttpResponse<MessageResponse>) => {
          this.message = response.body?.message;

          if(this.message === 'success') {
            Swal.fire('Thông báo', 'Cập nhật ảnh sản phẩm thành công', 'success');
          } else if(this.message === 'failed') {
            Swal.fire('Thông báo', 'Cập nhật sản phẩm không thành công', 'error');
          }
        }
      )
      }
  }

  onBack(): void {
    window.history.back();
  }

}
