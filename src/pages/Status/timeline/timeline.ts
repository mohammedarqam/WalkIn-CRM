import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddAMeetingPage } from '../../Activities/add-a-meeting/add-a-meeting';
import { AddPhoneCallPage } from '../../Activities/add-phone-call/add-phone-call';


@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams) {
  }






  
  addCall(){
    this.navCtrl.push(AddPhoneCallPage);
  }
  addAnAppointment(){
    this.navCtrl.push(AddAMeetingPage)
  }
}
