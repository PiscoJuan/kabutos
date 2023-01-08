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

  constructor(
    private storage: Storage,
    private router: Router,
    private navCtrlr: NavController, 
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
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
