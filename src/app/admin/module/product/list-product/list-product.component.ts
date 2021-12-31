import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { MessageResponse } from 'src/app/response/message-response';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  message?: string;
  id?:number;

  products?:Product[];

  constructor(protected productService: ProductService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.productService.findAll().subscribe(
      (res: HttpResponse<Product[]>) => {
        this.products = res.body || [];
      }
    )
  }

  delete(id: any): void {
    this.id = id;
    this.confirmDelete();
  }

  confirmDelete(): void {
    this.productService.delete(this.id).subscribe(
      (res: HttpResponse<MessageResponse>) => {
        this.message = res.body?.message || '';

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Xóa thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Xóa không thành công', 'Sản phẩm đã được đặt hàng hoặc có lỗi xảy ra!', 'error');
        }

        this.findAll()
      }
    )
  }

}
