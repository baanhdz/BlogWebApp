import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css'],
})
export class UsersDetailComponent implements OnInit {
  loading = false;
  avatarUrl?: string;
  id?: string;
  active = 1;
  usersForm = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['', [Validators.pattern('[0-9]+')]],
    address: '',
    avatar: '',
    role: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    public msg: NzMessageService,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}
  profileSave(value: any): void {
    value.avatar = this.avatarUrl;
    if (this.route.snapshot.paramMap.get('id') !== 'add') {
      this.usersService
        .updateById(this.route.snapshot.paramMap.get('id'), value)
        .subscribe((res: any) => {
          if (res) {
            this.msg.success('Cập nhật thành công');
          }
        });
      return;
    } else {
      this.usersService.create(value).subscribe((res: any) => {
        if (res) {
          this.msg.success('Thêm mới thành công');
          this.usersForm.patchValue({
            name: '',
            username: '',
            password: '',
            phone: '',
            address: '',
            avatar: '',
            role: '',
          });
          this.avatarUrl = '';
        }
      });
    }
  }

  ngOnInit(): void {
    this.usersForm.patchValue({});
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id, 'id', typeof id);

    if (id && id !== 'add') {
      this.usersService.getById(id).subscribe((res: any) => {
        this.usersForm.patchValue({
          name: res.name,
          username: res.username,
          password: res.password,
          phone: res.phone,
          address: res.address,
          avatar: res.avatar,
          role: res.role,
        });
        this.avatarUrl = res.avatar;
      });
    }
  }


  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        console.log('done', info.file);
        this.avatarUrl = info.file.response.image_url;
        this.loading = false;
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          // this.loading = false;
          // this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
}
