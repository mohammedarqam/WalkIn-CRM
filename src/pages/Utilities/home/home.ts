import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  totClients : number;

  constructor(
  public navCtrl: NavController,
  public loadingCtrl: LoadingController,
  ) {
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
      loading.dismiss();
    })
  }
}
