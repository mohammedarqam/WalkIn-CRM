import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPhoneCallPage } from './add-phone-call';

@NgModule({
  declarations: [
    AddPhoneCallPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPhoneCallPage),
  ],
})
export class AddPhoneCallPageModule {}
