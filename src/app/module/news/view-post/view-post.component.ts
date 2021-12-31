import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewPostDto } from 'src/app/dto/view-post-dto';
import { News } from 'src/app/model/news';
import { NewsService } from 'src/app/service/news.service';
import { ShareDataService } from 'src/app/service/share-data.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  viewPostDTO:ViewPostDto | null = null;
  news: News | null = null;
  newPosts?:News[];
  relatedPosts?:News[];

  constructor(
    protected newsService: NewsService,
    private route: ActivatedRoute) {
    }

  ngOnInit(): void {
    this.viewPost(this.route.snapshot.params.id);
  }

  viewPost(id:any): void {
    this.newsService.viewPost(id).subscribe(
      (res: HttpResponse<ViewPostDto>) => {
        this.viewPostDTO = res.body;
        
        if(this.viewPostDTO) {
          this.news = this.viewPostDTO.news || null;
          this.newPosts = this.viewPostDTO.fiveBestNew || [];
          this.relatedPosts = this.viewPostDTO.related || [];
        }
      }
    )
  }

  onRouter(id:any): void {
   this.viewPost(id);
  }

}
