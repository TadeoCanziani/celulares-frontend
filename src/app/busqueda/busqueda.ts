import { Component, OnInit } from '@angular/core';
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
  marcas: Marca[] = [];

  constructor(
    public filtros: FiltrosCelularService,
    private datosMarca: DatosMarca
  ) {}

  ngOnInit(): void {
    this.datosMarca.getAll().subscribe({
      next: (marcas) => this.marcas = marcas,
      error: () => this.marcas = []
    });
  }

  buscar() {
    this.filtros.actualizar(this.filtro);
  }

  limpiar() {
    this.filtro = {};
    this.filtros.actualizar(this.filtro);
  }
}