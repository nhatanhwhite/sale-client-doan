import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../service/product.service';
import {CategoryService} from '../../service/category.service';
import {ShareDataService} from '../../service/share-data.service';
import {PetDTO} from '../../dto/pet-dto';
import {HttpResponse} from '@angular/common/http';
import {ProductDTO} from '../../dto/product-dto';
import {ShoppingCartService} from '../../service/shopping-cart.service';
import Swal from 'sweetalert2';
import {ShoppingCartDTO} from '../../dto/ShoppingCartDTO';
import {DOCUMENT} from '@angular/common';
import {DataSharingService} from '../../service/data-sharing.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId?: string;
  private sub: any;
  productDTO = new ProductDTO();
  productRelates: PetDTO[] = [];
  quantity = 1;
  tourForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private router: Router,
              protected productService: ProductService,
              protected categoryService: CategoryService,
              protected shareDataService: ShareDataService,
              protected dataSharingService: DataSharingService,
              private cartService: ShoppingCartService,
              private formBuilder: FormBuilder,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.tourForm = this.formBuilder.group({
      quantity: '',
    });
    this.sub = this.route.params.subscribe(params => {
      this.productId = params['productId']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      console.log('id', this.productId);
      this.findProduct();
    });

  }

  findProduct(): void {
    this.productService.detail(this.productId).subscribe(
      (res: HttpResponse<ProductDTO>) => {
        // @ts-ignore
        this.productDTO = res.body || [];
        this.findProductByCate(this.productDTO.category.id);
      }
    );
  }

  findProductByCate(id: any): void {
    this.productService.findByCategory(id).subscribe(
      (res: HttpResponse<PetDTO[]>) => {
        // @ts-ignore
        this.productRelates = res.body || [];
      }
    );
  }

  addToCart(item: ProductDTO): void {
    const tour: any = this.tourForm.value;

    console.log(tour);
    console.log("object", this.quantity);
    if ((tour.quantity > item.inventory)) {
      Swal.fire('Cảnh Báo', 'Không được nhập quá số lượng trong kho', 'warning');
    } else if(tour.quantity <= 0 ) {
      Swal.fire('Cảnh Báo', 'Số lượng đặt hàng phải lớn hơn 0', 'warning');
    } else {
      const cartItem: ShoppingCartDTO = {
        quantity: tour.quantity,
        productId: this.productId,
        productDTO: this.productDTO
      };

      this.cartService.addToCart(cartItem);
      Swal.fire('Thông báo', 'Thêm vào giỏ hàng thành công', 'success').then(() => {
        // this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/home/shopping-cart']);
        this.dataSharingService.total.next(this.cartService.getItems().length);
        this.dataSharingService.items.next(this.cartService.getItems());
        // @ts-ignore
        this.document.defaultView.location.reload();
      });
      // window.alert('Your product has been added to the cart!');
    }

  }
  onMinus(): void {
    if (this.quantity === 1) {
      Swal.fire('Thông báo', 'Số lượng sản phẩm phải lớn hơn 0', 'warning');
      // this.quantityTotal = this.myForm.value.quantity;
    } else {
      this.quantity = this.quantity - 1;
    }



  }

  onPlus(): void {
    this.quantity = this.quantity + 1;

    // if (this.productDTO?.quantityImport && this.quantity > this.productDTO?.quantityImport) {
    //   Swal.fire('Thông báo', 'Số lượng sản phẩm nhiều hơn số lượn đang có', 'warning');
    //   this.quantity = 1;
    //   // this.myForm.get("quantity")?.setValue(1);
    // } else {
    //   // this.myForm.get("quantity")?.setValue( this.quantityTotal);
    // }
  }
}
