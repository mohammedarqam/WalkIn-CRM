import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CloseClientPage } from './close-client';

@NgModule({
  declarations: [
    CloseClientPage,
  ],
  imports: [
    IonicPageModule.forChild(CloseClientPage),
  ],
})
export class CloseClientPageModule {}
