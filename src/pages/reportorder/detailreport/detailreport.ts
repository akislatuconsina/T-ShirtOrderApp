import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { OzanorderApi } from './../../../shared/sdk/services/custom/Ozanorder';

/**
 * Generated class for the DetailreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailreport',
  templateUrl: 'detailreport.html',
})
export class DetailreportPage {

  constructor(
    public navCtrl: NavController,
    public translate : TranslateService,
    public storage : Storage,
    public navParams: NavParams,
    public ozanOrderAPI: OzanorderApi
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailreportPage');
  }

  public download(){
   this.ozanOrderAPI.download(result => {
     console.log(result, 'kosolognye')
   })

  };
}
