import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: Observable<any>;

  uid  : string;
  
  constructor(
  public navCtrl: NavController, 
  private firebaseAuth: AngularFireAuth,
  public afDatabase: AngularFireDatabase,
  public app : App,
  public navParams: NavParams) {
    this.user = afDatabase.list<any>('Representatives/')
    .snapshotChanges()
    .map(
    changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    });
}











  logout() {
    this.firebaseAuth.auth.signOut().then(()=>{
      this.app.getRootNav().setRoot(LoginPage);
    }) ;
  }

}
