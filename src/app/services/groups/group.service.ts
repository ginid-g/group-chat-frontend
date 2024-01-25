import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = environment.api;

  constructor(private http: HttpClient) {}

  // Create
  createGroup(group: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/groups`, group);
  }

  // Read
  getGroups(): Observable<any> {
    return this.http.get<Observable<any>>(`${this.apiUrl}/groups`);
  }

  // Read by ID
  getGroupById(groupId: string): Observable<any> {
    return this.http.get<Observable<any>>(`${this.apiUrl}/groups/${groupId}`);
  }

  // Update
  updateGroup(groupId: string, updatedGroup: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/groups/${groupId}`, updatedGroup);
  }

  // Delete
  deleteGroup(groupId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/groups/${groupId}`);
  }
}
