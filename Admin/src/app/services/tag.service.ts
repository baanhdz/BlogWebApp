import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TAG_URL } from '../shared/constants/urls';
import { Tag } from '../shared/model/tag.model';
@Injectable({
  providedIn: 'root'
})
export class TagService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(TAG_URL);
  }

  getById(id: string): Observable<Tag> {
    return this.http.get<Tag>(`${TAG_URL}/${id}`);
  }

  updateById(id: string, data: {}): Observable<Tag> {
    return this.http.put<Tag>(`${TAG_URL}/${id}`, data);
  }

  deleteById(id: string): Observable<Tag> {
    return this.http.delete<Tag>(`${TAG_URL}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(TAG_URL, data);
  }

  findByName(name: any): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${TAG_URL}?/name=${name}`);
  }
}
