import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from '../model/product.model';
import { Store } from '@ngrx/store';
import * as fromAuth from '../state/auth/auth.selector'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productApiurl = `${environment.apiURL}/product`
  token$ = this.store.select(fromAuth.selectToken)
  access_token = ""
  constructor( private http: HttpClient, private store:Store ) { 
    this.token$.subscribe(
      res => {
        this.access_token = res?res.access_token:""
      }
    )
  }

  getProducts():Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productApiurl}`)
  }

  getGridProducts(row:number, column:number):Observable<Product[]> {
    let params = new HttpParams().set("row",row).set("column", column)
    return this.http.get<Product[]>(`${this.productApiurl}/grid`, {params:params})
  }
  
  deleteProduct(productId:string):Observable<any> {
    return this.http.delete<any>(`${this.productApiurl}/${productId}`,
    {
      headers:new HttpHeaders({
        'Authorization':`Bearer ${this.access_token}`
      })
    })
  }

  saveProduct(product:Product):Observable<any> {
    if(product._id){
      return this.http.put<any>(`${this.productApiurl}/${product._id}`,product,
      {
        headers:new HttpHeaders({
          'Authorization':`Bearer ${this.access_token}`
        })
      })
    }else{
      return this.http.post<any>(`${this.productApiurl}`,product,
      {
        headers:new HttpHeaders({
          'Authorization':`Bearer ${this.access_token}`
        })
      })
    }
  }

}
