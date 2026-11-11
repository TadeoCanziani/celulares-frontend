import { Component, OnInit, signal } from '@angular/core';
import { Celular } from '../models/celular';
import { DatosCelular } from '../service-datos-celular';
import { FiltrosCelularService, FiltrosCelular } from '../filtros-celulares.service';

@Component({
  selector: 'lista-celulares',
  styleUrl: './lista-celulares.scss',
  templateUrl: './lista-celulares.html',
})
export class ListaCelulares implements OnInit {
  celulares = signal<Celular[]>([]);

  constructor(
    private datosCelular: DatosCelular,
    private filtrosService: FiltrosCelularService
  ) {}

  ngOnInit(): void {
    this.cargar({});

    this.filtrosService.filtros$.subscribe((filtros) => {
      this.cargar(filtros);
    });
  }

  cargar(filtros: FiltrosCelular) {
    this.datosCelular.buscar(filtros).subscribe({
      next: (celulares) => this.celulares.set(celulares),
    });
  }
}