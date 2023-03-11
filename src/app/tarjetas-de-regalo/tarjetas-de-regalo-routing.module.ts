import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarjetasDeRegaloPage } from './tarjetas-de-regalo.page';

const routes: Routes = [
  {
    path: '',
    component: TarjetasDeRegaloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarjetasDeRegaloPageRoutingModule {}
