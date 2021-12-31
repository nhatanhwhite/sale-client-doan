import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDTO } from 'src/app/dto/product-dto';
import { ProductService } from 'src/app/service/product.service';
import { ProductImage } from 'src/app/model/product-image';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  productDTO:ProductDTO | null = null;
  productImages?: ProductImage[];

  constructor(
    protected productService: ProductService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params.id);
  }

  findById(id:any): void {
    this.productService.view(id).subscribe(
      (res:HttpResponse<ProductDTO>) => {
        this.productDTO = res.body;

        this.productImages = this.productDTO?.productImages;
      }
    );
  }

  onBack(): void {
    window.history.back();
  }

}
