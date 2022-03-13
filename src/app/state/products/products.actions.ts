import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/model/product.model';

export const retriveProductsRequest = createAction(
    '[Products] Retrive Products Request',
    props<any>()
)

export const retriveProductsSuccess = createAction(
    '[Products] Retrive Products Success',
    props<{products:Product[]}>()
)

export const retriveProductsFailure = createAction(
    '[Products] Retrive Products Failure',
    props<{error:string}>()
)

