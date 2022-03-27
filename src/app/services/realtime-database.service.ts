import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs';
import {FirebaseProduct} from '../model/firebase.model'

@Injectable({
  providedIn: 'root'
})
export class RealtimeDatabaseService {

  constructor( private realtimeDb: AngularFireDatabase ) { }

  getHighSales(): Observable<any> {
    return this.realtimeDb.list<FirebaseProduct>('data/highSale').valueChanges();
  }

  gethighStocks(): Observable<any> {
    return this.realtimeDb.list<FirebaseProduct>('data/highStock').valueChanges();
  }
  
}
