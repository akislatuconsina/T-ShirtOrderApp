import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
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
    }, (error) => {
        console.log(error.statusCode, 'Gagal Login');
        
        //Tolong Tampilkan alert username / password salah

    });

  }
}
