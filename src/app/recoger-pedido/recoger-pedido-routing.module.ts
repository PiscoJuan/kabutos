import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecogerPedidoPage } from './recoger-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: RecogerPedidoPage
  },
  {
    path: 'info-local',
    loadChildren: () => import('./info-local/info-local.module').then( m => m.InfoLocalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecogerPedidoPageRoutingModule {}
