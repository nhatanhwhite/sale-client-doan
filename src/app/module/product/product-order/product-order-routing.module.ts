import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductOrderComponent } from './product-order.component';

const routes: Routes = [{ path: '', component: ProductOrderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductOrderRoutingModule { }
