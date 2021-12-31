import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../../service/shopping-cart.service';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {MessageResponse} from '../../response/message-response';
import Swal from 'sweetalert2';
import {OrderService} from '../../service/order.service';
import {Order} from '../../model/Order';
import {Router} from '@angular/router';
import {DataSharingService} from '../../service/data-sharing.service';

@Component({
  selector: 'app-shopping-payment',
  templateUrl: './shopping-payment.component.html',
  styleUrls: ['./shopping-payment.component.css']
})
export class ShoppingPaymentComponent implements OnInit {
  totalAmount = 0;
  message?: string;
  submitted = false;
  myForm = this.formBuilder.group({
    customerName: ['', [Validators.required, Validators.maxLength(50)]],
    customerEmail: ['', [Validators.required, Validators.maxLength(255)], Validators.email],
    customerPhone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    address: ['', [Validators.required, Validators.maxLength(255)]]
  });

  constructor(private cartService: ShoppingCartService,
              private orderService: OrderService,
              private router: Router,
              private dataSharingService: DataSharingService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.totalAmount = this.cartService.getTotal();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }
    if( this.cartService.getItems().length === 0) {
      Swal.fire('Thông báo', 'Không có sản phẩm', 'error');
      return;
    }
    const order = new Order();
    order.customerName = this.myForm.controls['customerName'].value;
    order.customerEmail = this.myForm.controls['customerEmail'].value;
    order.customerPhone = this.myForm.controls['customerPhone'].value;
    order.address = this.myForm.controls['address'].value;
    order.orderDetail = this.cartService.getItems();
    this.orderService.create(order).subscribe(
      (res: HttpResponse<MessageResponse>) => {
        this.message = res.body?.message;

        if (this.message === 'successfully') {
          Swal.fire('Thông báo', 'Đặt hàng thành công', 'success').then(() => {
            // this.router.onSameUrlNavigation = 'reload';
            this.cartService.clearCart();
            this.dataSharingService.total.next(this.cartService.getItems().length);
            this.router.navigate(['/home/main']);

            // @ts-ignore
            // this.document.defaultView.location.reload();
          });;
          // this.router.navigate(['/home/main']);
        } else if (this.message === 'emailExisted') {
          Swal.fire('Thông báo', 'Email đã đăng ký', 'error');
        } else if (this.message === 'phoneExisted') {
          Swal.fire('Thông báo', 'Số điện thoại đã đăng ký', 'error');
        } else if (this.message === 'failed') {
          Swal.fire('Thông báo', 'Đăng ký không thành công', 'error');
        }
      }
    );
  }

  get f() {
    return this.myForm.controls;
  }

}
