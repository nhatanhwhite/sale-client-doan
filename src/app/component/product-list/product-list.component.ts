import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../service/product.service';
import {CategoryService} from '../../service/category.service';
import {ShareDataService} from '../../service/share-data.service';
import {HttpResponse} from '@angular/common/http';
import {PetDTO} from '../../dto/pet-dto';
import {Category} from '../../model/category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  categoryId?: any;
  searchName: string;
  type: string;
  private sub: any;
  products?: PetDTO[];
  categories?: Category[];
  constructor(private route: ActivatedRoute,
              protected productService: ProductService,
              protected categoryService: CategoryService,
              protected shareDataService: ShareDataService) { }

  ngOnInit(): void {
    // this.categoryId = this.route.snapshot.params.categoryId;
    // console.log('testtt');
    this.route.queryParams.subscribe(params => {
      this.type = params['type'];
      this.searchName = params['name'];
      console.log('searchName=' + this.searchName);
      this.findProducts();
    });

    this.sub = this.route.params.subscribe(params => {
      this.categoryId = params['categoryId']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
      console.log('id', this.categoryId);
      this.findProducts();
      this.findByCategory();

    });


  }

  findByCategory(): void {
    this.categoryService.findByCategory().subscribe(
      (res: HttpResponse<Category[]>) => {
        this.categories = res.body || [];
      }
    )
  }

  findProducts(): void {
    if (this.categoryId) {
      this.productService.findByCategory(this.categoryId).subscribe(
        (res: HttpResponse<PetDTO[]>) => {
          this.products = res.body || [];
        }
      );
    } else {
      if (this.type) {
        this.productService.findTop8ProductSale().subscribe(
          (res: HttpResponse<PetDTO[]>) => {
            this.products = res.body || [];
          }
        );
      } else {
        this.productService.findAll().subscribe(
          (res: HttpResponse<PetDTO[]>) => {
            this.products = res.body || [];
            console.log('name=' + this.searchName);
            if (this.searchName){
              this.products = this.products.filter(u => {
                  console.log(u);
                  return u.productName.toLowerCase().includes(this.searchName.toLowerCase());
              });
            }
          }
        );
      }

    }

  }


}
