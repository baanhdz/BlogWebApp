import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'news-detail',
  templateUrl: './news-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  dataTag: any[] = [];
  loading = false;
  isPublic = true;
  avatarUrl?: string;
  id?: string;
  dataTagUpdate?: string;
  active = 1;
  newsForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    content: ['', Validators.required],
    tag_id: null,
    picture: '',
    isPublic: true
  });

  constructor(private fb: FormBuilder, public msg: NzMessageService, private tagService: TagService, private newsService: NewsService, private route: ActivatedRoute) { }

  profileSave(value: any): void {
    value.picture = this.avatarUrl;
    if (this.route.snapshot.paramMap.get('id') !== 'add') {
      this.newsService.updateById(this.route.snapshot.paramMap.get('id'), value).subscribe((res: any) => {
        if (res) {
          this.msg.success('Cập nhật thành công');
        }
      });
      return;
    } else {
      this.newsService.create(value).subscribe((res: any) => {
        if (res) {
          this.msg.success('Thêm mới thành công');
          this.newsForm.patchValue({
            title: '',
            description: '',
            content: '',
            isPublic: true,
            tag_id: null,
          });
          this.avatarUrl = '';
        }
      });
    }
  }

  ngOnInit(): void {
    this.getAllTag();
    this.newsForm.patchValue({});
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id, 'id',typeof id);
    
    if (id && id !== 'add') {
      this.newsService.getById(id).subscribe((res: any) => {
        this.newsForm.patchValue({
          title: res.title,
          description: res.description,
          content: res.content,
          isPublic: res.isPublic,
          tag_id: res.tag_id,
          picture: res.picture
        });
        this.avatarUrl = res.picture;
        this.dataTagUpdate = res.tag_id;
      });
    }
  }

  getAllTag() {
    this.tagService.getAll().subscribe((res: any) => {
      this.dataTag = res;
    });
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