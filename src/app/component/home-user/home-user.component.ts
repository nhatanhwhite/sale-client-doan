import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DataSharingService} from '../../service/data-sharing.service';
import {CartService} from '../../service/cart.service';
import {ShoppingCartService} from '../../service/shopping-cart.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  constructor(private router: Router,
              private dataSharingService: DataSharingService,
              private cartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    /*this.router.navigate(['/home/main']);*/
    this.dataSharingService.total.next(this.cartService.getItems().length);
  }

}
