import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Celular } from './models/celular';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DatosCelular {
  private apiUrl = 'http://localhost:3000/celulares';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Celular[]> {
    return this.http.get<Celular[]>(this.apiUrl);
  }
}
