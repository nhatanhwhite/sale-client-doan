import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-payment',
  templateUrl: './product-payment.component.html',
  styleUrls: ['./product-payment.component.css']
})
export class ProductPaymentComponent implements OnInit {

  submitted = false;
  message?: string;

  constructor( private formBuilder: FormBuilder) { }

  myForm = this.formBuilder.group({
    id:  ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', [Validators.required, Validators.maxLength(30)]],
    phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    specificAddress: ['',[Validators.required, Validators.maxLength(255)]],
    wards: ['', [Validators.required, Validators.maxLength(255)]],
    district: ['', [Validators.required, Validators.maxLength(255)]],
    province: ['', [Validators.required, Validators.maxLength(255)]]
  });

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
  }

}
