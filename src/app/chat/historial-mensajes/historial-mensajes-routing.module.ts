import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialMensajesPage } from './historial-mensajes.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialMensajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialMensajesPageRoutingModule {}
