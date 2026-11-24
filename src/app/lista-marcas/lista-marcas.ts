import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatosMarca } from '../service-datos-marcas';
import { Marca } from '../models/marca';

@Component({
  imports: [RouterLink],
  selector: 'app-lista-marcas',
  styleUrl: './lista-marcas.scss',
  templateUrl: './lista-marcas.html',
})
export class ListaMarcas implements OnInit {
  marcas = signal<Marca[]>([]);
  cargando = signal(true);
  error = signal(false);
  eliminando = signal<number | null>(null);
  errorEliminar = signal('');
  confirmacionEliminar = signal<{ id: number; nombre: string } | null>(null);
  mensaje = signal('');

  constructor(private datosMarca: DatosMarca) {}

  ngOnInit(): void {
    this.cargarMarcas();
  }

  private cargarMarcas(): void {
    this.cargando.set(true);
    this.error.set(false);
    this.datosMarca.getAll().subscribe({
      next: (marcas) => {
        this.marcas.set(marcas);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar las marcas:', err);
        this.error.set(true);
        this.cargando.set(false);
      },
    });
  }

  solicitarEliminar(id: number, nombre: string): void {
    if (this.eliminando() !== null) {
      return;
    }

    this.errorEliminar.set('');
    this.confirmacionEliminar.set({ id, nombre });
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

    this.eliminando.set(id);
    this.errorEliminar.set('');
    this.mensaje.set('Eliminando marca...');
    this.datosMarca.delete(id).subscribe({
      next: () => {
        this.marcas.update((marcas) => marcas.filter((marca) => marca.id !== id));
        this.confirmacionEliminar.set(null);
        this.eliminando.set(null);
        this.mensaje.set('Marca eliminada correctamente.');
      },
      error: (err) => {
        console.error('Error al eliminar la marca:', err);
        this.errorEliminar.set('No se pudo eliminar la marca. Puede estar asociada a celulares.');
        this.eliminando.set(null);
        this.mensaje.set('');
      },
    });
  }
}
