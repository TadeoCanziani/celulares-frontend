import { Component, OnInit, signal } from '@angular/core';
import { Celular } from '../models/celular';
import { DatosCelular } from '../service-datos-celular';

@Component({
  selector: 'lista-celulares',
  styleUrl: './lista-celulares.scss',
  templateUrl: './lista-celulares.html',
})
export class ListaCelulares implements OnInit {
  celulares = signal<Celular[]>([]);

  constructor(private datosCelular: DatosCelular) {}

  ngOnInit(): void {
    this.datosCelular.getAll().subscribe((celulares) => {
      this.celulares.set(celulares);
    });
  }
}