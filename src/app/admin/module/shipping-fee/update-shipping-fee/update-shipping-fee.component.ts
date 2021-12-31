import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ShippingFee } from 'src/app/model/shipping-fee';
import { MessageResponse } from 'src/app/response/message-response';
import { ShippingFeeService } from 'src/app/service/shipping-fee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-shipping-fee',
  templateUrl: './update-shipping-fee.component.html',
  styleUrls: ['./update-shipping-fee.component.css']
})
export class UpdateShippingFeeComponent implements OnInit {

  shippingFee:ShippingFee | null = null;

  submitted = false;
  message?:string;

  myForm = this.formBuilder.group({
    id: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.maxLength(50)]],
    shippingFee: ['', [Validators.required, Validators.max(1000000000), Validators.min(0)]],
  });

  constructor(
    private formBuilder: FormBuilder, 
    protected shippingFeeService: ShippingFeeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params.id);
  }

  findById(id:any): void {
    this.shippingFeeService.findById(id).subscribe(
      (res:HttpResponse<ShippingFee>) => {
        this.shippingFee = res.body;
        if(this.shippingFee) {
          this.updateForm(this.shippingFee);
        }
      }
    );
  }

  get f() {
    return this.myForm.controls;
  }

  updateForm(shippingFee: ShippingFee): void {
    this.myForm.patchValue({
      id: shippingFee.id,
      address: shippingFee.address,
      shippingFee: shippingFee.shippingFee
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.shippingFeeService.update(this.myForm.value).subscribe(
      (response:HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Cập nhật phí vận chuyển thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Cập nhật phí vận chuiyển không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }


}
