
import { Component } from '@angular/core';
import { OzanorderApi } from './../../shared/sdk/services/custom/Ozanorder';
import { Ozanorder } from './../../shared/sdk/models/Ozanorder';
import { OzanorderproductApi } from './../../shared/sdk/services/custom/Ozanorderproduct';
import { OzanlibraryApi } from './../../shared/sdk/services/custom/Ozanlibrary';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LookingDetailOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-looking-detail-order',
  templateUrl: 'looking-detail-order.html',
})
export class LookingDetailOrderPage {
  xphoto: any;
  public photo: any;
  public viewimage: any;
  public viewdata: any;
  public id: any;
  public data: any;
  public ozanordermodel: any = Ozanorder;
  public totalsAmount: any;

  constructor(
    public ozanorderproductapi: OzanorderproductApi,
    public ozanorderapi: OzanorderApi,
    public ozanliblaryapi: OzanlibraryApi,
    public navCtrl: NavController,
    public translate: TranslateService,
    public storage: Storage,
    public navParams: NavParams,
    public modalctrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    this.data = this.navParams.get('data');
    this.id = this.data.id;
    console.log(this.id, 'ID DATA');

    const data = {
      id: this.id
    }

    this.ozanorderapi.lookingdetailorder(data).subscribe((result) => {
      this.ozanordermodel = result;
      console.log(this.ozanordermodel, 'Data Order');
      
      this.ozanorderproductapi.lookingdetailorderproduct(data).subscribe((result) => {
        this.viewdata = result;
        let data = 0;
        for (let i = 0; i < this.viewdata.length; i++) {
          data +=this.viewdata[i].totalamount
        }
        this.totalsAmount = data;
        console.log(this.viewdata, 'Data Product');
      })

    })

    // console.log('ionViewDidLoad LookingDetailOrderPage');
    // this.data = this.navParams.get('event')
    // this.photo = this.navParams.get('img');
    // console.log(this.data,'result')
    // this.id = this.data.id;
    // console.log(this.id);

    // this.photo = this.navParams.get('imgname');
    // console.log(this.photo, 'Succes get Photo')

    // this.ozanliblaryapi.lookingimageorder(data).subscribe((result) => {
    //   console.log(result, 'ini looking tiga')
    //   this.viewimage = result;
    // })
  }


  public seeingdownpayment() {
    let modal = this.modalctrl.create('DownpaymentphotoPage', { data: this.data });
    modal.present();
  }

  public seeingpaidpayment() {
    let modal = this.modalctrl.create('PaidpaymentphotoPage');
    modal.present();
  }


}
