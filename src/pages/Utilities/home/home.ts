import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as firebase from 'firebase';
import { AddPhoneCallPage } from '../../Activities/add-phone-call/add-phone-call';
import { AddAMeetingPage } from '../../Activities/add-a-meeting/add-a-meeting';
import { ContactRepPage } from '../../Contact/contact-rep/contact-rep';
import { UpcomingDetailsPage } from '../upcoming-details/upcoming-details';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  totClients : number=0;
  totUpcoming : number=0;
  moonShow : boolean ;
  activities : Observable<any>;
  userId = firebase.auth().currentUser.uid;

  constructor(
  public navCtrl: NavController,
  public afDatabase: AngularFireDatabase,
  public loadingCtrl: LoadingController,
  ) {

    this.activities = afDatabase.list<any>(`Upcoming/${this.userId}`,ref=>ref.orderByChild('Time'))
    .snapshotChanges()
    .map(
    changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    });

  }

  ionViewWillEnter(){
    this.getClients();
  }

  getClients(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
      firebase.database().ref("Clients/").child(firebase.auth().currentUser.uid).once('value',items=>{
      this.totClients = items.numChildren();
    }).then(()=>{
      firebase.database().ref("Upcoming/").child(firebase.auth().currentUser.uid).once('value',items=>{
        this.totUpcoming = items.numChildren();
        if(this.totUpcoming>0){
          this.moonShow = false;
        }else{
          this.moonShow = true;
        }
      }).then(()=>{
        loading.dismiss();
      })
    })
  }


  
  addCall(){
    this.navCtrl.push(AddPhoneCallPage);
  }
  addAp(){
    this.navCtrl.push(AddAMeetingPage)
  }

  mes(){
    this.navCtrl.push(ContactRepPage);
  }



  tp(a){
   if(a==="Meeting"){
      return "ios-bowtie"
    }
    if(a==="Call"){
      return "ios-call"
    }
  }

  details(a){
    this.navCtrl.push(UpcomingDetailsPage,{a : a});
  }

}