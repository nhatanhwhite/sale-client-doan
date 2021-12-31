import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { Thoroughbred } from 'src/app/model/thoroughbred';
import { MessageResponse } from 'src/app/response/message-response';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { ThoroughbredService } from 'src/app/service/thoroughbred.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product:Product | null = null;

  submitted = false;
  message?:string;

  categories?:Category[];
  thoroughbreds?:Thoroughbred[];

  myForm = this.formBuilder.group({
    id: ['', [Validators.required]],
    productName: ['', [Validators.required, Validators.maxLength(255)]],
    introduce: ['', [Validators.required, Validators.maxLength(500)]],
    description: ['', [Validators.required, Validators.maxLength(5000)]],
    priceImport: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    priceSell: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    quantityImport: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]],
    quantitySell: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    sale: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    thoroughbredId: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder, 
    protected productService: ProductService,
    protected categoryService: CategoryService,
    protected thoroughbredService:ThoroughbredService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params.id);
    
    this.findAllCategory();
    this.findAllThoroughbred();
  }

  findAllCategory(): void {
    this.categoryService.findAll().subscribe(
      (res:HttpResponse<Category[]>) => {
        this.categories = res.body || [];
      }
    )
  }

  findAllThoroughbred(): void {
    this.thoroughbredService.findAll().subscribe(
      (res:HttpResponse<Thoroughbred[]>) => {
        this.thoroughbreds = res.body || [];
      }
    )
  }


  findById(id:any): void {
    this.productService.findById(id).subscribe(
      (res:HttpResponse<Product>) => {
        this.product = res.body;
        if(this.product) {
          this.updateForm(this.product);
        }
      }
    );
  }

  get f() {
    return this.myForm.controls;
  }

  updateForm(product: Product): void {
    this.myForm.patchValue({
      id: product.id,
      productName: product.productName,
      introduce: product.introduce,
      description: product.description,
      priceImport: product.priceImport,
      priceSell: product.priceSell,
      quantityImport: product.quantityImport,
      quantitySell: product.quantitySell,
      sale: product.sale,
      thoroughbredId: product.thoroughbred?.id,
      categoryId: product.category?.id

    });
  }


  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    let product:Product = {
      id: this.myForm.value.id,
      productName: this.myForm.value.productName,
      introduce:  this.myForm.value.introduce,
      description:  this.myForm.value.description,
      priceImport:  this.myForm.value.priceImport,
      priceSell:  this.myForm.value.priceSell,
      quantityImport:  this.myForm.value.quantityImport,
      quantitySell: this.myForm.value.quantitySell,
      sale:  this.myForm.value.sale,
    }

    const formData: FormData = new FormData();

    formData.append('category', JSON.stringify(this.myForm.value.categoryId));
    formData.append('thoroughbred', JSON.stringify(this.myForm.value.thoroughbredId));
    formData.append('product', JSON.stringify(product));

    this.productService.update(formData).subscribe(
      (response: HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Cập nhật sản phẩm thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Cập nhật sản phẩm không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }

}
