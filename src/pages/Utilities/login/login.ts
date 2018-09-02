import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';
import * as firebase from 'firebase';
import { auth } from 'firebase';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email : string;
  pass : string;

  constructor(
  public navCtrl: NavController, 
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController,
  private firebaseAuth: AngularFireAuth,
  public navParams: NavParams
  ) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        console.log(user.uid);
        this.navCtrl.setRoot(TabsPage);
      }
    })
    loading.dismiss();
  }


  checkData(){
    if(this.email){
        if(this.pass){
          this.login();
        }else{
          this.presentToast("Password Field Empty")
        }
    }else{
      this.presentToast("Email Field Empty");
    }
  }


  login() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.firebaseAuth.auth.signInWithEmailAndPassword(this.email, this.pass)
      .then(value => {
        this.navCtrl.setRoot(TabsPage);
        loading.dismiss();
      })
      .catch(err => {
        this.presentToast(err.message);
        loading.dismiss();
      });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'top',
      showCloseButton: false,
    });
    toast.present();
  }

}
