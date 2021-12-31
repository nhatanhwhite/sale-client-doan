import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../service/order.service';
import {Order} from '../../model/Order';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders?: Order[];
  constructor(protected orderService: OrderService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.orderService.findAllByUser().subscribe(
      (res: HttpResponse<Order[]>) => {
        this.orders = res.body || [];
      }
    );
  }

}
