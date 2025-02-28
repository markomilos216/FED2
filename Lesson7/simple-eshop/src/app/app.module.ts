import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductDetailComponent } from './Components/product-list/product-detail/product-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LoginComponent } from './Components/login/login.component';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { CartTableComponent } from './Components/cart/cart-table/cart-table.component';
import { PersonalInfoComponent } from './Components/cart/personal-info-shipping-and-payment/personal-info/personal-info.component';
import { ShippingAndPaymentComponent } from './Components/cart/personal-info-shipping-and-payment/shipping-and-payment/shipping-and-payment.component';
import { PaymentAndSummaryComponent } from './Components/cart/payment-and-summary/payment-and-summary.component';
import { PaymentComponent } from './Components/cart/payment-and-summary/payment/payment.component';
import { SummaryComponent } from './Components/cart/payment-and-summary/summary/summary.component';
import { PersonalInfoShippingAndPaymentComponent } from './Components/cart/personal-info-shipping-and-payment/personal-info-shipping-and-payment.component';
import { RegisterComponent } from './Components/register/register.component';
import { ContactComponent } from './Components/contact/contact.component';
import { MyAccountComponent } from './Components/my-account/my-account.component';
import { SidebarMenuComponent } from './Components/my-account/sidebar-menu/sidebar-menu.component';
import { UserProfileComponent } from './Components/my-account/user-profile/user-profile.component';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from '../environments/environment.development';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'my-account', component: MyAccountComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'cart', component: CartComponent, children: [
    {path: '', component: CartTableComponent},
    {path: 'personal-info-shipping-and-payment', component: PersonalInfoShippingAndPaymentComponent},
    {path: 'payment-and-summary', component: PaymentAndSummaryComponent}
  ]},
  {path: 'checkout', component: CheckoutComponent},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ProductListComponent,
    ProductDetailComponent,
    NotFoundComponent,
    LoginComponent,
    CartComponent,
    CheckoutComponent,
    CartTableComponent,
    PersonalInfoComponent,
    ShippingAndPaymentComponent,
    PaymentAndSummaryComponent,
    PaymentComponent,
    SummaryComponent,
    PersonalInfoShippingAndPaymentComponent,
    RegisterComponent,
    ContactComponent,
    MyAccountComponent,
    SidebarMenuComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
