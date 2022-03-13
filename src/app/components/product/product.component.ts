import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/model/product.model';
import { environment } from 'src/environments/environment';
import * as CartActions from '../../state/cart/cart.actions'
import * as ProductActions from '../../state/product/product.actions'
import * as fromAuth from '../../state/auth/auth.selector'
import * as fromCart from '../../state/cart/cart.selector'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
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

  constructor(private store:Store) { }

  ngOnInit(): void {
    this.cartItems$.subscribe(
      res => {
        var cartItem = res.find(item => item._id == this.product._id)
        if(cartItem){
          this.quantity = cartItem.quantity
        }
      }
    )
  }

  getImageUrl():string {
    return `${this.imagesApiUrl}/${this.product.img_name}`
  }

  addToCart(){
    this.store.dispatch(CartActions.addToCart({product:this.product}))
  }

  selectProduct(){
    this.store.dispatch(ProductActions.selectProduct({product:this.product}))
  }
}
