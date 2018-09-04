import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})

export class TimelinePage {

  activities : Observable<any>;
  userId = firebase.auth().currentUser.uid;

  constructor(
  public navCtrl: NavController, 
  public afDatabase: AngularFireDatabase,
  public navParams: NavParams) {

    this.activities = afDatabase.list<any>(`Timelines/${this.userId}`,ref=>ref.orderByChild('TimeStamp'))
    .snapshotChanges()
    .map(
    changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    });


  }






}
