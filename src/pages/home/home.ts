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
  language: string;
  public username: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translateservice : TranslateService,
    public storage : Storage,
    public menu: MenuController
  ) {
    console.log(this.translateservice.getDefaultLang());
    this.translateservice.get('HELLO').subscribe(
      value => {
        // value is our translateserviced string
        console.log(value);
      });
    console.log(this.translateservice.getDefaultLang(), 'Defaultnya');
    this.storage.get('language').then(result => {
      if (result == null) {
        console.log(123);
        this.storage.set('language', 'id');
        this.translateservice.setDefaultLang('id');
      } else {
        this.language = this.translateservice.getDefaultLang();
      }
    });
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
