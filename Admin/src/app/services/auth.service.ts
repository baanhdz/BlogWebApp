import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { AUTH_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUser: string = '';

  constructor(
    private httpClient: HttpClient,
    private msg: NzMessageService,
    private router: Router
  ) { }
  loginUser(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password
    };
    return this.httpClient.post<any>(`${AUTH_URL}/login`, body).pipe(
      tap(
        (response) => {
          // Lưu Access Token vào Local Storage
          localStorage.setItem('accessToken', response.accessToken);
          console.log(response.refreshToken)
        },
        (error) => {
          // Xử lý lỗi đăng nhập
          this.msg.error('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.');
        }
      )
    );
  }

  logoutUser(): void {
    localStorage.removeItem('accessToken');
    this.loggedInUser = '';
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    // Kiểm tra xem Access Token có tồn tại hay không
    return accessToken !== null;
  }

  getLoggedInUser(): string {
    if (!this.loggedInUser) {
      this.loggedInUser = localStorage.getItem('loggedInUser') || '';
    }
    return this.loggedInUser;
  }
}
