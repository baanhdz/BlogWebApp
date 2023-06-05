import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tag } from 'src/app/shared/model/tag.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TagService } from '../../services/tag.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormGroup } from '@angular/forms';

interface DataItem {
  tag: string;
  description: string;
}

interface ColumnItem {
  name: string;
}
@Component({
  selector: 'tag',
  templateUrl: './tag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

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
    private tagService: TagService,
    activatedRoute: ActivatedRoute,
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
    this.getAll();
  }

  ngOnChanges() {
    this.cd.detectChanges();
  }

  getAll() {
    this.validateForm = this.fb.group({
      tag: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
    this.loading = true;
    this.tagService.getAll().subscribe((res: any) => {
      console.log(res, 'res getAll');
      this.data = [...res];
      this.loading = false;
      this.cd.detectChanges();
    });
  }

  delete(_record: any) {
    console.log('Button delete clicked!');
    this.tagService.deleteById(_record._id).subscribe((res: any) => {
      this.message.success(`Xoá thành công ${_record.tag}`);
      window.location.reload();
    });
    this.getAll();
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    if (this.TYPE === this.ADD) {
      this.tagService.create(this.validateForm.value).subscribe((res: any) => {
        this.message.success(`Thêm dữ liệu thành công`);
        this.getAll();
      });
    } else {
      this.tagService.updateById(this.dataDetail._id, this.validateForm.value).subscribe((res: any) => {
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
      name: 'Danh mục',
    },
    {
      name: 'Mô tả',
    },

  ];

  param?: string;
}
