import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-client-edit',
  templateUrl: 'client-edit.html',
})
export class ClientEditPage {

  Name : string;
  Category : string;
  Address : string;
  ContactPersonName1 : string;
  ContactPersonPhone1 : string;
  ContactPersonName2: string="";
  ContactPersonPhone2: string="";
  AMP: string;
  PP: string;
  Time : string;


  key = this.navParams.get("key")

  userId = firebase.auth().currentUser.uid;

  detalisref = firebase.database().ref("Clients").child(this.userId).child(this.key);
  details :Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController,
  public afDatabase: AngularFireDatabase,
  public navParams: NavParams
  ) {
    console.log(this.key);
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

      this.Name  = itemSnapshot.val().Name;
      this.Category = itemSnapshot.val().Category;
      this.Address = itemSnapshot.val().Address;
      this.ContactPersonName1 = itemSnapshot.val().ContactPersonName1;
      this.ContactPersonPhone1 = itemSnapshot.val().ContactPersonPhone1;
      this.ContactPersonName2= itemSnapshot.val().ContactPersonName2;
      this.ContactPersonPhone2= itemSnapshot.val().ContactPersonPhone2;
      this.AMP= itemSnapshot.val().AverageMenuPricing;
      this.PP= itemSnapshot.val().ProposedPercentage;
      this.Time = itemSnapshot.val().Time;

    }).then(()=>{
      console.log(this.details);
      loading.dismiss();
    })
  }

  checkData(){
    if(this.Name){
      if(this.Category){
        if(this.Address){
              if(this.AMP){
                if(this.PP){
                  this.save();
                }else{
                  this.presentToast("What is the Proposed Percentage")
                }
              }else{
                this.presentToast("Provide an Average Menu Pricing")
              }
        }else{
          this.presentToast("Provide an Adderess");
        }
      }else{
        this.presentToast("Select Category");
      }
    }else{
      this.presentToast("Name is Empty");
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',
      showCloseButton: false,
    });
    toast.present();
  }


  save(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    firebase.database().ref("Clients").child(firebase.auth().currentUser.uid).child(this.key).set({
      Name : this.Name,
      Category : this.Category,
      Address : this.Address,
      AverageMenuPricing : this.AMP,
      ProposedPercentage : this.PP,
      ContactPersonName1 : this.ContactPersonName1,
      ContactPersonPhone1 : this.ContactPersonPhone1,
      ContactPersonName2 : this.ContactPersonName2,
      ContactPersonPhone2 : this.ContactPersonPhone2,
      Time : this.Time,
      LastUpdatedTime : moment().format()

    }).then(()=>{
      this.navCtrl.pop();
      loading.dismiss();
    })
  }


}
