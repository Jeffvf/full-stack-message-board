import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Message, MessageRegister } from '../models/message';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseMessageUrl = "http://localhost:8000";
  private messageUrl = "http://localhost:8000/message";

  token = this.tokenStorageService.getToken()
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  })

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
  ) { }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.baseMessageUrl, { headers: this.headers })
  }

  addMessage(message: MessageRegister){
    return this.http.post<MessageRegister>(`${this.messageUrl}/create`, message, { headers: this.headers })
      .pipe(
        catchError(err => of({
          errors: err.error.errors,
          message: message
        })
        )
      )
  }

  updateMessage(message: MessageRegister, id: string){
    return this.http.post<MessageRegister>(`${this.messageUrl}/${id}/update`, message, { headers: this.headers })
      .pipe(
        catchError(err => of({
          errors: err.error.errors,
          message: message
        }))
      )
  }
}
