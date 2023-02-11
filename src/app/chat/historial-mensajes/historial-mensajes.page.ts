import { Component, OnInit } from '@angular/core';
import { MensajeriaService } from 'src/app/servicios/mensajeria.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-historial-mensajes',
  templateUrl: './historial-mensajes.page.html',
  styleUrls: ['./historial-mensajes.page.scss'],
})
export class HistorialMensajesPage implements OnInit {

  constructor(
    private mensajeriaService:MensajeriaService,
    private storage: Storage,


  ) { 
   

  }

  ngOnInit() {

  }

}
