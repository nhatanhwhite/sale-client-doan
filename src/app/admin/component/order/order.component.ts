import { Component, OnInit } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Category} from '../../../model/category';
import {CategoryService} from '../../../service/category.service';
import {OrderService} from '../../../service/order.service';
import {Order} from '../../../model/Order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders?: Order[];
  constructor(protected orderService: OrderService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.orderService.findAll().subscribe(
      (res: HttpResponse<Order[]>) => {
        this.orders = res.body || [];
      }
    );
  }

  thanhToan(id: any): void {
    this.orderService.thanhToan(id).subscribe(
      (res: HttpResponse<Order>) => {
        this.findAll();
      }
    );
  }
}
