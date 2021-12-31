import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateDiscountCodeComponent } from './update-discount-code.component';

const routes: Routes = [{ path: '', component: UpdateDiscountCodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateDiscountCodeRoutingModule { }
