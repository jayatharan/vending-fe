import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../state/auth/auth.selector'
import * as AuthActions from '../../state/auth/auth.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginSuccess$ = this.store.select(fromAuth.selectLoginSuccess)
  constructor(private store:Store) { }
  

  ngOnInit(): void {
  }

  logout(){
    this.store.dispatch(AuthActions.logout({}))
  }

}
