import { Routes } from '@angular/router';
import { ListaCelulares } from './lista-celulares/lista-celulares';
import { Busqueda } from './busqueda/busqueda';
import { CelularForm } from './form-celular/form-celular';
import { ListaMarcas } from './lista-marcas/lista-marcas';
import { FormMarca } from './form-marca/form-marca';
import { AcercaDe } from './acerca-de/acerca-de';

export const routes: Routes = [
  { path: '', redirectTo: '/celulares', pathMatch: 'full' },
  { path: 'acerca-de', component: AcercaDe },
  { path: 'celulares/nuevo', component: CelularForm },
  { path: 'celulares/editar/:id', component: CelularForm },
  { path: 'marcas/nuevo', component: FormMarca },
  { path: 'marcas/editar/:id', component: FormMarca },
  { path: 'marcas', component: ListaMarcas },
  {
    path: 'celulares',
    component: ListaCelulares,   // acá va tu lista + búsqueda (ya están integradas)
  },
];