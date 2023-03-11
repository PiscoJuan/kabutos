import { Component, OnInit, ViewChild } from "@angular/core";
import { NavController, Platform } from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { CoberturaService } from "../servicios/cobertura.service";
import { ContactoService } from "../servicios/contacto.service";
import { Storage } from '@ionic/storage';

declare var google;
@Component({
  selector: "app-contacto",
  templateUrl: "./contacto.page.html",
  styleUrls: ["./contacto.page.scss"],
})
export class ContactoPage implements OnInit {
  contactos;
  @ViewChild("mapaUbicacion", { static: true }) mapElement;
  map;
  marker;
  direccion = "";
  envio = "";
  termino="";
  constructor(
    private storage: Storage,
    private contactoService: ContactoService,
    private platform: Platform,
    public coberturaService: CoberturaService,
    private geolocation: Geolocation
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.get("elegirEstab").then((val) => {
      if(Number(val) == 2){
        this.termino="black"
      }
    });
    this.contactoService.getContacto().subscribe(
      (data) => {
        this.contactos = data;
        console.log(this.contactos);
      },
      (error) => {
        console.error(error);
      }
    );
    this.initMap();
    this.Marker();
    setTimeout(() => {
      this.addMarker(this.map);
    }, 2);
  }

  initMap(): void {
    setTimeout(() => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: { lat: -2.2309241289736588, lng: -79.89291268236519 },
        zoom: 17,
      });
    }, 2);
  }

  Marker() {
    console.log("marker");
    var latlng = new google.maps.LatLng(
      -2.2309241289736588,
      -79.89291268236519
    );
    if (this.marker) {
      this.marker.setPosition(latlng);
    }
  }
  addMarker(map: any) {
    this.platform.ready().then(() => {
      this.geolocation
        .getCurrentPosition()
        .then((resp) => {
          console.log(
            "coordenadas al entrar a domicilio/ add marker",
            resp.coords
          );
          this.map.setCenter({
            lat: -2.2309241289736588,
            lng: -79.89291268236519,
          });
          this.verificarPosicionActual();
        })
        .catch((error) => {
          console.log("Error getting location", error);
        });
    });
  }

  verificarPosicionActual() {
    this.verificarPosicion(this.map.getCenter());
  }

  verificarPosicion(event,) {
    this.marker = new google.maps.Marker({
      position: event,
      map: this.map,
    });
  }
}
