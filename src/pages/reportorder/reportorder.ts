import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ReportorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reportorder',
  templateUrl: 'reportorder.html',
})
export class ReportorderPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public translate : TranslateService,
    public storage : Storage,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportorderPage');
        
  }


  view(){
    this.navCtrl.push('DetailreportPage');
  }

}
