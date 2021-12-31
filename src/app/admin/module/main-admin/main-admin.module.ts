import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainAdminRoutingModule } from './main-admin-routing.module';
import { MainAdminComponent } from './main-admin.component';


@NgModule({
  declarations: [MainAdminComponent],
  imports: [
    CommonModule,
    MainAdminRoutingModule
  ]
})
export class MainAdminModule { }
