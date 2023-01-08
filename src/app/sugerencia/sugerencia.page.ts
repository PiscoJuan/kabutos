import { Component, OnInit } from '@angular/core';
import { FileUploader} from  'ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';
import { IncorrectoPage } from '../aviso/incorrecto/incorrecto.page';
import { ReclamoService } from '../servicios/reclamo.service';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { CorrectoPage } from '../aviso/correcto/correcto.page';

@Component({
  selector: 'app-sugerencia',
  templateUrl: './sugerencia.page.html',
  styleUrls: ['./sugerencia.page.scss'],
})
export class SugerenciaPage implements OnInit {
  public fileUploader: FileUploader = new FileUploader({});
  formData = new FormData();
  url = "";
  descripcion = "";
  loading;

  constructor(
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    public reclamoService: ReclamoService) { }

  ngOnInit() {
  }
  
  changeFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      console.log(event.target.files)
      console.log(event.target.files[0])
      console.log(event.target.files[0].name)
      this.formData.set("url", event.target.files[0]);
      reader.onload = (event) => { 
        var ul = ""
        var buf = this.convert(event.target.result, ul)
        this.url = buf;
        (document.querySelector('.div-sugerencia > img') as HTMLElement).style.height = '100%';
        (document.querySelector('.div-sugerencia > img') as HTMLElement).style.margin = '0';
      }
      
    }
  }

  public delete() {
    this.url = '';
    (document.querySelector('.div-sugerencia > img') as HTMLElement).style.height = '25%';

  }

  convert(buff,buff2){
    for (var i=0, strLen=buff.length; i < strLen; i++) {
      buff2= buff2 + buff[i];
    }
    var buff3 = buff2
    //console.log(buff2)
    return buff3;
  }

  enviar(form){
    form = form.value;
    console.log(form);
    if(form.descripcion == ''){
      this.mensajeIncorrecto("Campos Incompletos","Por favor complete el campo descripción");
    }else{
      this.formData.append("descripcion", form.descripcion);
      this.enviarReclamo();
    }
  }

  async enviarReclamo(){
    await this.showLoading2();
    this.reclamoService.envioReclamo(this.formData)
    .pipe(
      finalize(async () => {
        await this.loading.dismiss();
      })
    )
    .subscribe(
      data => {
        console.log(data);
        if(data.valid == "ok"){
          this.mensajeCorrecto("Comentario enviado","Su comentario ha sido enviado con éxito.");
          this.url="";
          (document.querySelector('.div-sugerencia > img') as HTMLElement).style.height = '25%';
          (document.querySelector('.div-sugerencia > img') as HTMLElement).style.margin = 'auto';
          this.descripcion=""
        }else{
          this.mensajeIncorrecto("Error","No se ha completado su solicitud");
        }
      },
      err => {
        this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
      }
    );
  }

  async mensajeCorrecto(titulo: string, mensaje: string) {
    const modal = await this.modalController.create({
      component: CorrectoPage,
      cssClass: 'CorrectoProducto',
      componentProps: {
        'titulo': titulo,
        'mensaje': mensaje
      }
    });
    return await modal.present();
  }

  async mensajeIncorrecto(titulo:string,mensaje:string){
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

}
