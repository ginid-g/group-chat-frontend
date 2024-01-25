import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface UserAuth {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    updatedAt: string;
    createdAt: string;
    username: string;
    role: string;
  };
  auth: {
    token: string;
    createdAt: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.api;

  constructor(private http: HttpClient) {}

  login(auth: any): Observable<any> {
    return this.http.post<Observable<any>>(`${this.apiUrl}/auth`, auth);
  }

  saveUser(data: UserAuth): void {
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('auth', JSON.stringify(data.auth));
  }

  logout(): void {
    localStorage.clear();
  }

  getUser() {
    const user = localStorage.getItem('user');
    if (user) return JSON.parse(user);

    return null;
  }
}
