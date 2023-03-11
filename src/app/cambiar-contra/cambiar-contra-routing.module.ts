import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarContraPage } from './cambiar-contra.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarContraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarContraPageRoutingModule {}
