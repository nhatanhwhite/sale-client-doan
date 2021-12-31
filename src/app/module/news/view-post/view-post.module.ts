import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPostRoutingModule } from './view-post-routing.module';
import { ViewPostComponent } from './view-post.component';
import { ViewPostPipe } from './limit-view-post/view-post-pipe';


@NgModule({
  declarations: [ViewPostComponent, ViewPostPipe],
  imports: [
    CommonModule,
    ViewPostRoutingModule
  ]
})
export class ViewPostModule { }
