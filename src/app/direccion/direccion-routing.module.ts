import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DireccionPage } from './direccion.page';

const routes: Routes = [
  {
    path: '',
    component: DireccionPage
  },
  {
    path: 'nueva-direccion',
    loadChildren: () => import('./nueva-direccion/nueva-direccion.module').then( m => m.NuevaDireccionPageModule)
  },
  {
    path: 'confirmar-direccion',
    loadChildren: () => import('./confirmar-direccion/confirmar-direccion.module').then( m => m.ConfirmarDireccionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DireccionPageRoutingModule {}
