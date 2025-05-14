import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensajeModalPageRoutingModule } from './mensaje-modal-routing.module';

import { MensajeModalPage } from './mensaje-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MensajeModalPageRoutingModule
  ],
  declarations: [MensajeModalPage]
})
export class MensajeModalPageModule {}
