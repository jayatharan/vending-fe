import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/model/product.model';
import { environment } from 'src/environments/environment';
import * as CartActions from '../../state/cart/cart.actions'
import * as fromAuth from '../../state/auth/auth.selector'
import * as fromCart from '../../state/cart/cart.selector'

@Component({
  selector: 'app-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.css']
})
export class DashboardProductComponent implements OnInit {
  quantity = 0;
  loginSuccess$ = this.store.select(fromAuth.selectLoginSuccess)
  isAdmin$ = this.store.select(fromAuth.selectIsAdmin)
  private imagesApiUrl = `${environment.apiURL}/images`
  @Input() product:Product = {
    name:"",
    info:"",
    img_name:"default.png",
    cost:0
  };
  
  cartItems$ = this.store.select(fromCart.selectCartItems)

  constructor(private store:Store) { 
    this.cartItems$.subscribe(
      res => {
        var cartItem = res.find(item => item.id == this.product.id)
        if(cartItem){
          this.quantity = cartItem.quantity
        }
      }
    )
  }

  ngOnInit(): void {
  }

  getImageUrl():string {
    return `${this.imagesApiUrl}/${this.product.img_name?this.product.img_name:'default.png'}`
  }

  addToCart(){
    this.store.dispatch(CartActions.addToCart({product:this.product}))
  }

}
