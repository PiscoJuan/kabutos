import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstablecimientoPage } from './establecimiento.page';

const routes: Routes = [
  {
    path: '',
    component: EstablecimientoPage
  },
  {
    path: 'modal-mapa',
    loadChildren: () => import('./modal-mapa/modal-mapa.module').then( m => m.ModalMapaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstablecimientoPageRoutingModule {}
