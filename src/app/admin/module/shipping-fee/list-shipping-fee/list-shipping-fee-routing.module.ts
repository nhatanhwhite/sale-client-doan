import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListShippingFeeComponent } from './list-shipping-fee.component';

const routes: Routes = [{ path: '', component: ListShippingFeeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListShippingFeeRoutingModule { }
