import { createReducer, on } from "@ngrx/store";
import { CartItem } from "src/app/model/cart-item.model";
import { addToCart, chengeCartItemQuantity, placeOrder } from "./cart.actions";

export interface CartState {
    cartItems:CartItem[],
    totalQty:number,
    totalCost:number
}

export const initialCartState: CartState = {
    cartItems:[],
    totalCost:0,
    totalQty:0
}

const _cartReducer = createReducer(
    initialCartState,
    on(addToCart, (state, {product})=>{
        console.log(product)
        var cartItems = state.cartItems.map((item)=>item)
        var totalQty = 0
        var totalCost = 0
        var idx = cartItems.findIndex((item)=>{
            if(item.id == product.id) return true
            else return false
        })
        if(idx>-1){
            var cartItem = {...cartItems[idx]}
            cartItem.quantity+=1
            cartItems[idx] = cartItem
        }else{
            var cartItem:CartItem = {...product, quantity:1, _id:product._id?product._id:""}
            cartItems.push(cartItem)
        }
        cartItems.map((item)=>{
            totalQty+=item.quantity
            totalCost+=(item.cost*item.quantity)
        })
        return{
            cartItems,
            totalCost,
            totalQty
        }
    }),
    on(chengeCartItemQuantity, (state, {productId, quantity})=>{
        var cartItems = state.cartItems.map((item)=>item)
        var totalQty = 0
        var totalCost = 0
        var idx = cartItems.findIndex((item)=>{
            if(item.id == productId) return true
            else return false
        })
        if(idx>-1){
            if(quantity>0){
                var cartItem = {...cartItems[idx]}
                cartItem.quantity = quantity
                cartItems[idx] = cartItem

            }else{
                cartItems.splice(idx,1)
            }
        }
        cartItems.map((item)=>{
            totalQty+=item.quantity
            totalCost+=(item.cost*item.quantity)
        })
        return{
            cartItems,
            totalCost,
            totalQty
        }
    }),
    on(placeOrder, (state,{})=>{
        return{
            cartItems:[],
            totalCost:0,
            totalQty:0
        }
    })
)

export function cartReducer(state:any, action:any){
    return _cartReducer(state,action)
}