import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { ContactAdminPage } from '../../Contact/contact-admin/contact-admin';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  udi = firebase.auth().currentUser.uid;
  restRef= firebase.database().ref("Representatives").child(this.udi);
  clientRef = firebase.database().ref("Clients").child(this.udi);
  totClients : number;

  user : Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  private firebaseAuth: AngularFireAuth,
  private alertCtrl: AlertController,
  public loadingCtrl: LoadingController,
  public app : App,
  public navParams: NavParams) {
}

  ionViewWillEnter(){
    this.getUser();
    this.getClients();
  }

  getClients(){
  this.clientRef.once('value',itemSnapshot=>{
    this.totClients = itemSnapshot.numChildren();
  })

  }






  getUser(){
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();

  this.restRef.once('value',itemSnapshot=>{
    this.user = itemSnapshot.val()
  }).then(()=>{
    loading.dismiss();
  }) ;
  }


  Ca(){
    this.navCtrl.push(ContactAdminPage);
  }
  
  logoutConfirm(){
    let alert = this.alertCtrl.create({
      title: 'Do you wanna Logout ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Log Out',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    alert.present();
  }  
  
  logout() {
    this.firebaseAuth.auth.signOut().then(()=>{
      this.app.getRootNav().setRoot(LoginPage);
    }) ;
  }

}
