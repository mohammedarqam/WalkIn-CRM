import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddClientPage } from '../add-client/add-client';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as firebase from 'firebase';
import { ClientDetailsPage } from '../client-details/client-details';

@IonicPage()
@Component({
  selector: 'page-client-list',
  templateUrl: 'client-list.html',
})
export class ClientListPage {

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


details(client){
  this.navCtrl.push(ClientDetailsPage, {client : client});
}







  addClient(){
    this.navCtrl.push(AddClientPage);
  }
}
