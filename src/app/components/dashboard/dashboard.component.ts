import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { Store } from '@ngrx/store';
import * as fromProducts from '../../state/products/products.selector'
import * as ProductsAction from '../../state/products/products.actions';
import {RealtimeDatabaseService} from '../../services/realtime-database.service'
import {Observable} from 'rxjs'
import {FirebaseProduct} from '../../model/firebase.model'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products$ = this.store.select(fromProducts.selectProducts)
  products:Product[] = []
  types:string[] =  []
  typeProducts:Product[] = []
  caloriesRange:{range:string, min:number, max:number }[] = []
  caloriesProducts:Product[] = []

  highSale$: Observable<FirebaseProduct[]>;
  highSale: FirebaseProduct[] = []
  highSaleIndex:number = -1
  highStock$: Observable<FirebaseProduct[]>;
  highStock: FirebaseProduct[] = []
  highStockIndex:number = -1
  typeIndex:number = -1
  caloriesIndex:number = -1
  selectedType:string = 'all'
  selectedRange:string = 'all'

  gridProducts$ = this.store.select(fromProducts.selectGridProducts)
  row:number = 1
  column:number = 1

  constructor(private store:Store, private realtimeDb:RealtimeDatabaseService) {
    this.highSale$ = realtimeDb.getHighSales();
    this.highSale$.subscribe((res)=>{
      if(res.length) this.highSaleIndex = 0
      else this.highSaleIndex = -1
      this.highSale = res
    })
    this.highStock$ = realtimeDb.gethighStocks();
    this.highStock$.subscribe((res)=>{
      if(res.length) this.highStockIndex = 0
      else this.highStockIndex = -1
      this.highStock = res
    })
    this.products$.subscribe((res)=>{
      if(res){
        this.products = res
        this.typeProducts = this.products
        this.caloriesProducts = this.products
        if (res.length){ this.typeIndex = 0; this.caloriesIndex=0;}
        let maxCalories = 0
        let minCalories = 0
        res.forEach((p)=>{
          if(p.type){
              if(!this.types.includes(p.type)){
                this.types.push(p.type)
              }
          }
          if(p.calories){
            if(p.calories>maxCalories) maxCalories = p.calories
            if(p.calories<minCalories) minCalories = p.calories
          }
        }) 
        let range = maxCalories-minCalories
        if(range>0){
          let d = range/4
          for (let  i = 0; i<4; i++){
            this.caloriesRange.push({
              range:`${minCalories/1000}Kcal to ${(minCalories+d)/1000}Kcal`,
              min:minCalories,
              max:minCalories+d
            })
            minCalories+=d
          }
        }
      }
    })
  }

  ngOnInit(): void {
    this.store.dispatch(ProductsAction.retriveProductsRequest({}))
    this.getGridProducts()
  }

  getGridProducts(){
    this.store.dispatch(ProductsAction.retriveGridProductsRequest({row:this.row,column:this.column}))
  }

  changeRow(action:string){
    if(action == 'add'){
      this.row = this.row+1
    }else if(action == 'sub'){
      if(this.row > 1){
        this.row = this.row-1
      }
    }
    this.getGridProducts()
  }

  changeColumn(action:string){
    if(action == 'add'){
      if(this.column==1){
        this.column = 2    }
    }else if(action == 'sub'){
      if(this.column == 2){
        this.column = 1
      }
    }
    this.getGridProducts()
  }

  changeIndex(o:string,d:string){
    if(o=='highSale'){
      if(this.highSaleIndex==-1) return
      if(d=='add'){
        if(this.highSaleIndex<3){
          this.highSaleIndex = this.highSaleIndex+1
        }
      }else if(d == 'sub'){
        if(this.highSaleIndex>0){
          this.highSaleIndex = this.highSaleIndex-1
        }
      }
    }else if(o=='highStock'){
      if(this.highStockIndex==-1) return
      if(d=='add'){
        if(this.highStockIndex<3){
          this.highStockIndex = this.highStockIndex+1
        }
      }else if(d == 'sub'){
        if(this.highStockIndex>0){
          this.highStockIndex = this.highStockIndex-1
        }
      }
    }else if(o=='type'){
      if(this.typeIndex==-1) return
      if(d=='add'){
        if(this.typeIndex<this.typeProducts.length){
          this.typeIndex = this.typeIndex+1
        }
      }else if(d == 'sub'){
        if(this.typeIndex>0){
          this.typeIndex = this.typeIndex-1
        }
      }
    }else if(o=='calories'){
      if(this.caloriesIndex==-1) return
      if(d=='add'){
        if(this.caloriesIndex<this.caloriesProducts.length){
          this.caloriesIndex = this.caloriesIndex+1
        }
      }else if(d == 'sub'){
        if(this.caloriesIndex>0){
          this.caloriesIndex = this.caloriesIndex-1
        }
      }
    }
  }

  typeChange(){
    if(this.selectedType == 'all'){
      this.typeProducts = this.products  
    }else{
      this.typeProducts = this.products.filter(p=>p.type == this.selectedType)
    }
    if(this.typeProducts.length) this.typeIndex = 0
    else this.typeIndex = -1
  }

  rangeChange(){
    if(this.selectedRange == 'all'){
      this.caloriesProducts = this.products
    }else{
      let range = this.caloriesRange.find(r=>r.range == this.selectedRange)
      let ps:Product[] = []
      this.products.forEach(p=>{
        if(p.calories && range){
          if(p.calories > range.min && p.calories <= range.max) ps.push(p)
        }
      })
      this.caloriesProducts = ps
    }
    if(this.caloriesProducts.length) this.caloriesIndex = 0
    else this.caloriesIndex = -1
  }
}
