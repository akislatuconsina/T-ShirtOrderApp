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

  public finish: boolean = true;
  public onprogress: boolean = true;
  public pending: boolean = true;
  public confirmpayment: boolean = true;
  public cancelpayment: boolean = true;
  public editdata: boolean = true;
  public detailorder: boolean = true;
  public waitingStatus: boolean = true;
  public payStatus: boolean = true;
  public paid: boolean = true;
  public paidconfirm: boolean = true;

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

        for (let i = 0; i < this.viewdata.length; i++) {

          if (this.roleuser == 'user') {
            this.detailorder = false;
            this.editdata = true;

            this.viewdata[i]['detailorder'] = this.detailorder;
            this.viewdata[i]['editdata'] = this.editdata;
          } else if (this.roleuser == 'admin') {
            this.detailorder = true;
            this.editdata = false;
            this.confirmpayment = true;
            this.cancelpayment = false;
            this.paidconfirm = true;

            this.viewdata[i]['detailorder'] = this.detailorder;
            this.viewdata[i]['editdata'] = this.editdata;
            this.viewdata[i]['confirmpayment'] = this.confirmpayment;
            this.viewdata[i]['cancelpayment'] = this.cancelpayment;
          }

          if (this.viewdata[i].status == 1 && this.viewdata[i].productionstatus == 1) {

            this.waitingStatus = false;
            this.pending = false;
            this.confirmpayment = false;
            this.cancelpayment = false;

            //False
            this.viewdata[i]['waitingStatus'] = this.waitingStatus;
            this.viewdata[i]['pending'] = this.pending;
            this.viewdata[i]['confirmpayment'] = this.confirmpayment;
            this.viewdata[i]['cancelpayment'] = this.cancelpayment;

            this.payStatus = true;
            this.paidconfirm = true;
            this.onprogress = true;
            this.finish = true;
            //True
            this.viewdata[i]['payStatus'] = this.payStatus;
            this.viewdata[i]['paidconfirm'] = this.paidconfirm;
            this.viewdata[i]['onprogress'] = this.onprogress;
            this.viewdata[i]['finish'] = this.finish;

          } else if (this.viewdata[i].status == 2 && this.viewdata[i].productionstatus == 2) {
            this.payStatus = false;
            this.onprogress = false;
            this.paidconfirm = false;
            //False
            this.viewdata[i]['payStatus'] = this.payStatus;
            this.viewdata[i]['onprogress'] = this.onprogress;
            this.viewdata[i]['paidconfirm'] = this.paidconfirm;

            this.waitingStatus = true;
            
            this.pending = true;
            this.finish = true;
            this.confirmpayment = true;
            this.cancelpayment = true;
            //True
            this.viewdata[i]['waitingStatus'] = this.waitingStatus;
            this.viewdata[i]['pending'] = this.pending;
            this.viewdata[i]['finish'] = this.finish;
            this.viewdata[i]['confirmpayment'] = this.confirmpayment;
            this.viewdata[i]['cancelpayment'] = this.cancelpayment;
            console.log(this.cancelpayment)
          } else if (this.viewdata[i].status == 2 && this.viewdata[i].productionstatus == 3) {
            this.payStatus = false;
            this.onprogress = false;
            this.paidconfirm = false;

            //False
            this.viewdata[i]['payStatus'] = this.payStatus;
            this.viewdata[i]['finish'] = this.finish;
            this.viewdata[i]['paidconfirm'] = this.paidconfirm;

            this.waitingStatus = true;
            this.paid = true;
            this.pending = true;
            this.onprogress = true;
            this.confirmpayment = true;
            this.cancelpayment = true;
            //True
            this.viewdata[i]['waitingStatus'] = this.waitingStatus;
            this.viewdata[i]['paid'] = this.paid;
            this.viewdata[i]['pending'] = this.pending;
            this.viewdata[i]['onprogress'] = this.onprogress;
            this.viewdata[i]['confirmpayment'] = this.confirmpayment;
            this.viewdata[i]['cancelpayment'] = this.cancelpayment;
          } else if (this.viewdata[i].status == 3 && this.viewdata[i].productionstatus == 2) {
            this.paid = false;
            this.onprogress = false;

            //False
            this.viewdata[i]['paid'] = this.paid;
            this.viewdata[i]['onprogress'] = this.onprogress;

            this.pending = true;
            this.finish = true;
            this.waitingStatus = true;
            this.payStatus = true;
            this.confirmpayment = true;
            this.paidconfirm = true;
            this.cancelpayment = true;

            //True
            this.viewdata[i]['waitingStatus'] = this.waitingStatus;
            this.viewdata[i]['payStatus'] = this.payStatus;
            this.viewdata[i]['pending'] = this.pending;
            this.viewdata[i]['finish'] = this.finish;
            this.viewdata[i]['confirmpayment'] = this.confirmpayment;
            this.viewdata[i]['paidconfirm'] = this.paidconfirm;
            this.viewdata[i]['cancelpayment'] = this.cancelpayment;
          } else if (this.viewdata[i].status == 3 && this.viewdata[i].productionstatus == 3) {
            this.paid = false;
            this.finish = false;

            //False
            this.viewdata[i]['paid'] = this.paid;
            this.viewdata[i]['onprogress'] = this.onprogress;

            this.waitingStatus = true;
            this.payStatus = true;
            this.cancelpayment = true;
            this.pending = true;
            this.onprogress = true;
            this.confirmpayment = true;
            this.paidconfirm = true;
            this.cancelpayment = true;

            //True
            this.viewdata[i]['waitingStatus'] = this.waitingStatus;
            this.viewdata[i]['payStatus'] = this.payStatus;
            this.viewdata[i]['cancelpayment'] = this.cancelpayment;
            this.viewdata[i]['pending'] = this.pending;
            this.viewdata[i]['onprogress'] = this.onprogress;
            this.viewdata[i]['confirmpayment'] = this.confirmpayment;
            this.viewdata[i]['paidconfirm'] = this.paidconfirm;
            this.viewdata[i]['cancelpayment'] = this.cancelpayment;

          }
        }
        console.log(this.viewdata, 'DATA');
        loader.dismiss();
      }, (error) => { loader.dismiss() })
    });
  }

  Editdata(event) {
    let modal = this.modalctrl.create('OrderdetailEditPage', { event });
    modal.present();
  }



  Confirmpayment(event) {
    console.log('Succes Get Event')
    let modal = this.modalctrl.create('ConfirmpagePage', { event });
    modal.onDidDismiss(data => {
      console.log(data, 'Success Get Data Photo');
      this.dataphoto = data;
      this.imgname = this.dataphoto.imagedata;
      console.log(this.imgname, 'Succes Get Name');
      //this.xp hoto.push(this.imgname)
    });

    modal.present();
  }


  Detailorder(event) {
    let modal = this.modalctrl.create('LookingDetailOrderPage', { event, img: this.xphoto });
    modal.present();
  }

}
