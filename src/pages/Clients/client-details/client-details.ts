import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as firebase from 'firebase';
import { ClientEditPage } from '../client-edit/client-edit';


@IonicPage()
@Component({
  selector: 'page-client-details',
  templateUrl: 'client-details.html',
})
export class ClientDetailsPage {

  client = this.navParams.get("client")

  activities : Observable<any>;
  userId = firebase.auth().currentUser.uid;

  detalisref = firebase.database().ref("Clients").child(this.userId).child(this.client.key);
  details :Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  public loadingCtrl: LoadingController,
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

  ionViewWillEnter() {
    this.getClients();
  }

  getClients(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.detalisref.once('value',itemSnapshot=>{
      this.details = itemSnapshot.val();
    }).then(()=>{
      loading.dismiss();
    })
  }
  


  gtEdit(){
    this.navCtrl.push(ClientEditPage,{key : this.client.key});
  }
}
