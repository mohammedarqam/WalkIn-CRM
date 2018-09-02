import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-add-client',
  templateUrl: 'add-client.html',
})
export class AddClientPage {

  Name : string;
  Category : string;
  Address : string;
  ContactPersonName1 : string;
  ContactPersonPhone1 : string;
  ContactPersonName2: string="";
  ContactPersonPhone2: string="";
  AMP: string;
  PP: string;


  constructor(
  public navCtrl: NavController, 
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController,
  public navParams: NavParams) {
  }




  checkData(){
    if(this.Name){
      if(this.Category){
        if(this.Address){
          if(this.ContactPersonName1){
            if(this.ContactPersonPhone1){
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
              this.presentToast("Provide a Phone Number for atleast 1 Contact Person")
            }
          }else{
            this.presentToast("Atleast 1 Contact Person Details");
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



  save(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    firebase.database().ref("Clients").child(firebase.auth().currentUser.uid).push({
      Name : this.Name,
      Category : this.Category,
      Address : this.Address,
      AverageMenuPricing : this.AMP,
      ProposedPercentage : this.PP,
      ContactPersonName1 : this.ContactPersonName1,
      ContactPersonPhone1 : this.ContactPersonPhone1,
      ContactPersonName2 : this.ContactPersonName2,
      ContactPersonPhone2 : this.ContactPersonPhone2,
      Time : moment().format()

    }).then(()=>{
      this.navCtrl.pop();
      loading.dismiss();
    })
  }







  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom',
      showCloseButton: false,
    });
    toast.present();
  }

}
