import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_USER_URL } from '../config';
import { User } from '../User';

const headers = { headers: new HttpHeaders({ 
  'Content-Type': 'application/json' 
})}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  signup(user: User): Observable<User> {   
    return this.http.post<User>(`${API_USER_URL}/signup`, user, headers)
  }

  login(user: User): Observable<User> {   
    return this.http.post<User>(`${API_USER_URL}/login`, user, headers)
  }
}
