import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  total:number;
  constructor(private storage: Storage,
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
  efectivo(){
    this.router.navigate(['/footer/efectivo']); 
    this.storage.set('tipoPago','Efectivo');
  }

  tarjeta(){
    this.router.navigate(['/footer/tarjeta']); 
    this.storage.set('tipoPago','Tarjeta');
  }

  atras(){
    let animations:AnimationOptions={
      animated: true,
      animationDirection: "back"
    }
    this.navCtrlr.back(animations)
  }

}
