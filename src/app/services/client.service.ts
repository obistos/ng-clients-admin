import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) { }

  getClient(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createClient(client: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, client);
  }

  updateClient(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getClientsList(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}`);
  }
}
