import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Celular } from './models/celular';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DatosCelular {
  private apiUrl = 'http://localhost:3000/celulares';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Celular[]> {
    return this.http.get<Celular[]>(this.apiUrl);
  }

  buscar(filtros: { nombre?: string; memoriaRam?: string; marcaId?: string }): Observable<Celular[]> {
    let params = new HttpParams();
    if (filtros.nombre) params = params.set('nombre', filtros.nombre);
    if (filtros.memoriaRam) params = params.set('memoriaRam', filtros.memoriaRam);
    if (filtros.marcaId) params = params.set('marcaId', filtros.marcaId);
    return this.http.get<Celular[]>(this.apiUrl, { params });
  }
}