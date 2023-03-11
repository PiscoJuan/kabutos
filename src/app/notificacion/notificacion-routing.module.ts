import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacionPage } from './notificacion.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacionPage
  },
  {
    path: 'detalle-notificacion',
    loadChildren: () => import('./detalle-notificacion/detalle-notificacion.module').then( m => m.DetalleNotificacionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacionPageRoutingModule {}
