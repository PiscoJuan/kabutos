import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElegirEstabPage } from './elegir-estab.page';

const routes: Routes = [
  {
    path: '',
    component: ElegirEstabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElegirEstabPageRoutingModule {}
