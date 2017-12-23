import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

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
  public language: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public translateservice : TranslateService,
    public storage : Storage,
    public alertCtrl: AlertController
  ) {
    console.log(this.translateservice.getDefaultLang());
    this.translateservice.get('HELLO').subscribe(
      value => {
        // value is our translateserviced string
        console.log(value);
      });
    console.log(this.translateservice.getDefaultLang(), 'Defaultnya');
    this.storage.get('language').then(result => {
      if (result == null) {
        console.log(123);
        this.storage.set('language', 'id');
        this.translateservice.setDefaultLang('id');
      } else {
        this.language = this.translateservice.getDefaultLang();
      }
    });
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
