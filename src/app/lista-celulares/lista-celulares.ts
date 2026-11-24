import { Component, OnInit, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Celular } from '../models/celular';
import { Marca } from '../models/marca';
import { DatosCelular } from '../service-datos-celular';
import { DatosMarca } from '../service-datos-marcas';
import { FiltrosCelularService } from '../filtros-celulares.service';
import { FiltrosCelular } from '../models/filtros-celular';

@Component({
  selector: 'lista-celulares',
  imports: [RouterLink],
  styleUrl: './lista-celulares.scss',
  templateUrl: './lista-celulares.html',
})
export class ListaCelulares implements OnInit {
  celulares = signal<Celular[]>([]);
  marcas = signal<Marca[]>([]);
  marcasPorId = computed(() => new Map(this.marcas().map((marca) => [marca.id, marca.nombre] as const)));
  confirmacionEliminar = signal<{ id: number; nombre: string } | null>(null);
  eliminando = signal<number | null>(null);
  error = signal('');
  errorEliminar = signal('');
  mensaje = signal('');
  filtrosActuales: FiltrosCelular = {};

  constructor(
    private datosCelular: DatosCelular,
    private filtrosService: FiltrosCelularService,
    private datosMarca: DatosMarca
  ) {}

  ngOnInit(): void {
    this.cargar({});
    this.datosMarca.getAll().subscribe({
      next: (marcas) => this.marcas.set(marcas),
      error: (err) => console.error('Error al cargar las marcas para la lista de celulares:', err),
    });

    this.filtrosService.filtros$.subscribe((filtros) => {
      this.filtrosActuales = filtros;
      this.cargar(filtros);
    });
  }

  cargar(filtros: FiltrosCelular) {
    this.error.set('');
    this.datosCelular.buscar(filtros).subscribe({
      next: (celulares) => this.celulares.set(celulares),
      error: (err) => {
        console.error('Error al cargar los celulares:', err);
        this.error.set('No se pudieron cargar los celulares.');
      },
    });
  }

  solicitarEliminar(id: number, nombre: string): void {
    if (this.eliminando() !== null) {
      return;
    }

    this.confirmacionEliminar.set({ id, nombre });
    this.errorEliminar.set('');
    this.mensaje.set('');
  }

  cancelarEliminacion(): void {
    if (this.eliminando() !== null) {
      return;
    }

    this.confirmacionEliminar.set(null);
    this.errorEliminar.set('');
    this.mensaje.set('');
  }

  eliminar(id: number): void {
    if (this.eliminando() !== null || this.confirmacionEliminar()?.id !== id) {
      return;
    }

    this.errorEliminar.set('');
    this.mensaje.set('Eliminando celular...');
    this.eliminando.set(id);
    this.datosCelular.delete(id).subscribe({
      next: () => {
        this.celulares.update((celulares) => celulares.filter((celular) => celular.id !== id));
        this.confirmacionEliminar.set(null);
        this.eliminando.set(null);
        this.mensaje.set('Celular eliminado correctamente.');
      },
      error: (err) => {
        console.error('Error al eliminar el celular:', err);
        this.errorEliminar.set('No se pudo eliminar el celular.');
        this.eliminando.set(null);
        this.mensaje.set('');
      },
    });
  }
}