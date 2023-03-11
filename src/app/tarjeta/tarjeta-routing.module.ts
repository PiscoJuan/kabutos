import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarjetaPage } from './tarjeta.page';

const routes: Routes = [
  {
    path: '',
    component: TarjetaPage
  },
  {
    path: 'nueva-tarjeta',
    loadChildren: () => import('./nueva-tarjeta/nueva-tarjeta.module').then( m => m.NuevaTarjetaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarjetaPageRoutingModule {}
