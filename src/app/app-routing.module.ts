

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./auth/registro/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro-fb',
    loadChildren: () => import('./auth/registro-fb/registro-fb.module').then( m => m.RegistroFbPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'registro-exitoso',
    loadChildren: () => import('./auth/registro/registro-exitoso/registro-exitoso.module').then( m => m.RegistroExitosoPageModule)
  },
  {
    path: 'detalles-productos',
    loadChildren: () => import('./detalles-productos/detalles-productos.module').then( m => m.DetallesProductosPageModule)
  },
  {
    path: 'incorrecto',
    loadChildren: () => import('./aviso/incorrecto/incorrecto.module').then( m => m.IncorrectoPageModule)
  },
  {
    path: 'correcto',
    loadChildren: () => import('./aviso/correcto/correcto.module').then( m => m.CorrectoPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./footer/footer.module').then( m => m.FooterPageModule)
  },
  {
    path: 'direccion',
    loadChildren: () => import('./direccion/direccion.module').then( m => m.DireccionPageModule)
  },
  {
    path: 'domicilio',
    loadChildren: () => import('./domicilio/domicilio.module').then( m => m.DomicilioPageModule)
  },
  {
    path: 'pregunta',
    loadChildren: () => import('./aviso/pregunta/pregunta.module').then( m => m.PreguntaPageModule)
  },
  {
    path: 'calificar',
    loadChildren: () => import('./calificar/calificar.module').then( m => m.CalificarPageModule)
  },
  {
    path: 'codigounico',
    loadChildren: () => import('./codigounico/codigounico.module').then( m => m.CodigounicoPageModule)
  },
  {
    path: 'premios',
    loadChildren: () => import('./premios/premios.module').then( m => m.PremiosPageModule)
  },
  {
    path: 'puntos',
    loadChildren: () => import('./puntos/puntos.module').then( m => m.PuntosPageModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./catalogo/catalogo.module').then( m => m.CatalogoPageModule)
  },
  {
    path: 'detalles-premios',
    loadChildren: () => import('./detalles-premios/detalles-premios.module').then( m => m.DetallesPremiosPageModule)
  },
  {
    path: 'historial-mensajes',
    loadChildren: () => import('./chat/historial-mensajes/historial-mensajes.module').then( m => m.HistorialMensajesPageModule)
  },
  {
    path: 'mensajes',
    loadChildren: () => import('./chat/mensajes/mensajes.module').then( m => m.MensajesPageModule)
  },
  {
    path: 'elegir-estab',
    loadChildren: () => import('./elegir-estab/elegir-estab.module').then( m => m.ElegirEstabPageModule)
  },
  {
    path: 'premios-inicio',
    loadChildren: () => import('./premios-inicio/premios-inicio.module').then( m => m.PremiosInicioPageModule)
  },
  {
    path: 'premios-utilizados',
    loadChildren: () => import('./premios-utilizados/premios-utilizados.module').then( m => m.PremiosUtilizadosPageModule)
  },
  {
    path: 'cambiar-contra',
    loadChildren: () => import('./cambiar-contra/cambiar-contra.module').then( m => m.CambiarContraPageModule)
  },
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

