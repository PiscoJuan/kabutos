import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HacerRegaloPage } from './hacer-regalo.page';

const routes: Routes = [
  {
    path: '',
    component: HacerRegaloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HacerRegaloPageRoutingModule {}
