import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateNewsComponent } from './update-news.component';

const routes: Routes = [{ path: '', component: UpdateNewsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateNewsRoutingModule { }
