import { Injectable } from '@angular/core';
import { UserCredentials, AuthUser, UserRegister, UserDetail } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
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

  register(user: UserRegister): Observable<UserRegister>{
    return this.http.post<UserRegister>(`${this.userUrl}/create`, user)
      .pipe(
        catchError(err => of({
            user: user,
            errors: err.error.errors
          } as unknown as UserRegister)
        )
      )
  }

  getUser(id: string): Observable<UserDetail>{
    return this.http.get<UserDetail>(`${this.userUrl}/${id}`)
      .pipe(
        tap(user => console.log(user.messages)),
        catchError(err => of({
          errors: err.errors.errors
        } as unknown as UserDetail))
      )
  }
}
