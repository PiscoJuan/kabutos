import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SugerenciaPage } from './sugerencia.page';

const routes: Routes = [
  {
    path: '',
    component: SugerenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SugerenciaPageRoutingModule {}
