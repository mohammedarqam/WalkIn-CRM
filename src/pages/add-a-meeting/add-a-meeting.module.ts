import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAMeetingPage } from './add-a-meeting';

@NgModule({
  declarations: [
    AddAMeetingPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAMeetingPage),
  ],
})
export class AddAMeetingPageModule {}
