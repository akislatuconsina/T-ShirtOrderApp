import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OzanUserCredentialApi } from '../../shared/sdk/services/custom/OzanUserCredential';
import { OzanUserCredential } from '../../shared/sdk/models/OzanUserCredential';
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
  public realm: any;
  public alamat: any;
  public phoneNumber: any;
  public jobPosition: any;
  public corporateName: any;
  public corporatePhoneNumber: any;
  public emailCorporate: any;

  public UserCredential: any = OzanUserCredential

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public OzanUserCredentialapi: OzanUserCredentialApi,

  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  public regisration() {
    
    const data = {
      realm: this.UserCredential.realm,
      alamat: this.UserCredential.alamat,
      phoneNumber: this.UserCredential.phoneNumber,
      jobPosition: this.UserCredential.jobPosition,
      email: this.UserCredential.email,
      corporateName: this.UserCredential.corporateName,
      corporatePhoneNumber: this.UserCredential.corporatePhoneNumber,
      emailCorporate: this.UserCredential.emailCorporate,
      username: this.UserCredential.username,
      password: this.UserCredential.password,
      emailVerified: true,
      roleUser: 'user'
    }
    this.OzanUserCredentialapi.create(data).subscribe(result => {
      console.log(result, 'data');
    
      this.UserCredential.realm = '';
      this.UserCredential.alamat = '';
      this.UserCredential.phoneNumber = '';
      this.UserCredential.jobPosition = '';
      this.UserCredential.email = '';
      this.UserCredential.corporateName = '';
      this.UserCredential.corporatePhoneNumber = ''; 
      this.UserCredential.emailCorporate = '';
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
