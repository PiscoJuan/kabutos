import { Component, OnInit } from '@angular/core';
import { ContactoService } from '../servicios/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  contactos;
  constructor(
    private contactoService: ContactoService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.contactoService.getContacto().subscribe(data => {
      this.contactos = data;
      console.log(this.contactos);
    }, (error) => {
      console.error(error);
    })
  }

}
