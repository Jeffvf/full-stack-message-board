import { Injectable } from '@angular/core';
import { UserCredentials, AuthUser } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private userUrl = "http://localhost:8000/users"

  constructor(private http: HttpClient) { }

  login(user: UserCredentials): Observable<AuthUser>{
    return this.http.post<AuthUser>(`${this.userUrl}/login`, user)
      .pipe(
        catchError(err => of({
            token: '',
            user: '',
            errors: err.error.errors
          } as unknown as AuthUser)
        )
      )
  }
}
