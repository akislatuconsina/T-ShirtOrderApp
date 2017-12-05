import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OzanUserCredentialApi } from '../../shared/sdk/services/custom/OzanUserCredential';

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
  public username: any;
  public password: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public OzanCredential: OzanUserCredentialApi
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }


  public login() {

    const data = {
      username: this.username,
      password: this.password
    };
    this.OzanCredential.LoginUser(data).subscribe((result) => {
      console.log(result, 'RESULT BRO');
    })

  }
}
