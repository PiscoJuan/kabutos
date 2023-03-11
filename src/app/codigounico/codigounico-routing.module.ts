import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigounicoPage } from './codigounico.page';

const routes: Routes = [
  {
    path: '',
    component: CodigounicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigounicoPageRoutingModule {}
