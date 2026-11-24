import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FiltrosCelularService } from '../filtros-celulares.service';
import { FiltrosCelular } from '../models/filtros-celular';
import { Marca } from '../models/marca';
import { DatosMarca } from '../service-datos-marcas';

@Component({
  imports: [],
  selector: 'busqueda',
  styleUrl: './busqueda.scss',
  templateUrl: './busqueda.html',
})
export class Busqueda implements OnInit {
  filtro: FiltrosCelular = {};
  marcas = signal<Marca[]>([]);

  constructor(
    public filtros: FiltrosCelularService,
    private datosMarca: DatosMarca,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.datosMarca.getAll().subscribe({
      next: (marcas) => this.marcas.set(marcas),
      error: (err) => {
        console.error('Error al cargar las marcas para el filtro:', err);
        this.marcas.set([]);
      }
    });
  }

  buscar() {
    this.filtros.actualizar(this.filtro);
  }

  mostrarCelulares() {
    this.router.navigate(['/celulares']);
  }

  limpiar() {
    this.filtro = {};
    this.filtros.actualizar(this.filtro);
  }

  crearNuevo() {
    this.router.navigate(['/celulares', 'nuevo']);
  }

  mostrarMarcas() {
    this.router.navigate(['/marcas']);
  }

  agregarMarca() {
    this.router.navigate(['/marcas', 'nuevo']);
  }
}