import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ForgetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgetpassword',
  templateUrl: 'forgetpassword.html',
})
export class ForgetpasswordPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpasswordPage');
    // this.navCtrl.push('HomePage')
  }

  send(){
    {
      let alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: 'check your email for your password',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.navCtrl.setRoot('HomePage');
            }
          }
        ]
      });
      alert.present();
    }
  }

  cancel(){
    this.navCtrl.push('RegistrationPage')
  }

}
