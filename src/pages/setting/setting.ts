import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  public language = 'id';

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public translateservice : TranslateService,
     public storage : Storage
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
    console.log('ionViewDidLoad SettingPage');

  }

  
  public onChange(value): any {
    console.log(value);
    this.language = value;
    this.translateservice.setDefaultLang(value);
    this.translateservice.use(value);
    this.storage.set('language', value);
  }

  
}
