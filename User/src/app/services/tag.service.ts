import { Tag } from './../models/tag.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private apiTag='http://localhost:5000/api/tag'

  constructor(private httpClient:HttpClient) { }
  
  getAllTag():Observable<Tag[]>{
    return this.httpClient.get<Tag[]>(this.apiTag);
  }

}
