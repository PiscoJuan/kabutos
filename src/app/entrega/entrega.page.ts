import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.page.html',
  styleUrls: ['./entrega.page.scss'],
})
export class EntregaPage implements OnInit {
  total:number;
  colorBack:any = "var(--ion-color-naranja-oscuro)";
  butAtras:any = "../assets/img/atras_naranja.png";
  constructor(
    private storage: Storage,
    private router: Router,
    private navCtrlr: NavController, 
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get("elegirEstab").then((val) => {
      if(Number(val) == 2){
        this.colorBack="#000000"
        this.butAtras= "../assets/img/atras_negro.png"
      }
    });
    console.log("didEnter");
    this.storage.get('total').then((val) => {
      console.log(val);
      this.total=val;
    });
  }

  domicilio(){
    this.storage.set('tipoEntrega','Domicilio');
    this.router.navigate(['/footer/domicilio']); 
  }

  recoger(){
    this.storage.set('tipoEntrega','Local');    
    this.router.navigate(['/footer/recoger-pedido']);
  }

  atras(){
    let animations:AnimationOptions={
      animated: true,
      animationDirection: "back"
    }
    this.navCtrlr.back(animations)
  }

}
