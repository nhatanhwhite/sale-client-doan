import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPostRoutingModule } from './list-post-routing.module';
import { ListPostComponent } from './list-post.component';
import { ListPostPipe } from './limit-pipe/list-post-pipe';


@NgModule({
  declarations: [ListPostComponent, ListPostPipe],
  imports: [
    CommonModule,
    ListPostRoutingModule
  ]
})
export class ListPostModule { }
