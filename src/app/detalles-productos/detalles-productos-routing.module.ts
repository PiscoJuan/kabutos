import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesProductosPage } from './detalles-productos.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesProductosPageRoutingModule {}
