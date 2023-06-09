import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TresDsPage } from './tres-ds.page';

const routes: Routes = [
  {
    path: '',
    component: TresDsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TresDsPageRoutingModule {}
