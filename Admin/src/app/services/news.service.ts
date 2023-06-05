import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NEWS_URL } from '../shared/constants/urls';
import { Tag } from '../shared/model/tag.model';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(NEWS_URL);
  }

  reportByTag(): Observable<Tag[]> {
    return this.http.get<Tag[]>(NEWS_URL + '/report');
  }

  getById(id: string): Observable<Tag> {
    return this.http.get<Tag>(`${NEWS_URL}/${id}`);
  }

  updateById(id: any, data: {}): Observable<Tag> {
    return this.http.put<Tag>(`${NEWS_URL}/${id}`, data);
  }

  deleteById(id: string): Observable<Tag> {
    return this.http.delete<Tag>(`${NEWS_URL}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(NEWS_URL, data);
  }

  findByName(name: any): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${NEWS_URL}?/name=${name}`);
  }
}
