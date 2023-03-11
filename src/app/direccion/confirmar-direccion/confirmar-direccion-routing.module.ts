import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmarDireccionPage } from './confirmar-direccion.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarDireccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmarDireccionPageRoutingModule {}
