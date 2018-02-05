import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { OzanorderApi } from './../../../shared/sdk/services/custom/Ozanorder';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DetailreportfinalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailreportfinal',
  templateUrl: 'detailreportfinal.html',
})
export class DetailreportfinalPage {
  public viewdataFP: any;

  constructor(
    public modalctrl: ModalController,
    public navCtrl: NavController,
    public storage: Storage,
    public navParams: NavParams,
    public ozanorderapi: OzanorderApi
  ) {

  }

  ionViewDidLoad() {
    const fp = {
      statusFP: 3
    }

    this.ozanorderapi.getreportFP(fp).subscribe((result) => {
      console.log(result, 'data FP');
      this.viewdataFP = result;
    });
  }
}
