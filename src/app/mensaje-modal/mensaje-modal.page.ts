import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mensaje-modal',
  templateUrl: './mensaje-modal.page.html',
  styleUrls: ['./mensaje-modal.page.scss'],
  standalone: false
})
export class MensajeModalPage{
  @Input() mensaje: string = "";

  constructor(
    private modalCtrl: ModalController,

  ) { }

  cerrar() {
    this.modalCtrl.dismiss();

  }

}
