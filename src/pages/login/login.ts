import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { OzanUserCredentialApi } from '../../shared/sdk/services/custom/OzanUserCredential';
import { OzanUserCredential } from '../../shared/sdk/models/OzanUserCredential';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';


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
  animations: [

    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0' }),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0)' }),
        animate('1000ms ease-in-out')
      ])
    ]),

    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({ transform: 'translate3d(0,2000px,0)', offset: 0 }),
          style({ transform: 'translate3d(0,-20px,0)', offset: 0.9 }),
          style({ transform: 'translate3d(0,0,0)', offset: 1 })
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class LoginPage {
  public idUser: any;
  public roleUser: any;
  public dataFind: any;
  public dataUser: any;

  public logoState: any = "in";
  public cloudState: any = "in";
  public loginState: any = "in";
  public formState: any = "in";

  public dataLogin: any = OzanUserCredential;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public OzanCredential: OzanUserCredentialApi,
    public alertCtrl: AlertController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public events: Events
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

  public presentModal() {
    this.navCtrl.push('RegistrationPage')
  }

  public login() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    const data = {
      username: this.dataLogin.username,
      password: this.dataLogin.password
    };
    this.OzanCredential.LoginUser(data).subscribe((result) => {
      this.dataUser = result;
      console.log(this.dataUser);

      this.idUser = this.dataUser.userId;

      const dataId = {
        id: this.idUser
      };

      this.OzanCredential.OzanFindUser(dataId).subscribe(result => {
        this.dataFind = result;
        console.log(this.dataFind, 'Result Find');

        this.storage.set('OzanUserCredential', this.dataUser);
        this.storage.set('OzanUserData', this.dataFind);
        this.navCtrl.setRoot('HomePage');

        this.events.publish('ozan:menu');

        loader.dismiss();
      }, (error) => {
        console.log('error find user')
        loader.dismiss();
      })
    }, (error) => {
      loader.dismiss();
      console.log(error.statusCode, 'Gagal Login');
      let alert = this.alertCtrl.create({
        title: 'Login Failed!',
        subTitle: 'Please check your username and password',
        buttons: ['OK']
      });
      alert.present();
    });
  }


  forgetpassword() {
    this.navCtrl.push('ForgetpasswordPage')
  }
}


