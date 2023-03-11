import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalMapaPage } from './modal-mapa.page';

const routes: Routes = [
  {
    path: '',
    component: ModalMapaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalMapaPageRoutingModule {}
