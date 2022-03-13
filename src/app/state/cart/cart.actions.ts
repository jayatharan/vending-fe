import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/model/product.model';

export const addToCart = createAction(
    '[Cart] Add To Cart',
    props<{product:Product}>()
)

export const chengeCartItemQuantity = createAction(
    '[Cart] Change Cart Item Quantity',
    props<{productId:string, quantity:number}>()
)

export const placeOrder = createAction(
    '[Cart] Place Order',
    props<any>()
)