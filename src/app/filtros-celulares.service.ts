import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FiltrosCelular {
  nombre?: string;
  memoriaRam?: string;
  marcaId?: string;
}

@Injectable({ providedIn: 'root' })
export class FiltrosCelularService {
  private filtrosSubject = new BehaviorSubject<FiltrosCelular>({});
  filtros$ = this.filtrosSubject.asObservable();

  actualizar(filtros: FiltrosCelular) {
    this.filtrosSubject.next(filtros);
  }
}