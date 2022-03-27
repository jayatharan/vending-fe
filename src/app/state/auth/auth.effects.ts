import { Injectable } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import * as AuthActions from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { AuthResponse } from "src/app/model/authResponse.model";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
    
    loginRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginRequest),
            exhaustMap((action) => 
                this.authService
                .loginUser(action.credential.email,action.credential.password)
                .pipe(
                    map((authData) => 
                        AuthActions.loginSuccess({authData})
                    ),
                    catchError((error)=> of(AuthActions.loginFailure(error)))
                )
            )
        )
    )

    loginSuccess$ = createEffect(
        () => 
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(({authData}) => 
                    this.router.navigate(['/admin'])
                )
            ),
        {dispatch:false}            
    )

    // logout$ = createEffect(
    //     ()=> 
    //         this.actions$.pipe(
    //             ofType(AuthActions.logout),
    //             tap(({}) => 
    //                 this.router.navigate(['/'])
    //             )
    //         )
    // )

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
      ){}
}