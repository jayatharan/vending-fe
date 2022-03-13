import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart')

export const selectCartItems = createSelector(selectCartState, state=>state.cartItems)
export const selectCartTotalQty = createSelector(selectCartState, state=>state.totalQty)
export const selectCartTotalCost = createSelector(selectCartState, state=>state.totalCost)
