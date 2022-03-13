import { Injectable } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import * as ProductsActions from './products.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from "rxjs";

@Injectable()
export class ProductsEffects {

    productsRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ProductsActions.retriveProductsRequest),
            exhaustMap((action) =>
                this.productService
                .getProducts()
                .pipe(
                    map((products) =>
                        ProductsActions.retriveProductsSuccess({products})
                    ),
                    catchError((error)=> of(ProductsActions.retriveProductsFailure(error)))
                )
            )
        )
    )

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ){}
}