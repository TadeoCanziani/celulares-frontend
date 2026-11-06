import { Component, signal } from '@angular/core';
import { ListaCelulares } from './lista-celulares/lista-celulares';

@Component({
  imports: [ListaCelulares],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('celulares-frontend');
}
