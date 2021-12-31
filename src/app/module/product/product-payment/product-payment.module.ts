import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPaymentRoutingModule } from './product-payment-routing.module';
import { ProductPaymentComponent } from './product-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProductPaymentComponent],
  imports: [
    CommonModule,
    ProductPaymentRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class ProductPaymentModule { }
