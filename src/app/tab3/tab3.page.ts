import { Component ,OnInit, OnChanges} from '@angular/core';
import { QRService } from '../servicios/qr.service';
import { ModalController } from '@ionic/angular';
import { MensajeModalPage } from '../mensaje-modal/mensaje-modal.page';
import { getAuth,onAuthStateChanged  } from "firebase/auth";
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { SpinnerService } from '../servicios/spinner.service';
import { SonidosService } from '../servicios/sonidos.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  creditos:number = 0;
  mensaje:string = '';
  uid: string="";
  usuarioActual :any;
  mostrarScanner:boolean = false;
  constructor(
    private qrService: QRService,
    private modalController: ModalController,
    private spinner: SpinnerService,
    private sonido: SonidosService

  ) 
  {
  }

  ngOnInit() 
  { 
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) 
      {
        this.usuarioActual = user;
        this.uid = this.usuarioActual.uid;

        console.log('Nuevo usuario logueado:', this.usuarioActual.email);
  
        this.verCreditos();
      }
      else
      {
        console.log('Usuario deslogueado');
        this.uid = "";
      }
    });
  }  
  
  async escanearQr() 
  {    
    this.sonido.ejecutarSonido('camara');

    this.mostrarScanner = !this.mostrarScanner
    // const hashSimulado = prompt("Simulá escaneo: pegá un hash");
    // if (!hashSimulado) return;

    // const mensaje = await this.qrService.cargarQr(hashSimulado);
    // this.mensaje = mensaje;
    // this.creditos = await this.qrService.obtenerCreditos();
  }

  async limpiar() 
  {
    this.sonido.ejecutarSonido('limpiar');
    await this.qrService.limpiarCreditos();
    this.creditos = 0;
    this.mensaje = 'Créditos reseteados';
    this.mostrarMensaje();
  }

  async verCreditos() 
  {
    this.creditos = await this.qrService.obtenerCreditos();
  }

  async mostrarMensaje() 
  {
  this.sonido.ejecutarSonido('notificacion');
    const modal = await this.modalController.create({
      component: MensajeModalPage,
      componentProps: { mensaje: this.mensaje }
    });
  
    
    return await modal.present();

  }

  handleQrCodeResult(result: string) 
  {
    this.mostrarScanner = false;
    this.qrService.cargarQr(result).then(async mensaje => {
      this.mensaje = mensaje;
      this.creditos = await this.qrService.obtenerCreditos();
      this.mostrarMensaje();
    });
  }
}
