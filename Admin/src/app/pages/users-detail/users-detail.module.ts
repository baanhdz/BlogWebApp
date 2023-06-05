import { NgModule } from '@angular/core';
import { UsersDetailRoutingModule } from './users-detail-routing.module';
import { CommonModule } from '@angular/common'
import { UsersDetailComponent } from './users-detail.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  imports: [NzCheckboxModule, NzInputModule, UsersDetailRoutingModule, NzSelectModule, NzTableModule, NzDividerModule, CommonModule, NzButtonModule, NzMessageModule, FormsModule, NzIconModule, NzModalModule, NzFormModule, ReactiveFormsModule, NzUploadModule],
  declarations: [UsersDetailComponent],
  exports: [UsersDetailComponent]
})
export class UsersDetailModule { }
