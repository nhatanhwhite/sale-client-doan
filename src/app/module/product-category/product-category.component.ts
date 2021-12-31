import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetDTO } from 'src/app/dto/pet-dto';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { ShareDataService } from 'src/app/service/share-data.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  products?: PetDTO[];
  productSales?: PetDTO[];
  category:Category | null = null;
  id?:string;

  constructor(
    protected productService: ProductService,
    protected categoryService: CategoryService,
    private route: ActivatedRoute,
    protected shareDataService: ShareDataService) {  }

  ngOnInit(): void {
    this.shareDataService.currentData.subscribe(
      res => {
        this.id = res || '';
        this.findByCatgory(this.id);
        this.findByIdCategory(this.id);
        this.findByCatgoryAndSale(this.id);
      }
    )
  }

  findByIdCategory(id:any):void {
    this.categoryService.findByIdAll(id).subscribe(
      (res:HttpResponse<Category>) => {
        this.category = res.body;
      }
    );
  }

  findByCatgory(id:any): void {
    this.productService.findByCategory(id).subscribe(
      (res: HttpResponse<PetDTO[]>) => {
        this.products = res.body || [];
      }
    );
  }

  findByCatgoryAndSale(id:any): void {
    this.productService.findByCategoryAndSale(id).subscribe(
      (res: HttpResponse<PetDTO[]>) => {
        this.productSales = res.body || [];
      }
    );
  }

}
