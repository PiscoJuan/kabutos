import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
declare var google;

@Component({
  selector: 'app-modal-mapa',
  templateUrl: './modal-mapa.page.html',
  styleUrls: ['./modal-mapa.page.scss'],
})
export class ModalMapaPage implements OnInit {
  @Input() public latitud: number;
  @Input() public longitud: number;
  map;
  @ViewChild('mapaUbicacion', { static: true }) mapElement;
  
  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  
  addMarker(map:any){

    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: map.getCenter(),
      draggable:true
    });
    
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: this.latitud, lng: this.longitud},
      zoom: 16
    });
    this.addMarker(this.map);
  }, 600);
    
  }

  dismiss(){
    this.modalController.dismiss();
  }

  ionViewWillLeave() {
    console.log("elimina--")    
  }
}
