import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public username:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    this.username = this.navParams.get('name'); //fungsi ini digunakan untuk menarik data variable
    
  }
  login() {
    this.navCtrl.push('LoginPage');
  }

}
