import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthResponse } from '../model/authResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authApiUrl = `${environment.apiURL}/auth`

  constructor( private http: HttpClient ) { }

  loginUser(email:string, password:string ):Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authApiUrl}/login`,{email,password})
  }

}
