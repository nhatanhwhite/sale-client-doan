import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageResponse } from 'src/app/response/message-response';
import { ShippingFeeService } from 'src/app/service/shipping-fee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-shipping-fee',
  templateUrl: './add-shipping-fee.component.html',
  styleUrls: ['./add-shipping-fee.component.css']
})
export class AddShippingFeeComponent implements OnInit {

  submitted = false;
  message?:string;

  myForm = this.formBuilder.group({
    address: ['', [Validators.required, Validators.maxLength(50)]],
    shippingFee: ['', [Validators.required, Validators.max(1000000000), Validators.min(0)]],
  });

  constructor(private formBuilder: FormBuilder, protected shippingFeeService: ShippingFeeService) { }

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

    this.shippingFeeService.create(this.myForm.value).subscribe(
      (response: HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Tạo phí vận chuyển thành thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Tạo phí vận chuyển không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }

}
