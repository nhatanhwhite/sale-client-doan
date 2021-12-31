import { Component, OnInit } from '@angular/core';
import {ShoppingCartDTO} from '../../dto/ShoppingCartDTO';
import {ShoppingCartService} from '../../service/shopping-cart.service';
import {TokenStorageService} from '../../service/token-storage.service';
import {Router} from '@angular/router';
import {DataSharingService} from '../../service/data-sharing.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  items: ShoppingCartDTO[] = [];
  isLoggedIn = false;
  total = 0;
  constructor(private cartService: ShoppingCartService,
              private tokenStorageService: TokenStorageService,
              private dataSharingService: DataSharingService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  onPayment(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/home/shopping-payment']);
    } else {
      this.router.navigate(['/home/login']);
    }
  }
  onRemove(productId: any): void {
    this.cartService.removeItem(productId);
    this.items = this.cartService.getItems();
    this.dataSharingService.total.next(this.cartService.getItems().length);
    this.total = this.cartService.getTotal();
  }
}
