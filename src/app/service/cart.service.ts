import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartTotalDTO } from '../dto/cart-total-dto';
import { MessageResponse } from '../response/message-response';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public api = environment.api + 'api/cart/'

  constructor(private http: HttpClient) { }

  create(formData: FormData): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "save", formData, { observe: 'response' });
  }

  getQuantity(): Observable<HttpResponse<MessageResponse>> {
    return this.http.get(this.api + "quantity", { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<CartTotalDTO>> {
    return this.http.get<CartTotalDTO>(this.api + "find-all", {observe: 'response'});
  }

  // public findById(id: any): Observable<HttpResponse<Category>>{
  //   return this.http.get(`${this.api + "find-id"}/${id}`, { observe: 'response' });
  // }

  update(formData: FormData): Observable<HttpResponse<MessageResponse>> {
    return this.http.put(this.api + "update", formData, { observe: 'response' });
  }

  public delete(id: any): Observable<HttpResponse<MessageResponse>>{
    return this.http.delete(`${this.api + "delete"}/${id}`, { observe: 'response' });
  }
}
