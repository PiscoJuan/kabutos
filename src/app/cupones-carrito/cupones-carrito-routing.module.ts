import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuponesCarritoPage } from './cupones-carrito.page';

const routes: Routes = [
  {
    path: '',
    component: CuponesCarritoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuponesCarritoPageRoutingModule {}
