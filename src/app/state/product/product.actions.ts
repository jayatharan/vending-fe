import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/model/product.model';

export const selectProduct = createAction(
    '[Product] Select Product',
    props<{product:Product}>()
)

export const saveProduct = createAction(
    '[Product] Save Product',
    props<{product:Product}>()
)

export const deleteProduct = createAction(
    '[Product] Delete Product',
    props<{productId:string}>()
)



