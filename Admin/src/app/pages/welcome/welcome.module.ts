import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';

import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { IconsProviderModule } from '../../icons-provider.module';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  imports: [WelcomeRoutingModule, NgChartsModule, IconsProviderModule, FormsModule, NzLayoutModule, NzMenuModule, NzTableModule, NzDividerModule, NzButtonModule, NzMessageModule, ReactiveFormsModule, NzModalModule, NzFormModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
