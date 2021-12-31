import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCategoryNewsComponent } from './add-category-news.component';

const routes: Routes = [{ path: '', component: AddCategoryNewsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCategoryNewsRoutingModule { }
