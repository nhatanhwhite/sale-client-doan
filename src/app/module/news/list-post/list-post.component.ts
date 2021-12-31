import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/model/news';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  news?:News[];

  constructor(protected newsService: NewsService) { }

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
