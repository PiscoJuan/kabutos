import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NombreComponentePage } from './nombre-componente.page';

const routes: Routes = [
  {
    path: '',
    component: NombreComponentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NombreComponentePageRoutingModule {}
