import { createAction, props } from '@ngrx/store';
import { AuthResponse } from 'src/app/model/authResponse.model';

export const loginRequest = createAction(
    '[Auth] Login Request',
    props<{ credential:{ email:string; password:string } }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ authData:AuthResponse }>()
)

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error:string }>()
)

export const logout = createAction(
    '[Auth] logout',
    props<any>()
)