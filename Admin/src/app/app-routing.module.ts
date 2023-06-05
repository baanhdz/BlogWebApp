import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'tag',canActivate: [AuthGuard], loadChildren: () => import('./pages/tag/tag.module').then(m => m.TagModule) },
  { path: 'news',canActivate: [AuthGuard], loadChildren: () => import('./pages/news/news.module').then(m => m.NewsModule) },
  { path: 'news/:id',canActivate: [AuthGuard], loadChildren: () => import('./pages/news-detail/news-detail.module').then(m => m.NewsDetailModule) },
  { path: 'users',canActivate: [AuthGuard], loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) },
  { path: 'users/:id',canActivate: [AuthGuard], loadChildren: () => import('./pages/users-detail/users-detail.module').then(m => m.UsersDetailModule) },
  { path: 'welcome',canActivate: [AuthGuard], loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
