import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCart from '../../state/cart/cart.selector'
import * as CartActions from '../../state/cart/cart.actions'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  private imagesApiUrl = `${environment.apiURL}/images`
  cartItems$ = this.store.select(fromCart.selectCartItems)
  totalQty$ = this.store.select(fromCart.selectCartTotalQty)
  totalCost$ = this.store.select(fromCart.selectCartTotalCost)

  constructor(private store:Store) { }

  ngOnInit(): void {
  }

  changeQty(productId:string, quantity:number){
    this.store.dispatch(CartActions.chengeCartItemQuantity({productId,quantity}))
  }

  getImageUrl(img_name:string){
    return `${this.imagesApiUrl}/${img_name}`
  }

  completePurchasing(){
    this.store.dispatch(CartActions.placeOrder({}))
  }
}
