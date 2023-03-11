import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoLocalPage } from './info-local.page';

const routes: Routes = [
  {
    path: '',
    component: InfoLocalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoLocalPageRoutingModule {}
