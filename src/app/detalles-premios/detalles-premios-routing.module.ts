import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesPremiosPage } from './detalles-premios.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesPremiosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesPremiosPageRoutingModule {}
