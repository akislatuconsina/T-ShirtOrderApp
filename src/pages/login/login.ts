import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OzanUserCredentialApi } from '../../shared/sdk/services/custom/OzanUserCredential';
import { OzanUserCredential } from '../../shared/sdk/models/OzanUserCredential';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public dataLogin: any = OzanUserCredential;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public OzanCredential: OzanUserCredentialApi,
    public alertCtrl: AlertController,
    public storage: Storage

  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }


  public login() {
    const data = {
      username: this.dataLogin.username,
      password: this.dataLogin.password
    };
    this.OzanCredential.LoginUser(data).subscribe((result) => {
      this.storage.set('OzanUserCredential', result)
      console.log(result, 'RESULT BRO');
      this.navCtrl.setRoot('HomePage');
    }, (error) => {
      console.log(error.statusCode, 'Gagal Login');
      let alert = this.alertCtrl.create({
        title: 'New Friend!',
        subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
        buttons: ['OK']
      });
      alert.present();
    });
  }


}
