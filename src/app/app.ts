import { Component } from '@angular/core';
import { Busqueda } from './busqueda/busqueda';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Busqueda, Footer, Header, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}