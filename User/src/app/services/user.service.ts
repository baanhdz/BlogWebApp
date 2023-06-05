import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUser = 'http://localhost:5000/api/uses'

  constructor(private httpClient:HttpClient) { }

  getList():Observable<User[]>{
    return this.httpClient.get<User[]>(this.apiUser);
  }

  getById(id:string):Observable<User>{
    return this.httpClient.get<User>(`${this.apiUser}/${id}`);
  }

  // getByUsername(username: string): Observable<User> {
  //   return this.httpClient.get<User>(`${apiUser}?username=${username}`);
  // }

  // getCurrentUser(): User {
  //   // Lấy thông tin người dùng hiện tại từ local storage hoặc bất kỳ nơi nào mà bạn lưu thông tin người dùng
  //   // Ví dụ:
  //   const currentUserString = localStorage.getItem('currentUser');
  //   return currentUserString ? JSON.parse(currentUserString) : null;
  // }
}
