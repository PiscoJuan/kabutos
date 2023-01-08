import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { finalize } from 'rxjs/operators';
import { IncorrectoPage } from '../../aviso/incorrecto/incorrecto.page';
import { LoadingController, AlertController } from '@ionic/angular';
import { DireccionEntregaService } from '../../servicios/direccion-entrega.service';
import { CoberturaService } from '../../servicios/cobertura.service';
import { Storage } from '@ionic/storage';
import { ConfirmarDireccionPage } from '../confirmar-direccion/confirmar-direccion.page';
declare var google;

@Component({
  selector: 'app-nueva-direccion',
  templateUrl: './nueva-direccion.page.html',
  styleUrls: ['./nueva-direccion.page.scss'],
})
export class NuevaDireccionPage implements OnInit {
  @Input() public usuarioId: number;
  latitud: any;
  longitud: any;
  zonas: any;
  @ViewChild('mapaUbicacion', { static: true }) mapElement;
  map;
  marker;
  loading: any;
  direccion; envio = "";
  constructor(
    public modalController: ModalController,
    private geolocation: Geolocation,
    public coberturaService: CoberturaService,
    private loadingCtrl: LoadingController,
    public direccionService: DireccionEntregaService,
    public storage: Storage,
    private platform: Platform) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.initMap()
  }

  async datos() {
    await this.showLoading2();
    this.coberturaService.getCobertura()
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        data => {
          this.zonas = data;
          this.drawPolygon();
        },
        err => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
        }
      );
  }

  initMap(): void {
    setTimeout(() => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: { lat: this.latitud, lng: this.longitud },
        zoom: 12
      });
      this.addMarker(this.map);
      google.maps.event.addListener(this.map, 'click', (event) => {
        this.verificarPosicion(event.latLng, "red");
      })
    }, 200);
  }

  addMarker(map: any) {
    this.platform.ready().then(() => {
      console.log("resp")
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitud = resp.coords.latitude;
        this.longitud = resp.coords.longitude;
        this.map.setCenter({ lat: this.latitud, lng: this.longitud });
        this.datos();
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });
  }

  drawPolygon() {
    var color = "blue";
    this.zonas.forEach(element => {
      var coords = JSON.parse(element.zona);
      var poligono = this.makePolygon(coords, "blue");
      poligono.setMap(this.map);
      var contain = google.maps.geometry.poly.containsLocation(
        this.map.getCenter(), poligono);
      color = (contain ? "blue" : "red");
      this.verificarPosicion(this.map.getCenter(), color);
      var $this = this;
      google.maps.event.addListener(poligono, 'click', function (e) {
        $this.verificarPosicion(e.latLng, "blue");
        $this.envio = element.envio;
      });
    });
  }

  verificarPosicion(event, color) {
    console.log(color);
    if (this.marker != undefined) {
      this.marker.setMap(null);
    }
    this.marker = new google.maps.Marker({
      position: event,
      map: this.map
    })
    if (color == "red") {
      let content = "<p>Aún no existe cobertura para esta zona!</p>";
      this.addInfoWindow(this.marker, content);
      this.envio = "";
    } else {
      this.latitud = event.lat();
      this.longitud = event.lng();
    }

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    infoWindow.open(this.map, marker);
  }

  makePolygon(paths, color) {
    return (new google.maps.Polygon({
      paths: paths,
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.35
    }));
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async mensajeIncorrecto(titulo: string, mensaje: string) {
    const modal = await this.modalController.create({
      component: IncorrectoPage,
      cssClass: 'IncorrectoProducto',
      componentProps: {
        'titulo': titulo,
        'mensaje': mensaje
      }
    });
    return await modal.present();
  }

  async showLoading2() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading.....'
    });
    await this.loading.present();

  }

  guardar(form) {
    form = form.value;
    console.log(form);
    if (form.direccion == '' || form.descripcion == '' || this.envio == '') {
      this.mensajeIncorrecto("Campos Incompletos", "Por favor complete los campos requeridos");
    } else {
      form.latitud = this.latitud;
      form.longitud = this.longitud;
      form.envio = this.envio;
      this.storage.get('id').then((val) => {
        if (val != null) {
          form.id = val;
        }
      });
      this.guardarDireccion(form);
    }
  }

  async guardarDireccion(form) {
    await this.showLoading2();
    this.direccionService.nuevaDireccion(form)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        data => {
          console.log(data);
          if (data.valid == "ok") {
            this.confirmar(data.id);
          } else {
            this.mensajeIncorrecto("Error", "No se han guardado los datos modificados");
            this.modalController.dismiss();
          }
        },
        err => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
        }
      );
  }

  async confirmar(id) {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: ConfirmarDireccionPage,
      cssClass: 'confirm-modal',
      componentProps: { id }
    });
    return await modal.present();
  }


}
