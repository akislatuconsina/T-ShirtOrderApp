import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ManageOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-order',
  templateUrl: 'manage-order.html',
})
export class ManageOrderPage {
  public language: any;

  constructor(
    public navCtrl: NavController, 
    public translateservice : TranslateService,
    public storage : Storage,
    public navParams: NavParams
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageOrderPage');
  }

}
