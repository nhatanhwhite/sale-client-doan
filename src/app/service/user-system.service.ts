import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserSystem } from '../model/user-system';
import { MessageResponse } from '../response/message-response';

@Injectable({
  providedIn: 'root'
})
export class UserSystemService {

  public api = environment.api + 'api'

  constructor(private http: HttpClient) { }

  create(uuserSystem: UserSystem): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "/register", uuserSystem, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<UserSystem[]>> {
    return this.http.get<UserSystem[]>(this.api + "/user/find-all", {observe: 'response'});
  }

  public findById(id: any): Observable<HttpResponse<UserSystem>>{
    return this.http.get(`${this.api + "/user/find-id"}/${id}`, { observe: 'response' });
  }

  update(formData: FormData): Observable<HttpResponse<MessageResponse>> {
    return this.http.put(this.api + "/user/update", formData, { observe: 'response' });
  }

  public delete(id: any): Observable<HttpResponse<MessageResponse>>{
    return this.http.delete(`${this.api + "/user/delete"}/${id}`, { observe: 'response' });
  }
}
