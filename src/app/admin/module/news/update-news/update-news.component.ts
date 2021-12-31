import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryNews } from 'src/app/model/category-news';
import { News } from 'src/app/model/news';
import { MessageResponse } from 'src/app/response/message-response';
import { CategoryNewsService } from 'src/app/service/category-news.service';
import { NewsService } from 'src/app/service/news.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-news',
  templateUrl: './update-news.component.html',
  styleUrls: ['./update-news.component.css']
})
export class UpdateNewsComponent implements OnInit {

  news:News | null = null;

  submitted = false;
  message?:string;

  currentFile?: File;
  imagePath: any;
  imgURL: any;

  categoryNews?:CategoryNews[];

  myForm = this.formBuilder.group({
    id: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.maxLength(255)]],
    content: ['', [Validators.required, Validators.maxLength(4000)]],
    rootLink: ['', [Validators.required, Validators.maxLength(255)]],
    categoryNewsId: ['', [Validators.required]]
  });


  constructor(
    private formBuilder: FormBuilder, 
    protected newsService: NewsService,
    protected categoryNewsService: CategoryNewsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params.id);
    this.findAllCategoryNews();
  }

  
  findAllCategoryNews(): void {
    this.categoryNewsService.findAll().subscribe(
      (res:HttpResponse<CategoryNews[]>) => {
        this.categoryNews = res.body || [];
      }
    )
  }

  findById(id:any): void {
    this.newsService.findById(id).subscribe(
      (res:HttpResponse<News>) => {
        this.news = res.body;
        if(this.news) {
          this.imgURL = this.news.image;
          this.updateForm(this.news);
        }
      }
    );
  }

  get f() {
    return this.myForm.controls;
  }

  updateForm(news: News): void {
    this.myForm.patchValue({
      id: news.id,
      title: news.title,
      content: news.content,
      rootLink: news.rootLink,
      categoryNewsId: news.categoryNews?.id
    });
  }

  selectFile(event: any): void {
    this.currentFile = event.target.files.item(0);

    if (this.currentFile) {
      const sizeFile = this.currentFile.size;

      

      if (sizeFile > 1000000) {
        Swal.fire('Thông báo', 'Kích thước ảnh quá lớn', 'warning');
        this.myForm.get("image")?.setValue("");
      } else {
        const reader = new FileReader();

        this.imagePath = this.currentFile;
        reader.readAsDataURL(this.currentFile);
        reader.onload = () => {
          this.imgURL = reader.result;
        };
      }
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    let news:News = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      content: this.myForm.value.content,
      rootLink: this.myForm.value.rootLink
    }

    const formData: FormData = new FormData();

    if (this.currentFile) {
      formData.append('file', this.currentFile);
    }

    formData.append('categoryNewsId', JSON.stringify(this.myForm.value.categoryNewsId))
    formData.append('news', JSON.stringify(news))

    this.newsService.update(formData).subscribe(
      (response: HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Sửa tin tức thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Sửa tin tức không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }

}
