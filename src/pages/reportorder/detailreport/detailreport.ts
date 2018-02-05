import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { OzanorderApi } from './../../../shared/sdk/services/custom/Ozanorder';
import { OzanorderproductApi } from './../../../shared/sdk/services/custom/Ozanorderproduct';
import { OzanlibraryApi } from './../../../shared/sdk/services/custom/Ozanlibrary';
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

  public orderData: any;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public navParams: NavParams,
    public ozanOrder: OzanorderApi,
    public ozanProduct: OzanorderproductApi,
    public ozanLibrary: OzanlibraryApi
  ) {

  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('OzanUserCredential').then(result => {
        const userId = result.userId;

        this.ozanOrder.find({
          where: {
            and: [
              { userId: userId },
              { status: 2 }
            ]
          }
        }).subscribe(orderResult => {
          this.orderData = orderResult;
        })
      })
    });
  }

}
