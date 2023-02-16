import { Injectable } from '@angular/core';
import { UserCredentials, AuthUser, UserRegister, UserDetail } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private userUrl = "http://localhost:8000/users"

  token = this.tokenStorageService.getToken() 
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  })

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService) { }

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

  update(user: UserRegister,  id: string): Observable<UserRegister>{
    return this.http.post<UserRegister>(`${this.userUrl}/${id}/update`, user, { headers: this.headers })
      .pipe(
        catchError(err => of({
          user: user,
          errors: err.error.errors
        } as unknown as UserRegister)
        ),
      )
  }

  delete(id: string, password: string, confirmPassword: string): any {
    const params = {
      password,
      confirmPassword
    }
    return this.http.post<any>(`${this.userUrl}/${id}/delete`, params, { headers: this.headers })
      .pipe(
        catchError(err => of({
          errors: err.error.errors
        } as unknown as any)
        ),
      )
  }

  getUser(id: string): Observable<UserDetail>{
    return this.http.get<UserDetail>(`${this.userUrl}/${id}`)
      .pipe(
        catchError(err => of({
          errors: err.errors.errors
        } as unknown as UserDetail))
      )
  }
}
