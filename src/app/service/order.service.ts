import { Injectable } from '@angular/core';
import {Category} from '../model/category';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessageResponse} from '../response/message-response';
import {environment} from '../../environments/environment';
import {Order} from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public api = environment.api + 'api/order';

  constructor(private http: HttpClient) { }

  create(order: Order): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api, order, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<Order[]>> {
    return this.http.get<Order[]>(this.api, {observe: 'response'});
  }

  findAllByUser(): Observable<HttpResponse<Order[]>> {
    return this.http.get<Order[]>(this.api + '/list', {observe: 'response'});
  }

  public findById(id: any): Observable<HttpResponse<Order>>{
    return this.http.get<Order>(`${this.api}/${id}`, { observe: 'response' });
  }

  public thanhToan(id: any): Observable<HttpResponse<Order>>{
    return this.http.get<Order>(`${this.api}/thanh-toan/${id}`, { observe: 'response' });
  }
}
