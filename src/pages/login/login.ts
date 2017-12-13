import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
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
