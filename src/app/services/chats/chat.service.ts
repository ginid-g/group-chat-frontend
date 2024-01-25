import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = environment.api;

  constructor(private http: HttpClient) {}

  getChat(groupId: string): Observable<any> {
    return this.http.get<Observable<any>>(`${this.apiUrl}/chats/${groupId}`);
  }

  sendMessage(groupId: string, message: string): Observable<any> {
    return this.http.post<Observable<any>>(`${this.apiUrl}/chats`, {
      groupId: groupId,
      message: message,
    });
  }
}
