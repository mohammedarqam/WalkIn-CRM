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


  Name : string;
  Client  : string;
  Date : string;
  Time : string;
  status : string = "Upcoming";

  constructor(
  public navCtrl: NavController, 
  public afDatabase: AngularFireDatabase,
  public navParams: NavParams) {
    

    }


    addM(){
      console.log(this.Date);

    }


    capsName(name){
      this.Name = name.toUpperCase();
    }
}
