import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../state/auth/auth.selector'
import * as AuthActions from '../../state/auth/auth.actions'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = ""
  password: string = ""

  loginLoading$ = this.store.select(fromAuth.selectLoginLoading)
  loginSuccess$ = this.store.select(fromAuth.selectLoginSuccess)

  constructor(private store:Store, private router:Router) { }

  ngOnInit(): void {
    this.loginSuccess$.subscribe(res=>{
      if(res){
        this.router.navigate(['/home'])
      }
    })
  }

  onLoginSubmit() {
    const credential = {
      email:this.email,
      password:this.password
    }

    this.store.dispatch(AuthActions.loginRequest({credential}))
  }

}
