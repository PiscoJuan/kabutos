import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroFbPage } from './registro-fb.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroFbPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroFbPageRoutingModule {}
