import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NewsDTO } from 'src/app/dto/news-dto';
import { PetDTO } from 'src/app/dto/pet-dto';
import { NewsService } from 'src/app/service/news.service';
import { ProductService } from 'src/app/service/product.service';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  newsDTOs?: NewsDTO[];
  petDTONewests?: PetDTO[];
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  petDTOSales?: PetDTO[];
  categories?: Category[];
  constructor(
    protected newsService: NewsService,
    protected categoryService: CategoryService,
    protected productService: ProductService) { }

  ngOnInit(): void {
    this.findTop();
    this.findTop8ProductNews();
    this.findTop8ProductSales();
    this.findByCategory();

  }

  findByCategory(): void {
    this.categoryService.findByCategory().subscribe(
      (res: HttpResponse<Category[]>) => {
        this.categories = res.body || [];
      }
    );
  }

  findTop(): void {
    this.newsService.findTop().subscribe(
      (res: HttpResponse<NewsDTO[]>) => {
        this.newsDTOs = res.body || [];
      }
    );
  }

  findTop8ProductNews(): void {
    this.productService.findTop8ProductNews().subscribe(
      (res: HttpResponse<PetDTO[]>) => {
        this.petDTONewests = res.body || [];
      }
    );
  }

  findTop8ProductSales(): void {
    this.productService.findTop8ProductSale().subscribe(
      (res: HttpResponse<PetDTO[]>) => {
        this.petDTOSales = res.body || [];
      }
    );
  }

}
