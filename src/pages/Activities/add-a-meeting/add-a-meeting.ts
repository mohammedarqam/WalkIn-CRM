import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';



@IonicPage()
@Component({
  selector: 'page-add-a-meeting',
  templateUrl: 'add-a-meeting.html',
})
export class AddAMeetingPage {
  clients : Array<any>;
  userId = firebase.auth().currentUser.uid;
  clientRef = firebase.database().ref("Clients/").child(this.userId);


  Name : string;
  Client  : string;
  Date : string;
  Time : string;
  Status : string;
  sub : string;


  constructor(
  public navCtrl: NavController, 
  public loadingCtrl: LoadingController,
  public navParams: NavParams) {
    this.getClients();
    }


    
    addM(){
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();

      firebase.database().ref("Timelines/").child(this.userId).push({
        EntityName : this.Name,
        Status : this.Status,
        Client : this.Client,
        Date : this.Date,
        Time :  this.Time,
        Type : "Meeting",
        Subject : this.sub,
        TimeStamp : moment().format()
      }).then(()=>{
        firebase.database().ref("Clients/"+this.userId).child(this.Client).child("Timeline").push({
          Title : this.Name,
          Status : this.Status,
          Date : this.Date,
          Time :  this.Time,
          Type : "Meeting",
          Subject : this.sub,
          TimeStamp : moment().format()
        }).then(()=>{
          if(this.Status==="Upcoming"){
            firebase.database().ref("Upcoming").child(this.userId).push({
              Title : this.Name,
              Status : this.Status,
              Client : this.Client,
              Date : this.Date,
              Time :  this.Time,
              Type : "Meeting",
              Subject : this.sub,
              TimeStamp : moment().format()
                    
            }).then(()=>{
              this.navCtrl.pop();
              loading.dismiss();
            })
          }else{
            this.navCtrl.pop();
            loading.dismiss()
          }
        })
      })
    }


    getClients(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
      this.clientRef.once('value',itemSnapshot=>{
        this.clients = [];
        itemSnapshot.forEach(itemSnap =>{
          var temp = itemSnap.val();
          temp.key = itemSnap.key;
          this.clients.push(temp);
          return false;
        });
    }).then(()=>{
      loading.dismiss();
    }) ;
}


    capsName(name){
      this.Name = name.toUpperCase();
    }
}
