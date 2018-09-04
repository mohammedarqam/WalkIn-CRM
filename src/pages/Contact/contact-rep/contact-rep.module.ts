import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactRepPage } from './contact-rep';

@NgModule({
  declarations: [
    ContactRepPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactRepPage),
  ],
})
export class ContactRepPageModule {}
