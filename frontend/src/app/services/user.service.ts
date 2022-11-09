import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { API_USER_URL } from '../config';
import { User } from '../models/User';

const headers = { headers: new HttpHeaders({ 
  'Content-Type': 'application/json' 
})}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signup(user: User): Observable<User> {   
    return this.http.post<User>(`${API_USER_URL}/signup`, user, headers)
  }

  login(user: User): Observable<User> {   
    const observable = this.http.post<User>(`${API_USER_URL}/login`, user, headers)
    observable.subscribe((user: any) => {
      if(user.token) {        
        localStorage.setItem('token', JSON.stringify(user.token))
        this.router.navigate(['/admin'])
      }
    })
    return observable
  }

  userLogged(): boolean {
    return localStorage.getItem('token') === null ? false : true
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
