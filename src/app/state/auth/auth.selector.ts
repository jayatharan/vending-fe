import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth')

export const selectToken = createSelector(selectAuthState, state=>state.token)
export const selectUser = createSelector(selectAuthState, state=>state.user)
export const selectLoginLoading = createSelector(selectAuthState, state=>state.loading)
export const selectLoginSuccess = createSelector(selectAuthState, state=>state.success)
export const selectIsAdmin = createSelector(selectAuthState, state=>state.isAdmin)