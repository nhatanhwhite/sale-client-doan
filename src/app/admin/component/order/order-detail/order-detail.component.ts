import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../../../service/order.service';
import {HttpResponse} from '@angular/common/http';
import {Category} from '../../../../model/category';
import {Order} from '../../../../model/Order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: Order;
  constructor(private route: ActivatedRoute,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params.id);
  }

  findById(id: any): void {
    this.orderService.findById(id).subscribe(
      (res: HttpResponse<Order>) => {
        this.order = res.body;
        // if(this.category) {
        //   this.updateForm(this.category);
        // }
      }
    );
  }

  getTotalAmount(): number {
    let totalAmount = 0;
    for (const item of this.order.orderDetails) {
      totalAmount += item.product.priceSell * item.quantity;
    }
    return totalAmount;
  }

}
