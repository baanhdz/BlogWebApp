import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { New } from '../models/new.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewService {

  private apiNew = 'http://localhost:5000/api/news';

  constructor(private httpClient:HttpClient) { }

  //phương thức
  getList():Observable<New[]>{
    return this.httpClient.get<New[]>(this.apiNew);
  }

  getById(id:string):Observable<New>{
    return this.httpClient.get<New>(`${this.apiNew}/${id}`);
  }

  getByTag(tagId: string): Observable<New[]> {
    return this.httpClient.get<New[]>(`${this.apiNew}/tag/${tagId}`);
  }

  getAllNewsBySearchTerm(searchTerm:string){
    return this.httpClient.get<New[]>(`${this.apiNew}/search/${searchTerm}`);
  }
}
