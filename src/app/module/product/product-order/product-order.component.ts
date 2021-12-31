import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PetDTO } from 'src/app/dto/pet-dto';
import { ProductDTO } from 'src/app/dto/product-dto';
import { ProductImage } from 'src/app/model/product-image';
import { MessageResponse } from 'src/app/response/message-response';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {

  productDTO:ProductDTO | null = null;
  productImages?: ProductImage[];

  petDTOLikes?: PetDTO[];

  submitted = false;
  message?:string;

  quantityTotal: number = 0;

  isLoggedIn = false;
  email?: string;

  myForm = this.formBuilder.group({
    id: ['', [Validators.required]],
    quantity: [0, [Validators.required, Validators.min(1)]],
  });

  constructor(
    protected productService: ProductService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    protected cartService: CartService,
    protected cartDataService: CartDataService
    ) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params.id);
  }

  findById(id:any): void {
    this.productService.detail(id).subscribe(
      (res:HttpResponse<ProductDTO>) => {
        this.productDTO = res.body;
        
        if(this.productDTO) {
          this.updateForm(this.productDTO);
        }

        this.productImages = this.productDTO?.productImages;

        this.myForm.get("quantity")?.setValue(1);

        this.quantityTotal = this.myForm.value.quantity;

        if(this.productDTO) {

          let categoryId = this.productDTO.category?.id;
          let sale = this.productDTO.sale;
          let productId = this.productDTO.id;

          this.findByLike(categoryId, sale, productId);
        }
      }
    );

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.email = user.body.email;
    }
  }

  get f() {
    return this.myForm.controls;
  }

  onChange(): void {
    this.quantityTotal = this.myForm.value.quantity;

    if(this.productDTO?.quantityImport && this.quantityTotal > this.productDTO?.quantityImport) {
      Swal.fire('Thông báo', 'Số lượng sản phẩm nhiều hơn số lượng đang có', 'warning');
      this.myForm.get("quantity")?.setValue(1);
      this.quantityTotal = this.myForm.value.quantity;
    } else if(this.quantityTotal < 1) {
      Swal.fire('Thông báo', 'Số lượng sản phẩm phải lớn hơn 0', 'warning');
      this.myForm.get("quantity")?.setValue(1);
      this.quantityTotal = this.myForm.value.quantity;
    } else {
      this.quantityTotal = this.myForm.value.quantity;
    }
  }

  onSubmit(): void {

    if(this.email) {
      this.submitted = true;

      if (this.myForm.invalid) {
        return;
      }

      const formData: FormData = new FormData();

      formData.append('productId', JSON.stringify(this.myForm.value.id));
      formData.append('quantity', JSON.stringify(this.myForm.value.quantity));
      this.cartService.create(formData).subscribe(
        (response: HttpResponse<MessageResponse>) => {
          this.message = response.body?.message;

          if(this.message === 'success') {
            this.cartService.getQuantity().subscribe(
              (res: HttpResponse<MessageResponse>) => {
                let quantity = res.body?.message || ''
                this.cartDataService.changeData(quantity);

                if(quantity !== 'failed') {
                  Swal.fire('Thông báo', 'Thêm vào giỏ hàng thành công', 'success');
                }
              }
            );

          } else if(this.message === 'failed') {
            Swal.fire('Thông báo', 'Thêm vào giỏ hàng không thành công', 'error');
          }
        }
      )
    } else {
      Swal.fire('Thông báo', 'Bạn chưa đăng nhập hoặc đăng ký tài khoản', 'warning');
    }
  }

  updateForm(productDTO:ProductDTO): void {
    this.myForm.patchValue({
      id: productDTO.id
    });
  }

  onMinus(): void {
    this.quantityTotal = this.quantityTotal - 1;

    if(this.quantityTotal < 1) {
      Swal.fire('Thông báo', 'Số lượng sản phẩm phải lớn hơn 0', 'warning');
      this.myForm.get("quantity")?.setValue(1);
      this.quantityTotal = this.myForm.value.quantity;
    } else {
      this.myForm.get("quantity")?.setValue( this.quantityTotal);
    }
  }

  onPlus(): void {
    this.quantityTotal = this.quantityTotal + 1;

    if(this.productDTO?.quantityImport && this.quantityTotal > this.productDTO?.quantityImport) {
      Swal.fire('Thông báo', 'Số lượng sản phẩm nhiều hơn số lượn đang có', 'warning');

      this.myForm.get("quantity")?.setValue(1);
    } else {
      this.myForm.get("quantity")?.setValue( this.quantityTotal);
    }
  }

  findByLike(categoryId?: number, sale?: number, productId?: number): void {
    this.productService.findTByProductLike({categoryId: categoryId, sale: sale, productId: productId}).subscribe(
      (res: HttpResponse<PetDTO[]>) => {
        this.petDTOLikes = res.body || [];
      }
    );
  }

  onClickLink(id:any): void {
    this.findById(id);
  }
}
