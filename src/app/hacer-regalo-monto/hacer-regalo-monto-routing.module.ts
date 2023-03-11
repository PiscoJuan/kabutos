import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HacerRegaloMontoPage } from './hacer-regalo-monto.page';

const routes: Routes = [
  {
    path: '',
    component: HacerRegaloMontoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HacerRegaloMontoPageRoutingModule {}
