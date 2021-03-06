import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';



@IonicPage()
@Component({
  selector: 'page-add-a-meeting',
  templateUrl: 'add-a-meeting.html',
})
export class AddAMeetingPage {
  public clients : Array<any>;
  userId = firebase.auth().currentUser.uid;
  clientRef = firebase.database().ref("Clients/").child(this.userId);


  ClientName : string;

  Name : string;
  Client  : string;
  Date : string;
  Time : string;
  Status : string;
  sub : string;

  CN : string ;

  constructor(
  public navCtrl: NavController, 
  public toastCtrl: ToastController,
  public loadingCtrl: LoadingController,
  public navParams: NavParams) {
    }

    ionViewWillEnter(){
      this.getClients();
    }
    
    checkData(){
      if(this.Name){
        if(this.Status){
          if(this.Client){
            if(this.Date){
              if(this.Time){
                this.addM();
              }else{
                this.presentToast("Select Time");
              }
            }else{
              this.presentToast("Date not Selected");
            }
          }else{
            this.presentToast("Select a Client");
          }
        }else{
          this.presentToast("Assign a Status");
        }
      }else{
        this.presentToast("Enter a Title");
      }
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
        ClientName : this.ClientName,
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
              ClientKey : this.Client,
              ClientName : this.ClientName,
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
      this.clientRef.once('value',itemSnapshot=>{
        this.clients = [];
        itemSnapshot.forEach(itemSnap =>{
          var temp = itemSnap.val();
          temp.key = itemSnap.key;
          this.clients.push(temp);
          return false;
        });
    })
}

gCN(){
  this.clientRef.child(this.Client).once('value',item=>{
    this.ClientName =  item.val().Name;
  })
}

capsName(name){
      this.Name = name.toUpperCase();
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
  getCurrentTime() {
    return moment().format();
}


  }
