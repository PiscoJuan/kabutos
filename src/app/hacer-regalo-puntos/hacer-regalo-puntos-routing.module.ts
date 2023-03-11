import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HacerRegaloPuntosPage } from './hacer-regalo-puntos.page';

const routes: Routes = [
  {
    path: '',
    component: HacerRegaloPuntosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HacerRegaloPuntosPageRoutingModule {}
