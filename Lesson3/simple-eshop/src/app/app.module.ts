import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponentComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductDetailComponent } from './Components/product-list/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponentComponent,
    FooterComponent,
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
