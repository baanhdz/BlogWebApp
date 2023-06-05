import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { CommonModule } from '@angular/common'
import { UsersComponent } from './users.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';


@NgModule({
  imports: [UsersRoutingModule, NzTableModule, NzDividerModule, CommonModule, NzButtonModule, NzMessageModule, FormsModule, NzIconModule, NzModalModule, NzFormModule, ReactiveFormsModule],
  declarations: [UsersComponent],
  exports: [UsersComponent]
})
export class UsersModule { }
