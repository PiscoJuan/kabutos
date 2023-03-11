import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomicilioPage } from './domicilio.page';

const routes: Routes = [
  {
    path: '',
    component: DomicilioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomicilioPageRoutingModule {}
