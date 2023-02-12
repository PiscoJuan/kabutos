import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PremiosUtilizadosPage } from './premios-utilizados.page';

const routes: Routes = [
  {
    path: '',
    component: PremiosUtilizadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PremiosUtilizadosPageRoutingModule {}
