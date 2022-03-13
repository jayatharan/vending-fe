import { createReducer, on } from "@ngrx/store";
import { Product } from "src/app/model/product.model";
import { deleteProduct, saveProduct, selectProduct } from "./product.actions";

export interface ProductState {
    product:Product
}

export const initialProductState: ProductState = {
    product:{
        name:"",
        info:"",
        img_name:"",
        cost:0
    }
}

const _productReducer = createReducer(
    initialProductState,
    on(selectProduct, (state, {product})=>{
        var p = product._id?product:{
            name:"",
            info:"",
            img_name:"",
            cost:0
        }
        return{
            product:p
        }
    }),
    on(deleteProduct, (state, {})=>{
        return{
            ...state
        }
    }),
    on(saveProduct,(state,{product})=>{
        return{
            ...state
        }
    })
)

export function productReducer(state:any, action:any){
    return _productReducer(state,action)
}