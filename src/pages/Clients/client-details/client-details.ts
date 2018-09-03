import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-client-details',
  templateUrl: 'client-details.html',
})
export class ClientDetailsPage {

  client = this.navParams.get("client")

  activities : Observable<any>;
  userId = firebase.auth().currentUser.uid;


  constructor(
  public navCtrl: NavController, 
  public afDatabase: AngularFireDatabase,
  public navParams: NavParams) {

    this.activities = afDatabase.list<any>(`Clients/${this.userId}/${this.client.key}/Timeline`,ref=>ref.orderByChild('TimeStamp'))
    .snapshotChanges()
    .map(
    changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    });


  }


}
