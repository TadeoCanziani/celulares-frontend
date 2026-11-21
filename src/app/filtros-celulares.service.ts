import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FiltrosCelular } from './models/filtros-celular';

@Injectable({ providedIn: 'root' })
export class FiltrosCelularService {
  private filtrosSubject = new BehaviorSubject<FiltrosCelular>({});
  filtros$ = this.filtrosSubject.asObservable();

  actualizar(filtros: FiltrosCelular) {
    this.filtrosSubject.next(filtros);
  }
}