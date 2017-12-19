import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { OzanorderApi } from './../../shared/sdk/services/custom/Ozanorder';
import { Ozanorder } from './../../shared/sdk/models/Ozanorder';
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
  public datatemp: any;
  public deletedata: boolean;
  public editdata: boolean;
  public detailorder: boolean;
  public roleuser: any;
  public status: any
  public buyer: any;
  public viewdata: any;
  public ozanorder: any = Ozanorder;
  public userId: any;


  public waitingStatus: boolean;
  public payStatus: boolean;
  public paid: boolean;
  constructor(
    public ozanorderapi: OzanorderApi,
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
      this.storage.get('OzanUserData').then((result) => {
      this.datatemp = result;
      console.log(this.datatemp,'data temp')
        this.roleuser = this.datatemp.roleUser;
        console.log(this.roleuser, 'ini result user data')
      })

      const dataget = {
        userid: this.userId
      }
      this.ozanorderapi.ozangetBuying(dataget).subscribe((result) => {
        console.log(result, 'Data')
        this.viewdata = result;
        console.log(this.viewdata, 'view')

        for (let i = 0; i < this.viewdata.length; i++) {
          console.log('TES')
          if (this.viewdata[i].status == 1) {
            this.waitingStatus = false;
            this.payStatus = true;
            this.paid = true;
          } if (this.viewdata[i].status == 2) {
            this.waitingStatus = true;
            this.payStatus = false;
            this.paid = true;
          } if (this.viewdata[i].status == 3) {
            this.waitingStatus = true;
            this.payStatus = true;
            this.paid = false;
          }
        }
        loader.dismiss();

        if (this.roleuser == 'user') {
          this.detailorder = false;
          this.editdata = true;
          this.deletedata = true;
        }
        if (this.roleuser == 'admin') {
          this.detailorder = false;
          this.editdata = false;
          this.deletedata = false;
        }
      }, (error) => { loader.dismiss() })
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
