import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate : TranslateService,
    public storage : Storage,
    public menu: MenuController
  ) {
    this.menu.enable(true);
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
