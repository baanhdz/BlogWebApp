import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tag } from 'src/app/shared/model/tag.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NewsService } from '../../services/news.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormGroup } from '@angular/forms';

// interface DataItem {
//   tag: string;
//   description: string;
// }

interface ColumnItem {
  name: string;
}


@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  public tableHeight!: number;
  public innerWidth: any;
  public innerHeight: any;
  

  data: any[] = [];
  dataDetail: any = {};
  // Định nghĩa biến add kiểu string
  ADD: string = 'ADD';
  TYPE: string = '';
  tag: string = '';
  description: string = '';
  loading = false;
  isVisible = false;


  constructor(
    private fb: UntypedFormBuilder,
    private message: NzMessageService,
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    public cd: ChangeDetectorRef
  ) { }


  validateForm!: UntypedFormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  showModal(_record: any) {
    console.log(_record, '_record');
    if (_record === this.ADD) {
      this.TYPE = this.ADD;
      this.validateForm.patchValue({
        tag: '',
        description: ''
      });
    } else {
      this.dataDetail = _record;
      this.validateForm.patchValue({
        tag: _record.tag,
        description: _record.description
      });
    }
    this.isVisible = true;
  }
  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    console.log(`innerWidth: ${this.innerWidth}, innerHeight: ${this.innerHeight}`);
    this.getAll();
  }

  // Viết hàm format date để hiển thị ngày tháng năm  
  formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = '' + d.getFullYear();
    //return [day, month, year].join('-');
    return [day, month, year].join('-');
  }

  // Khi xoá dữ liệu cần phải cập nhật lại danh sách từ  API

  getAll() {
    this.validateForm = this.fb.group({
      tag: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
    this.loading = true;
    this.newsService.getAll().subscribe((res: any) => {
      console.log(res, 'res getAll');
      this.data = [...res];
      this.loading = false;
      this.cd.detectChanges();
    });
  }

  delete(_record: any) {
    console.log('Button delete clicked!');
    this.newsService.deleteById(_record._id).subscribe((res: any) => {
      this.message.success(`Xoá thành công dữ liệu bài viết`);
      this.getAll();
    });
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    if (this.TYPE === this.ADD) {
      this.newsService.create(this.validateForm.value).subscribe((res: any) => {
        this.message.success(`Thêm dữ liệu thành công`);
        this.getAll();
      });
    } else {
      this.newsService.updateById(this.dataDetail._id, this.validateForm.value).subscribe((res: any) => {
        this.message.success(`Cập nhật dữ liệu thành công`);
        this.getAll();
      });
    }
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  listOfColumns: ColumnItem[] = [
    {
      name: 'Tiêu đề',

    },
    {
      name: 'Mô tả',
    },
    {
      name: 'Nội dung',
    },
    {
      name: 'Ngày đăng',
    },
    {
      name: 'Công khai',
    },

  ];

  param?: string;
}
