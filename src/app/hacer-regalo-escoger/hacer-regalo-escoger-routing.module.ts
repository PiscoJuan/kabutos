import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HacerRegaloEscogerPage } from './hacer-regalo-escoger.page';

const routes: Routes = [
  {
    path: '',
    component: HacerRegaloEscogerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HacerRegaloEscogerPageRoutingModule {}
