import { createReducer, on } from "@ngrx/store";
import { Product } from "src/app/model/product.model";
import { retriveProductsFailure, retriveProductsRequest, retriveProductsSuccess, retriveGridProductsFailure, retriveGridProductsRequest, retriveGridProductsSuccess } from "./products.actions";

export interface ProductsState {
    products?:Product[],
    loading:boolean,
    success:boolean,
    error?:string,
    gridProducts?:Product[]
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
            ...state,
            products,
            success:true,
            loading:false
        }
    }),
    on(retriveProductsFailure, (state, {error})=>{
        return{
            ...state,
            loading:false,
            success:true,
            error,
            products:[]
        }
    }),
    on(retriveProductsRequest, (state, {})=>{
        return{
            ...state,
            loading:true,
            success:false
        }
    }),
    on(retriveGridProductsSuccess, (state, { products })=>{
        return{
            ...state,
            gridProducts:products
        }
    })
)

export function productsReducer(state:any, action:any){
    return _productsReducer(state,action)
}