import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-add-a-meeting',
  templateUrl: 'add-a-meeting.html',
})
export class AddAMeetingPage {

  clients : Observable<any>;
  userId = firebase.auth().currentUser.uid;

  constructor(
  public navCtrl: NavController, 
  public afDatabase: AngularFireDatabase,
  public navParams: NavParams) {

    this.clients = afDatabase.list<any>(`Clients/${this.userId}`,ref=>ref.orderByChild('Time'))
    .snapshotChanges()
    .map(
    changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    });
    }




}
