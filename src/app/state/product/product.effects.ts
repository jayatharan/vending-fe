import { Injectable } from "@angular/core";
import * as ProductActions from './product.actions'
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, tap } from "rxjs";
import { Router } from "@angular/router";
import { ProductService } from "src/app/services/product.service";
import * as ProductsAction from '../products/products.actions'

@Injectable()
export class ProductEffect {

    selectProduct$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProductActions.selectProduct),
                tap(({product})=>
                    this.router.navigate(['/product'])
                )
            ),
        {dispatch:false}
    )

    deleteProduct$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ProductActions.deleteProduct),
            exhaustMap((action) => 
                this.productService
                .deleteProduct(action.productId)
                .pipe(
                    tap(({})=>
                        this.router.navigate(['/home'])
                    )  
                )
            ),    
        )
    )

    saveProduct$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ProductActions.saveProduct),
            exhaustMap((action) => 
                this.productService
                .saveProduct(action.product)
                .pipe(
                    tap(({})=>
                        this.router.navigate(['/home'])
                    )
                )
            ),
        )
    )

    constructor(
        private actions$: Actions,
        private router: Router,
        private productService: ProductService
      ){}

}