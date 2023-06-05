import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { USERS_URL } from '../shared/constants/urls';
import { Tag } from '../shared/model/tag.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(USERS_URL);
  }

//   reportByTag(): Observable<Tag[]> {
//     return this.http.get<Tag[]>(USERS_URL + '/report');
//   }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${USERS_URL}/${id}`);
  }

  updateById(id: any, data: {}): Observable<Tag> {
    return this.http.put<any>(`${USERS_URL}/${id}`, data);
  }

  deleteById(id: string): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    });
    const options = { headers: headers };
    console.log(options)
    return this.http.delete<any>(`${USERS_URL}/${id}`,options);
  }

  create(data: any): Observable<any> {
    return this.http.post(USERS_URL, data);
  }

}
