import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleInicioPage } from './detalle-inicio.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleInicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleInicioPageRoutingModule {}
