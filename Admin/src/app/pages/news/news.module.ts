import { NgModule } from '@angular/core';
import { NewsRoutingModule } from './news-routing.module';
import { CommonModule } from '@angular/common'
import { NewsComponent } from './news.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';


@NgModule({
  imports: [NewsRoutingModule, NzTableModule, NzDividerModule, CommonModule, NzButtonModule, NzMessageModule, FormsModule, NzIconModule, NzModalModule, NzFormModule, ReactiveFormsModule],
  declarations: [NewsComponent],
  exports: [NewsComponent]
})
export class NewsModule { }
