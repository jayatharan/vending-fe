import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products')

export const selectProducts = createSelector(selectProductsState, state=>state.products)
export const selectProductsLoading = createSelector(selectProductsState, state=>state.loading)
