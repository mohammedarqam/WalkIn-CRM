import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  udi = firebase.auth().currentUser.uid;
  restRef= firebase.database().ref("Representatives").child(this.udi);
  userName :string;
  level : number;  
  
  constructor(
  public navCtrl: NavController, 
  private firebaseAuth: AngularFireAuth,
  public loadingCtrl: LoadingController,
  public app : App,
  public navParams: NavParams) {
    this.getUser();
}

  ionViewDidEnter(){
    this.getUser();
  }
getUser(){
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();

  this.restRef.once('value',itemSnapshot=>{
    this.userName = itemSnapshot.val().Name;
    this.level = itemSnapshot.val().Level;
  }).then(()=>{
    loading.dismiss();
  }) ;
  }

  
  
  
  
  
  
  
  
  
  
  logout() {
    this.firebaseAuth.auth.signOut().then(()=>{
      this.app.getRootNav().setRoot(LoginPage);
    }) ;
  }

}
