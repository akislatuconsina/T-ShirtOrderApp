import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public username: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController
  ) {
<<<<<<< Updated upstream
    this.menu.enable(true);
    // this.username = this.navParams.get('name'); //fungsi ini digunakan untuk menarik data variable 
=======

     this.username = this.navParams.get('name'); //fungsi ini digunakan untuk menarik data variable
    
>>>>>>> Stashed changes
  }
  login() {
    this.navCtrl.push('LoginPage');
  }

  gotoOrderPage() {
    this.navCtrl.push('OrderPage')
  }

  gotoDetailOrder() {
    this.navCtrl.push('OrderdetailPage')
  }

  gotoTestPage() {
    this.navCtrl.push('TestpagePage')
  }

}
