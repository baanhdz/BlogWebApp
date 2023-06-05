import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private msg: NzMessageService,
    private authService: AuthService
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      const username = this.validateForm.value.userName;
      const password = this.validateForm.value.password;
      this.authService.loginUser(username, password).subscribe(
        (user) => {
          if (user.role === 'Admin') {
            this.router.navigate(['/welcome']);
          } else {
            this.msg.error('Bạn không có quyền truy cập vào trang Admin.');
          }
        },
        (error) => {
          if (error.status === 404) {
            this.msg.error('Tài khoản sai hoặc không tồn tại!');
          } else if (error.status === 401) {
            this.msg.error('Sai mật khẩu!');
          } else {
            this.msg.error('Đăng nhập không thành công. Vui lòng thử lại sau.');
          }
        }
      );
    } else {
      this.msg.error('Vui lòng nhập đầy đủ thông tin đăng nhập.');
      this.validateForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });

    if (this.authService.isLoggedIn()) {
      this.loggedInUser = this.authService.getLoggedInUser();
      this.isLoggedIn = true;
    }
  }
  
}
