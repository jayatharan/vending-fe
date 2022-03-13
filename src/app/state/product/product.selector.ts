import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('product')

export const selectProduct = createSelector(selectProductState, state=>state.product)
