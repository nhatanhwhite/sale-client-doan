import { Component, OnInit } from '@angular/core';
import {PetDTO} from '../../dto/pet-dto';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../service/product.service';
import {CategoryService} from '../../service/category.service';
import {ShareDataService} from '../../service/share-data.service';
import {HttpResponse} from '@angular/common/http';
import {News} from '../../model/news';
import {NewsService} from '../../service/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  categoryId?: any;
  news?: News[];
  type: string;
  private sub: any;
  products?: PetDTO[];
  constructor(private route: ActivatedRoute,
              protected productService: ProductService,
              protected newsService: NewsService,
              protected categoryService: CategoryService,
              protected shareDataService: ShareDataService) { }

  ngOnInit(): void {
    this.findByAll();
  }


  findByAll(): void {
    this.newsService.findByAll().subscribe(
      (res: HttpResponse<News[]>) => {
        this.news = res.body || [];
      }
    )
  }

}
