import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PetDTO } from '../dto/pet-dto';
import { ProductDTO } from '../dto/product-dto';
import { Product } from '../model/product';
import { MessageResponse } from '../response/message-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public api = environment.api + 'api/product/'

  constructor(private http: HttpClient) { }

  create(formData: FormData): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "save", formData, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<Product[]>> {
    return this.http.get<Product[]>(this.api + "find-all", {observe: 'response'});
  }

  public findById(id: any): Observable<HttpResponse<Product>>{
    return this.http.get(`${this.api + "find-id"}/${id}`, { observe: 'response' });
  }

  update(formData: FormData): Observable<HttpResponse<MessageResponse>> {
    return this.http.put(this.api + "update", formData, { observe: 'response' });
  }

  public delete(id: any): Observable<HttpResponse<MessageResponse>>{
    return this.http.delete(`${this.api + "delete"}/${id}`, { observe: 'response' });
  }

  public view(id: any): Observable<HttpResponse<ProductDTO>>{
    return this.http.get(`${this.api + "view"}/${id}`, { observe: 'response' });
  }

  updateImage(formData: FormData): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "update-image", formData, { observe: 'response' });
  }

  findTop8ProductNews(): Observable<HttpResponse<PetDTO[]>> {
    return this.http.get<PetDTO[]>(this.api + "all/product-newest", {observe: 'response'});
  }

  findTop8ProductSale(): Observable<HttpResponse<PetDTO[]>> {
    return this.http.get<PetDTO[]>(this.api + "all/product-sale", {observe: 'response'});
  }

  findByCategory(id: any): Observable<HttpResponse<PetDTO[]>> {
    return this.http.get<PetDTO[]>(`${this.api + "all/product-category"}/${id}`, {observe: 'response'});
  }

  findByCategoryAndSale(id:any): Observable<HttpResponse<PetDTO[]>> {
    return this.http.get<PetDTO[]>(`${this.api + "all/product-category-sale"}/${id}`, {observe: 'response'});
  }

  public detail(id: any): Observable<HttpResponse<ProductDTO>>{
    return this.http.get(`${this.api + "all/detail"}/${id}`, { observe: 'response' });
  }

  findTByProductLike(param: any): Observable<HttpResponse<PetDTO[]>> {
    return this.http.get<PetDTO[]>(this.api + "all/product-like", {params: param, observe: 'response'});
  }
}
