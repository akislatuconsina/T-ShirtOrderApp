import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { OzanorderApi } from './../../shared/sdk/services/custom/Ozanorder';
import { Ozanorder } from './../../shared/sdk/models/Ozanorder';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { TranslateService } from '@ngx-translate/core';

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
  datatemporary: any;
  public xphoto: any;
  public dataphoto: any;
  public imgname: any;
  public prodstatus: any;
  public datatemp: any;
  public roleuser: any;
  public status: any
  public buyer: any;
  public viewdata: any;
  public ozanorder: any = Ozanorder;
  public userId: any;
  public finish: boolean;
  public onprogress: boolean;
  public pending: boolean;
  public confirmpayment: boolean;
  public cancelpayment: boolean;
  public editdata: boolean;
  public detailorder: boolean;
  public waitingStatus: boolean;
  public payStatus: boolean;
  public paid: boolean;
  public paidconfirm: boolean;

  constructor(
    public ozanorderapi: OzanorderApi,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalctrl: ModalController,
    public storage: Storage,
    public translate: TranslateService,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.storage.get('OzanUserCredential').then((result) => {
      this.datatemporary = result;
      console.log(result,'succes reload result')
      this.userId = this.datatemporary.userId;
      console.log(this.userId,'Succes Reload User Id');
      this.storage.get('OzanUserData').then((result) => {
        this.datatemp = result;
        this.roleuser = this.datatemp.roleuser;
        console.log('Success Reload Role')
      })

      const dataget = {
        userid: 3,
        roleuser : 'user'
      }
      
      this.ozanorderapi.ozangetBuying(dataget).subscribe((result) => {
        this.viewdata = result;
        console.log('Success Reload Data');

        for (let i = 0; i < this.viewdata.length; i++) {
          if (this.roleuser == 'user') {

            this.detailorder = false;
            this.editdata = true;

            if (this.viewdata[i].status == 1 && this.viewdata[i].productionstatus == 1) {

              this.waitingStatus = false;
              this.payStatus = true;
              this.paid = true;

              this.pending = false;
              this.onprogress = true;
              this.finish = true;

              this.confirmpayment = false;
              this.paidconfirm = true;
              this.cancelpayment = false;

            } else if (this.viewdata[i].status == 2 && this.viewdata[i].productionstatus == 2) {

              this.waitingStatus = true;
              this.payStatus = false;
              this.paid = true;

              this.pending = true;
              this.onprogress = false;
              this.finish = true;

              this.confirmpayment = true;
              this.paidconfirm = false;
              this.cancelpayment = true;

            } else if (this.viewdata[i].status == 2 && this.viewdata[i].productionstatus == 3) {

              this.waitingStatus = true;
              this.payStatus = false;
              this.paid = true;

              this.pending = true;
              this.onprogress = true;
              this.finish = false;

              this.confirmpayment = true;
              this.paidconfirm = false;
              this.cancelpayment = true;

            } else if (this.viewdata[i].status == 3 && this.viewdata[i].productionstatus == 2) {
              this.waitingStatus = true;
              this.payStatus = true;
              this.paid = false;

              this.pending = true;
              this.onprogress = false;
              this.finish = true;

              this.confirmpayment = true;
              this.paidconfirm = true;
              this.cancelpayment = true;

            } else if (this.viewdata[i].status == 3 && this.viewdata[i].productionstatus == 3) {

              this.waitingStatus = true;
              this.payStatus = true;
              this.paid = false;
              this.cancelpayment = true;

              this.pending = true;
              this.onprogress = true;
              this.finish = false;

              this.confirmpayment = true;
              this.paidconfirm = true;
              this.cancelpayment = true;

            }

          } else if (this.roleuser = 'admin') {

            this.detailorder = true;
            this.editdata = false;
            this.confirmpayment = true;
            this.cancelpayment = false;
            this.paidconfirm = true;

            if (this.viewdata[i].status == 1 && this.viewdata[i].productionstatus == 1) {

              this.waitingStatus = false;
              this.payStatus = true;
              this.paid = true;

              this.pending = false;
              this.onprogress = true;
              this.finish = true;

            } else if (this.viewdata[i].status == 2 && this.viewdata[i].productionstatus == 2) {

              this.waitingStatus = true;
              this.payStatus = false;
              this.paid = true;

              this.pending = true;
              this.onprogress = false;
              this.finish = true;

            } else if (this.viewdata[i].status == 2 && this.viewdata[i].productionstatus == 3) {

              this.waitingStatus = true;
              this.payStatus = false;
              this.paid = true;

              this.pending = true;
              this.onprogress = true;
              this.finish = false;

            } else if (this.viewdata[i].status == 3 && this.viewdata[i].productionstatus == 3) {

              this.waitingStatus = true;
              this.payStatus = true;
              this.paid = false;

              this.pending = true;
              this.onprogress = true;
              this.finish = false;

            } else if (this.viewdata[i].status == 3 && this.viewdata[i].productionstatus == 2) {

              this.waitingStatus = true;
              this.payStatus = true;
              this.paid = false;

              this.pending = true;
              this.onprogress = false;
              this.finish = true;
            }
          }
        }
        loader.dismiss();
      }, (error) => { loader.dismiss() })
    })
    //console.log('ionViewDidLoad OrderdetailPage');
  }

  Editdata(event) {
    let modal = this.modalctrl.create('OrderdetailEditPage', { event });
    modal.present();
  }



  Confirmpayment(event) {
    console.log('Result Event')
    let modal = this.modalctrl.create('ConfirmpagePage', { event });
    modal.onDidDismiss(data => {
      console.log(data, 'Success Get Data Photo');
      this.dataphoto = data;
      this.imgname = this.dataphoto.imagedata;
      console.log(this.imgname, 'Succes Get Name');
    });
    this.xphoto.push(this.imgname)
    modal.present();
  }
  

  Detailorder(event) {
    let modal = this.modalctrl.create('LookingDetailOrderPage', { event, img : this.xphoto });
    modal.present();
  }

}
