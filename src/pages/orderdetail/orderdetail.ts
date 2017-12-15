import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { OzanOrderApi } from './../../shared/sdk/services/custom/OzanOrder';
import { OzanOrder } from './../../shared/sdk/models/OzanOrder';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';



/**
 * Generated class for the OrderdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderdetail',
  templateUrl: 'orderdetail.html',
})
export class OrderdetailPage {
  public status: any
  public buyer: any;
  public viewdata: any;
  public ozanorder: any = OzanOrder;
  public userId: any;


  public waitingStatus: boolean;
  public payStatus: boolean;
  public paid: boolean;
  constructor(
    public ozanorderapi: OzanOrderApi,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalctrl: ModalController,
    public storage: Storage,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.storage.get('OzanUserCredential').then((result) => {
      this.userId = result;
      console.log(this.userId, 'this result userId');
      this.ozanorderapi.ozangetBuying(this.userId).subscribe((result) => {
        console.log(result, 'Data')
        this.viewdata = result;

        for (let i = 0; i < this.viewdata.length; i++) {
          console.log('TES')
          if (this.viewdata[i].params.status == 1) {
            this.waitingStatus = false;
            this.payStatus = true;
            this.paid = true;
          } if (this.viewdata[i].params.status == 2) {
            this.waitingStatus = true;
            this.payStatus = false;
            this.paid = true;
          } if (this.viewdata[i].params.status == 3) {
            this.waitingStatus = true;
            this.payStatus = true;
            this.paid = false;
          }
        }
        loader.dismiss();

      })
    })

    //console.log('ionViewDidLoad OrderdetailPage');
  }

  Editdata() {
    let modal = this.modalctrl.create('OrderdetailEditPage');
    modal.present();
  }

  Detailorder() {
    let modal = this.modalctrl.create('LookingDetailOrderPage');
    modal.present();
  }

}
