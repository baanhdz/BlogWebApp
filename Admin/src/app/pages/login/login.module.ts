import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common'
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { IconsProviderModule } from '../../icons-provider.module';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  imports: [LoginRoutingModule,NzInputModule, NzTableModule,IconsProviderModule, NzDividerModule, CommonModule, NzButtonModule, NzMessageModule, FormsModule, NzIconModule, NzModalModule, NzFormModule, ReactiveFormsModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
