import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterPage } from './footer.page';

const routes: Routes = [
  {
    path: 'footer',
    component: FooterPage,
    children: [
      
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../auth/login/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
          },
          {
            path: 'editar-perfil',
            loadChildren: () => import('../perfil/editar-perfil/editar-perfil.module').then(m => m.EditarPerfilPageModule)
          }
        ]

      },
      {
        path: 'producto',
        loadChildren: () => import('../producto/producto.module').then(m => m.ProductoPageModule)
      },
      {
        path: 'notificacion',
        loadChildren: () => import('../notificacion/notificacion.module').then(m => m.NotificacionPageModule)
      },
      {
        path: 'ofertas',
        loadChildren: () => import('../ofertas/ofertas.module').then(m => m.OfertasPageModule)
      },
      {
        path: 'establecimiento',
        loadChildren: () => import('../establecimiento/establecimiento.module').then(m => m.EstablecimientoPageModule)
      },
      {
        path: 'shopping-cart',
        loadChildren: () => import('../shopping-cart/shopping-cart.module').then(m => m.ShoppingCartPageModule)
      },
      {
        path: 'contacto',
        loadChildren: () => import('../contacto/contacto.module').then(m => m.ContactoPageModule)
      },
      {
        path: 'sugerencia',
        loadChildren: () => import('../sugerencia/sugerencia.module').then(m => m.SugerenciaPageModule)
      },
      {
        path: 'pagar',
        loadChildren: () => import('../pagar/pagar.module').then(m => m.PagarPageModule)
      },
      {
        path: 'entrega',
        loadChildren: () => import('../entrega/entrega.module').then(m => m.EntregaPageModule)
      },
      {
        path: 'domicilio',
        loadChildren: () => import('../domicilio/domicilio.module').then(m => m.DomicilioPageModule)
      },
      {
        path: 'cupones',
        loadChildren: () => import('../cupones/cupones.module').then(m => m.CuponesPageModule)
      },
      {
        path: 'politicas',
        loadChildren: () => import('../politicas/politicas.module').then(m => m.PoliticasPageModule)
      },
      {
        path: 'historial',
        children: [
          {
            path: '',
            loadChildren: () => import('../historial/historial.module').then(m => m.HistorialPageModule)
          },
          {
            path: 'detalle-historial',
            loadChildren: () => import('../historial/detalle-historial/detalle-historial.module').then(m => m.DetalleHistorialPageModule)
          }
        ]
      },
      {
        path: 'pago',
        loadChildren: () => import('../pago/pago.module').then(m => m.PagoPageModule)
      },
      {
        path: 'efectivo',
        loadChildren: () => import('../efectivo/efectivo.module').then(m => m.EfectivoPageModule)
      },
      {
        path: 'tarjeta',
        loadChildren: () => import('../tarjeta/tarjeta.module').then(m => m.TarjetaPageModule)
      },
      {
        path: 'info-tarjeta',
        loadChildren: () => import('../info-tarjeta/info-tarjeta.module').then(m => m.InfoTarjetaPageModule)
      },
      {
        path: 'categorias',
        children: [
          {
            path: '',
            loadChildren: () => import('../categorias/categorias.module').then(m => m.CategoriasPageModule)
          },
          {
            path: 'detalle-categoria',
            loadChildren: () => import('../categorias/detalle-categoria/detalle-categoria.module').then(m => m.DetalleCategoriaPageModule)
          }
        ]
      },
      {
        path: 'recoger-pedido',
        children: [
          {
            path: '',
            loadChildren: () => import('../recoger-pedido/recoger-pedido.module').then(m => m.RecogerPedidoPageModule)
          },
          {
            path: 'info-local',
            loadChildren: () => import('../recoger-pedido/info-local/info-local.module').then(m => m.InfoLocalPageModule)
          }
        ]
      },
      {
        path: 'codigos',
        loadChildren: () => import('../codigos/codigos.module').then( m => m.CodigosPageModule)
      },
      {
        path: 'tarjetas-de-regalo',
        loadChildren: () => import('../tarjetas-de-regalo/tarjetas-de-regalo.module').then( m => m.TarjetasDeRegaloPageModule)
      },
      {
        path: 'hacer-regalo',
        loadChildren: () => import('../hacer-regalo/hacer-regalo.module').then( m => m.HacerRegaloPageModule)
      },
      {
        path: 'hacer-regalo-escoger',
        loadChildren: () => import('../hacer-regalo-escoger/hacer-regalo-escoger.module').then( m => m.HacerRegaloEscogerPageModule)
      },
      {
        path: 'hacer-regalo-monto',
        loadChildren: () => import('../hacer-regalo-monto/hacer-regalo-monto.module').then( m => m.HacerRegaloMontoPageModule)
      },
      {
        path: 'hacer-regalo-puntos',
        loadChildren: () => import('../hacer-regalo-puntos/hacer-regalo-puntos.module').then( m => m.HacerRegaloPuntosPageModule)
      },
      {
        path: 'hacer-regalo-producto',
        loadChildren: () => import('../hacer-regalo-producto/hacer-regalo-producto.module').then( m => m.HacerRegaloProductoPageModule)
      },
      {
        path: 'cupones-carrito',
        loadChildren: () => import('../cupones-carrito/cupones-carrito.module').then( m => m.CuponesCarritoPageModule)
      },
      {
        path: 'premios',
        loadChildren: () => import('../premios/premios.module').then( m => m.PremiosPageModule)
      },
      {
        path: 'puntos',
        loadChildren: () => import('../puntos/puntos.module').then( m => m.PuntosPageModule)
      },
      {
        path: 'catalogo',
        loadChildren: () => import('../catalogo/catalogo.module').then( m => m.CatalogoPageModule)
      },
      {
        path: 'elegir-estab',
        loadChildren: () => import('../elegir-estab/elegir-estab.module').then( m => m.ElegirEstabPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/elegir-estab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FooterPageRoutingModule { }
