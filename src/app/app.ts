import { Component, signal } from '@angular/core';
import { ListaCelulares } from './lista-celulares/lista-celulares';
import { FiltrosCelularService } from './filtros-celulares.service';

@Component({
  imports: [ListaCelulares],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('celulares-frontend');

  constructor(public filtros: FiltrosCelularService) {}

    buscar() {
    // El servicio ya reacciona solo cuando cambian los filtros
  }
}