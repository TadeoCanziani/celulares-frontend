import { Routes } from '@angular/router';
import { ListaCelulares } from './lista-celulares/lista-celulares';
import { Busqueda } from './busqueda/busqueda';
//import { CelularForm } from './celular-form/celular-form';  // creá este componente
//import { ListaMarcas } from './lista-marcas/lista-marcas'; // creá este componente

export const routes: Routes = [
  { path: '', redirectTo: '/celulares', pathMatch: 'full' },
  {
    path: 'celulares',
    component: ListaCelulares,   // acá va tu lista + búsqueda (ya están integradas)
  },
  //{ path: 'marcas', component: ListaMarcas },
  //{ path: 'celulares/nuevo', component: CelularForm },
  //{ path: 'celulares/editar/:id', component: CelularForm },
];