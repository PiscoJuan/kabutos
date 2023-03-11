import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HacerRegaloProductoPage } from './hacer-regalo-producto.page';

const routes: Routes = [
  {
    path: '',
    component: HacerRegaloProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HacerRegaloProductoPageRoutingModule {}
