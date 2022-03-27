import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCart from '../../state/cart/cart.selector'
import * as CartActions from '../../state/cart/cart.actions'
import * as ProductsAction from '../../state/products/products.actions';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  private imagesApiUrl = `${environment.apiURL}/images`
  private orderApiurl = `${environment.apiURL}/order`
  cartItems$ = this.store.select(fromCart.selectCartItems)
  totalQty$ = this.store.select(fromCart.selectCartTotalQty)
  totalCost$ = this.store.select(fromCart.selectCartTotalCost)

  constructor(private store:Store, private http: HttpClient) { }

  ngOnInit(): void {
  }

  changeQty(productId:string, quantity:number){
    this.store.dispatch(CartActions.chengeCartItemQuantity({productId,quantity}))
  }

  getImageUrl(img_name:string){
    return `${this.imagesApiUrl}/${img_name}`
  }

  completePurchasing(){
    this.cartItems$.subscribe(res=>{
      this.http.post(this.orderApiurl,{
        cart:res
      }).subscribe((r)=>{
        console.log(r)
      })
    })
    this.store.dispatch(CartActions.placeOrder({}))
    this.store.dispatch(ProductsAction.retriveProductsRequest({}))
  }
}
