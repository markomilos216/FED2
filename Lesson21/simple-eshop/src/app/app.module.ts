import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductDetailComponent } from './Components/product-list/product-detail/product-detail.component';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { UserManagementComponent } from './Components/my-account/user-management/user-management.component';
import { authGuardGuard } from './RouteGuards/auth-guard.guard';
import { UpdateProfileComponent } from './Components/my-account/update-profile/update-profile.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ChangePasswordComponent } from './Components/my-account/change-password/change-password.component';
import { DeliveryAddressComponent } from './Components/my-account/delivery-address/delivery-address.component';
import { DeliveryAddressFormComponent } from './Components/my-account/delivery-address/delivery-address-form/delivery-address-form.component';
import { PaymentCardsComponent } from './Components/my-account/payment-cards/payment-cards.component';
import { PaymentCardsFormComponent } from './Components/my-account/payment-cards/payment-cards-form/payment-cards-form.component';
import { CardNumberPipe } from './Pipes/card-number.pipe';
import { CardCcvPipe } from './Pipes/card-ccv.pipe';
import { ProgressBarComponent } from './Components/cart/progress-bar/progress-bar.component';
import { SuccessfulPaymentComponent } from './Components/cart/successful-payment/successful-payment.component';
import { OrdersListComponent } from './Components/my-account/orders-list/orders-list.component';
import { ProductManagementComponent } from './Components/my-account/product-management/product-management.component';
import { ProductManagementFormComponent } from './Components/my-account/product-management/product-management-form/product-management-form.component';
import { OrderDetailComponent } from './Components/my-account/orders-list/order-detail/order-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'my-account', component: MyAccountComponent, canActivate: [authGuardGuard], children: [
    {path: 'user-profile', component: UserProfileComponent },
    {path: 'user-management', component: UserManagementComponent},
    {path: 'update-profile', component: UpdateProfileComponent},
    {path: 'change-password', component: ChangePasswordComponent},
    {path: 'delivery-address', component: DeliveryAddressComponent},
    {path: 'delivery-address-form', component: DeliveryAddressFormComponent},
    {path: 'delivery-address-form/:id', component: DeliveryAddressFormComponent},
    {path: 'payment-cards', component: PaymentCardsComponent},
    {path: 'payment-cards-form', component: PaymentCardsFormComponent},
    {path: 'payment-cards-form/:id', component: PaymentCardsFormComponent},
    {path: 'orders-list', component: OrdersListComponent},
    {path: 'order-detail', component: OrderDetailComponent},
    {path: 'order-detail/:id', component: OrderDetailComponent},
    {path: 'product-management', component: ProductManagementComponent},
    {path: 'product-management-form', component: ProductManagementFormComponent},
    {path: 'product-management-form/:id', component: ProductManagementFormComponent}
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'cart', component: CartComponent, children: [
    {path: '', component: CartTableComponent},
    {path: 'personal-info-shipping-and-payment', component: PersonalInfoShippingAndPaymentComponent},
    {path: 'payment-and-summary', component: PaymentAndSummaryComponent},
    {path: 'successful-payment', component: SuccessfulPaymentComponent}
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
    UserProfileComponent,
    UserManagementComponent,
    UpdateProfileComponent,
    ChangePasswordComponent,
    DeliveryAddressComponent,
    DeliveryAddressFormComponent,
    PaymentCardsComponent,
    PaymentCardsFormComponent,
    CardNumberPipe,
    CardCcvPipe,
    ProgressBarComponent,
    SuccessfulPaymentComponent,
    OrdersListComponent,
    ProductManagementComponent,
    ProductManagementFormComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
