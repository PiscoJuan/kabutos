import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PremiosInicioPage } from './premios-inicio.page';

const routes: Routes = [
  {
    path: '',
    component: PremiosInicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PremiosInicioPageRoutingModule {}
