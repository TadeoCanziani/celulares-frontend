import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marca } from './models/marca';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DatosMarca {
  private apiUrl = 'https://celulares-c19e.onrender.com/marcas';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.apiUrl);
  }

  getById(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${this.apiUrl}/${id}`);
  }

  create(marca: Omit<Marca, 'id'>): Observable<Marca> {
    return this.http.post<Marca>(this.apiUrl, marca);
  }

  update(id: number, marca: Pick<Marca, 'nombre'>): Observable<Marca> {
    return this.http.patch<Marca>(`${this.apiUrl}/${id}`, marca);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}