import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartTotalDTO } from 'src/app/dto/cart-total-dto';
import { MessageResponse } from 'src/app/response/message-response';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartService } from 'src/app/service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  cartTotalDTO: CartTotalDTO | null = null;
  message?: string;
  id?: number;

  constructor(
    protected cartService: CartService, 
    protected cartDataService: CartDataService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.cartService.findAll().subscribe(
      (res:HttpResponse<CartTotalDTO>) => {
        this.cartTotalDTO = res.body;
      }
    )
  }

  onMinus(id: any, quantity: any): void {
    if(quantity === '1') {
      Swal.fire('Thông báo', 'Số lượng sản phẩm phải lơn hơn 0', 'warning');
    } else {
      let curentQuantity = parseInt(quantity);
      curentQuantity =  curentQuantity - 1;

      const formData: FormData = new FormData();

      formData.append('id', JSON.stringify(id));
      formData.append('quantity', JSON.stringify(curentQuantity));

      this.cartService.update(formData).subscribe(
        (res: HttpResponse<MessageResponse>) => {
          this.message = res.body?.message;

          if(this.message === 'success') {
            this.findAll();

            this.cartService.getQuantity().subscribe(
              (res: HttpResponse<MessageResponse>) => {
                let quantity = res.body?.message || ''
                this.cartDataService.changeData(quantity);
              }
            );
          } else {
            Swal.fire('Thông báo', 'Cập nhập giỏ hàng không thành công', 'error');
          }
        }
      );
    }
    
  }

  onPlus(id: any, quantity: any): void {
    let curentQuantity = parseInt(quantity);
      curentQuantity =  curentQuantity + 1;

      const formData: FormData = new FormData();

      formData.append('id', JSON.stringify(id));
      formData.append('quantity', JSON.stringify(curentQuantity));

      this.cartService.update(formData).subscribe(
        (res: HttpResponse<MessageResponse>) => {
          this.message = res.body?.message;

          if(this.message === 'success') {
            this.findAll();
            
            this.cartService.getQuantity().subscribe(
              (res: HttpResponse<MessageResponse>) => {
                let quantity = res.body?.message || ''
                this.cartDataService.changeData(quantity);
              }
            );
          } else {
            Swal.fire('Thông báo', 'Cập nhập giỏ hàng không thành công', 'error');
          }
        }
      );
  }

  onChangeValue(id: any, event: any): void {
    let curentQuantity = parseInt(event.target.value);

    if(curentQuantity < 1) {
      Swal.fire('Thông báo', 'Số lượng sản phẩm phải lơn hơn 0', 'warning');
      curentQuantity = 1;
    } 

    const formData: FormData = new FormData();

      formData.append('id', JSON.stringify(id));
      formData.append('quantity', JSON.stringify(curentQuantity));

      this.cartService.update(formData).subscribe(
        (res: HttpResponse<MessageResponse>) => {
          this.message = res.body?.message;

          if(this.message === 'success') {
            this.findAll();

            this.cartService.getQuantity().subscribe(
              (res: HttpResponse<MessageResponse>) => {
                let quantity = res.body?.message || ''
                this.cartDataService.changeData(quantity);
              }
            );
          } else {
            Swal.fire('Thông báo', 'Cập nhập giỏ hàng không thành công', 'error');
          }
        }
      );
    
  }

  onDelete(id: any): void {
    this.id = id;
  }

  confirmDelete(): void {
    this.cartService.delete(this.id).subscribe(
      (res: HttpResponse<MessageResponse>) => {
        this.message = res.body?.message || '';

        if(this.message === 'success') {
          this.cartService.getQuantity().subscribe(
            (res: HttpResponse<MessageResponse>) => {
              let quantity = res.body?.message || ''
              this.cartDataService.changeData(quantity);
            }
          );
          
          Swal.fire('Thông báo', 'Xóa một mặt hàng thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Xóa một mặt hàng không thành công', 'error');
        }
        
        this.findAll()
      }
    )
  }

}
