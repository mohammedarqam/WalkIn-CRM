import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-timeline-detail',
  templateUrl: 'timeline-detail.html',
})
export class TimelineDetailPage {

  a = this.navParams.get("a");

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
    console.log(this.a);
  }




  tp(a){
    if(a==="Meeting"){
       return "ios-bowtie"
     }
     if(a==="Call"){
       return "ios-call"
     }
   }
 

}
