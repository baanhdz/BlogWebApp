import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { DetailComponent } from './components/pages/detail/detail.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ListAllComponent } from './components/pages/list-all/list-all.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { SearchComponent } from './components/pages/search/search.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { NgxPaginationModule } from 'ngx-pagination';

 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DetailComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HomeComponent,
    ListAllComponent,
    RegisterComponent,
    SearchComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
