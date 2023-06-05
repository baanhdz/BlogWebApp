import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsDetailComponent } from './news-detail.component';

const routes: Routes = [
  { path: '', component: NewsDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsDetailRoutingModule { }
