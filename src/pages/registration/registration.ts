import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OzanusercredentialApi } from '../../shared/sdk/services/custom/Ozanusercredential';
import { Ozanusercredential } from '../../shared/sdk/models/Ozanusercredential';
/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  // public realm: any;
  // public address: any;
  // public phonenumber: any;
  // public jobPosition: any;
  // public corporateName: any;
  // public corporatephonenumber: any;
  // public emailcorporate: any;

  public UserCredential: any = Ozanusercredential

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public OzanUserCredentialapi: OzanusercredentialApi,

  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  public regisration() {
    
    const data = {
      realm: this.UserCredential.realm,
      address: this.UserCredential.address,
      phonenumber: this.UserCredential.phonenumber,
      jobposition: this.UserCredential.jobposition,
      email: this.UserCredential.email,
      corporatename: this.UserCredential.corporatename,
      corporatephonenumber: this.UserCredential.corporatephonenumber,
      emailcorporate: this.UserCredential.emailcorporate,
      username: this.UserCredential.username,
      password: this.UserCredential.password,
      emailverified: true,
      roleuser: 'user'
    }
    this.OzanUserCredentialapi.create(data).subscribe(result => {
      console.log(result, 'data');
    
      this.UserCredential.realm = '';
      this.UserCredential.address = '';
      this.UserCredential.phonenumber = '';
      this.UserCredential.jobposition = '';
      this.UserCredential.email = '';
      this.UserCredential.corporatename = '';
      this.UserCredential.corporatephonenumber = ''; 
      this.UserCredential.emailcorporate = '';
      this.UserCredential.username = '';
      this.UserCredential.password = '';

      let alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: 'You can be login now',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.navCtrl.setRoot('LoginPage');
            }
          }
        ]
      });
      alert.present();
    }, (error) => {
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Please Input Again, Your Data Is Not Complate',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  loginpage(){
    this.navCtrl.push('LoginPage')
  }

}
