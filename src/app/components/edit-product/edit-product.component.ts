import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/model/product.model';
import * as ProductActions from '../../state/product/product.actions'
import * as fromProduct from '../../state/product/product.selector'
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product$ = this.store.select(fromProduct.selectProduct)
  name:string = ""
  info:string = ""
  cost:number = 0
  _id:string = ""
  img_name:string = "default.png"

  private imagesApiUrl = `${environment.apiURL}/images`
  private uploadImageUrl = `${environment.apiURL}/upload-image`

  constructor(private store:Store, private http:HttpClient) { }

  ngOnInit(): void {
    this.product$.subscribe(
      res => {
        this.name = res.name
        this.info = res.info
        this.cost = res.cost
        this._id = res._id?res._id:""
      }
    )
  }

  deleteProduct(){
    this.store.dispatch(ProductActions.deleteProduct({productId:this._id}))
  }

  getImageUrl():string {
    return `${this.imagesApiUrl}/${this.img_name}`
  }

  onFileSelected(event: any){
    const fd =  new FormData();
    fd.append('image', event.target.files[0], event.target.files[0].name)
    this.http.post<{img_name:string}>(this.uploadImageUrl,fd)
    .subscribe(
      res => {
        this.img_name = res.img_name
      }
    )
  }

  saveProduct(){
    if(this.name){
      this.store.dispatch(ProductActions.saveProduct({product:{
        _id:this._id,
        name:this.name,
        img_name:this.img_name,
        cost:this.cost,
        info:this.info
      }}))
    }
  }

}
