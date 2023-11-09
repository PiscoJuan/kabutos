import { Component, OnInit } from '@angular/core';
import { TarjetaService } from 'src/app/servicios/tarjeta.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router'
import { PerfilService } from 'src/app/servicios/perfil.service';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.page.html',
  styleUrls: ['./confirmacion.page.scss'],
})
export class ConfirmacionPage implements OnInit {

  constructor(
    public modalController: ModalController,
    public tarjetaService: TarjetaService,
    private loadingCtrl: LoadingController,
    public storage: Storage,
    public router: Router,
    public perfiltarjeta: PerfilService
  ) { }

  ngOnInit() {
  }

  async comprobar(){
    console.log("Entra en Comprobar")
    const numeroAcomprobar: any = document.getElementById('numeroComprobar')
    console.log(numeroAcomprobar.value)
    this.storage.get('id').then(
      (val) => {
        console.log(val)
        const aValidar = {
          id: val,
          numVal: Number(numeroAcomprobar.value)
        }
    
        this.tarjetaService.checkNumValidacion(aValidar).subscribe(
          (data) => {
            console.log(data)
            console.log(data['valid'])
            if(data['valid']== "OK"){
              console.log("SI SIRVE")
            }else{
              console.log("NO SIRVE")
            }
          }
        );
      }
    )
  }
}
