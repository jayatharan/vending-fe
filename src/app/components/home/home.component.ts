import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromProducts from '../../state/products/products.selector'
import * as fromCart from '../../state/cart/cart.selector'
import * as ProductsAction from '../../state/products/products.actions';
import * as fromAuth from '../../state/auth/auth.selector'
import { Product } from 'src/app/model/product.model';
import * as ProductActions from '../../state/product/product.actions'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products$ = this.store.select(fromProducts.selectProducts)
  productsLoading$ = this.store.select(fromProducts.selectProductsLoading)
  totalQty$ = this.store.select(fromCart.selectCartTotalQty)
  totalCost$ = this.store.select(fromCart.selectCartTotalCost)
  loginSuccess$ = this.store.select(fromAuth.selectLoginSuccess)
  isAdmin$ = this.store.select(fromAuth.selectIsAdmin)
  newProduct:Product = {
    name:"",
    info:"",
    img_name:"default.png",
    cost:0
  }
  constructor(private store:Store) { }

  ngOnInit(): void {
    this.store.dispatch(ProductsAction.retriveProductsRequest({}))
  }

  createNewProduct(){
    this.store.dispatch(ProductActions.selectProduct({product:this.newProduct}))
  }
  
}
