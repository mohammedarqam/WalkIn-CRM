import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactAdminPage } from './contact-admin';

@NgModule({
  declarations: [
    ContactAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactAdminPage),
  ],
})
export class ContactAdminPageModule {}
