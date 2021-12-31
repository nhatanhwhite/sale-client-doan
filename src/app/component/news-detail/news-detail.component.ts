import { Component, OnInit } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ProductDTO} from '../../dto/product-dto';
import {PetDTO} from '../../dto/pet-dto';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../service/product.service';
import {NewsService} from '../../service/news.service';
import {News} from '../../model/news';
import {ViewPostDto} from '../../dto/view-post-dto';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  id?: string;
  newDetail: ViewPostDto;
  news?: News[];
  constructor(private route: ActivatedRoute,
              private router: Router,
              protected newsService: NewsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      this.findNew(params['id']);
      this.findNewByCat('123');
      this.findByAll();

    });
  }

  findByAll(): void {
    this.newsService.findByAll().subscribe(
      (res: HttpResponse<News[]>) => {
        this.news = res.body || [];
      }
    )
  }

  findNew(newId: any): void {
    this.newsService.viewPost(newId).subscribe(
      (res: HttpResponse<ViewPostDto>) => {
        // @ts-ignore
        console.log(res.body);
        this.newDetail = res.body || {};
        // this.findProductByCate(this.productDTO.category.id);
      }
    );
  }

  findNewByCat(newId: any): void {
    this.newsService.findByAll().subscribe(
      (res: HttpResponse<News[]>) => {
        // @ts-ignore
        console.log(res.body);
        this.news = res.body;
        // this.findProductByCate(this.productDTO.category.id);
      }
    );
  }

  findNewByCate(id: any): void {
    // this.productService.findByCategory(id).subscribe(
    //   (res: HttpResponse<PetDTO[]>) => {
    //     // @ts-ignore
    //     this.productRelates = res.body || [];
    //   }
    // );
  }
}
