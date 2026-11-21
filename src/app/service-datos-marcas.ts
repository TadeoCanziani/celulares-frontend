import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marca } from './models/marca';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DatosMarca {
  private apiUrl = 'http://localhost:3000/marcas';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.apiUrl);
  }
}