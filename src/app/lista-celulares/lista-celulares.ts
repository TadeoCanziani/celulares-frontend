import { Component, OnInit, signal } from '@angular/core';
import { Celular } from '../models/celular';
import { DatosCelular } from '../service-datos-celular';
import { FiltrosCelularService } from '../filtros-celulares.service';
import { FiltrosCelular } from '../models/filtros-celular';

@Component({
  selector: 'lista-celulares',
  styleUrl: './lista-celulares.scss',
  templateUrl: './lista-celulares.html',
})
export class ListaCelulares implements OnInit {
  celulares = signal<Celular[]>([]);
  filtrosActuales: FiltrosCelular = {};

  constructor(
    private datosCelular: DatosCelular,
    private filtrosService: FiltrosCelularService
  ) {}

  ngOnInit(): void {
    this.cargar({});

    this.filtrosService.filtros$.subscribe((filtros) => {
      this.filtrosActuales = filtros;
      this.cargar(filtros);
    });
  }

  cargar(filtros: FiltrosCelular) {
    this.datosCelular.buscar(filtros).subscribe({
      next: (celulares) => this.celulares.set(celulares),
    });
  }

  editar(celular: Celular) {
    alert('Editar celular: ' + celular.nombre);
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de que querés eliminar este celular?')) {
      this.datosCelular.delete(id).subscribe({
        next: () => {
          this.cargar(this.filtrosActuales);
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('No se pudo eliminar el celular.');
        }
      });
    }
  }
}