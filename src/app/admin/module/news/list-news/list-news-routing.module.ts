import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListNewsComponent } from './list-news.component';

const routes: Routes = [{ path: '', component: ListNewsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListNewsRoutingModule { }
