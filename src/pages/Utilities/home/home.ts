import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  totClients : number=0;
  totUpcoming : number=0;

  activities : Observable<any>;
  userId = firebase.auth().currentUser.uid;

  constructor(
  public navCtrl: NavController,
  public afDatabase: AngularFireDatabase,
  public loadingCtrl: LoadingController,
  ) {
    this.getClients();
    this.getUpcoming();

    this.activities = afDatabase.list<any>(`Upcoming/${this.userId}`,ref=>ref.orderByChild('TimeStamp'))
    .snapshotChanges()
    .map(
    changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    });

  }



  getClients(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
      firebase.database().ref("Clients/").child(firebase.auth().currentUser.uid).once('value',items=>{
      this.totClients = items.numChildren();
    }).then(()=>{
      loading.dismiss();
    })
  }

  getUpcoming(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
      firebase.database().ref("Upcoming/").child(firebase.auth().currentUser.uid).once('value',items=>{
      this.totUpcoming = items.numChildren();
    }).then(()=>{
      loading.dismiss();
    })
  }



}
