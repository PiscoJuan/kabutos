import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registro-exitoso',
  templateUrl: './registro-exitoso.page.html',
  styleUrls: ['./registro-exitoso.page.scss'],
})
export class RegistroExitosoPage implements OnInit {

  constructor( private loading: LoadingController, private  router:  Router,) { }

  ngOnInit() {
  }


  showLoading() {  
    this.loading.create({  
      message: 'Loading.....'   
      }).then((loading) => {  
       loading.present();{
        this.router.navigateByUrl('/login');
      } 
       setTimeout(() => {   
         loading.dismiss();  
       }, 1000 );   
      });  
    }


}
