import { Component, signal } from '@angular/core';
import { ListaCelulares } from './lista-celulares/lista-celulares';
import { FiltrosCelularService } from './filtros-celulares.service';
import { Busqueda } from './busqueda/busqueda';
import { Footer } from './footer/footer';
import { Logo } from './logo/logo';
import { Header } from './header/header';
import {DatosMarca} from './service-datos-marcas';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [ListaCelulares, Busqueda, Footer, Logo, Header],
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