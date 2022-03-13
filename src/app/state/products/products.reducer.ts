import { createReducer, on } from "@ngrx/store";
import { Product } from "src/app/model/product.model";
import { retriveProductsFailure, retriveProductsRequest, retriveProductsSuccess } from "./products.actions";

export interface ProductsState {
    products?:Product[],
    loading:boolean,
    success:boolean,
    error?:string
}

export const initialProductsState: ProductsState = {
    products:[],
    loading: false,
    success: true
} 

const _productsReducer = createReducer(
    initialProductsState,
    on(retriveProductsSuccess, (state, { products })=> {
        return{
            products,
            success:true,
            loading:false
        }
    }),
    on(retriveProductsFailure, (state, {error})=>{
        return{
            loading:false,
            success:true,
            error,
            products:[]
        }
    }),
    on(retriveProductsRequest, (state, {})=>{
        return{
            loading:true,
            success:false
        }
    })
)

export function productsReducer(state:any, action:any){
    return _productsReducer(state,action)
}