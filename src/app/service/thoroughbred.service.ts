import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Thoroughbred } from '../model/thoroughbred';
import { MessageResponse } from '../response/message-response';

@Injectable({
  providedIn: 'root'
})
export class ThoroughbredService {

  public api = environment.api + 'api/thoroughbred/'

  constructor(private http: HttpClient) { }

  create(thoroughbred: Thoroughbred): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "save", thoroughbred, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<Thoroughbred[]>> {
    return this.http.get<Thoroughbred[]>(this.api + "find-all", {observe: 'response'});
  }

  public findById(id: any): Observable<HttpResponse<Thoroughbred>>{
    return this.http.get(`${this.api + "find-id"}/${id}`, { observe: 'response' });
  }

  update(thoroughbred: Thoroughbred): Observable<HttpResponse<MessageResponse>> {
    return this.http.put(this.api + "update", thoroughbred, { observe: 'response' });
  }

  public delete(id: any): Observable<HttpResponse<MessageResponse>>{
    return this.http.delete(`${this.api + "delete"}/${id}`, { observe: 'response' });
  }
}
