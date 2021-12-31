import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCategoryComponent } from './list-category.component';

const routes: Routes = [{ path: '', component: ListCategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListCategoryRoutingModule { }
