import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './state/auth/auth.reducer';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { AuthEffects } from './state/auth/auth.effects';
import { ProductsEffects } from './state/products/products.effects';
import { productsReducer } from './state/products/products.reducer';
import { ProductComponent } from './components/product/product.component';
import { cartReducer } from './state/cart/cart.reducer';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { productReducer } from './state/product/product.reducer';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductEffect } from './state/product/product.effects';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductComponent,
    CheckoutComponent,
    EditProductComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      auth: authReducer,
      products: productsReducer,
      cart: cartReducer,
      product:productReducer
    }),
    EffectsModule.forRoot([
      AuthEffects,
      ProductsEffects,
      ProductEffect
    ]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
