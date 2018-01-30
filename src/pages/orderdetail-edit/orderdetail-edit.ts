import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';
import { OzanorderApi } from './../../shared/sdk/services/custom/Ozanorder';
import { Ozanorder } from './../../shared/sdk/models/Ozanorder';
import { OzanorderproductApi } from './../../shared/sdk/services/custom/Ozanorderproduct';
import { Ozanorderproduct } from './../../shared/sdk/models/Ozanorderproduct';
import { OzanlibraryApi } from './../../shared/sdk/services/custom/Ozanlibrary';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the OrderdetailEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderdetail-edit',
  templateUrl: 'orderdetail-edit.html',
})
export class OrderdetailEditPage {
  public viewdata: any;
  public id: any;
  public data: any;
  public ozanordermodel: any = Ozanorder
  public ozanorderproduct: any = Ozanorderproduct

  public library: any;
  public totalsAmount: any;
  public dp: boolean;
  public full: boolean;

  public fullPath: any;

  constructor(
    public ozanorderproductapi: OzanorderproductApi,
    public ozanorderapi: OzanorderApi,
    public ozanliblaryapi: OzanlibraryApi,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public translate: TranslateService,
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    this.data = this.navParams.get('event')
    this.id = this.data.id;

    const dataId = {
      id: this.id
    }

    this.ozanorderapi.lookingdetailorder(dataId).subscribe((result) => {
      this.ozanordermodel = result;
      console.log(this.ozanordermodel, 'Data Order');

      this.ozanorderproductapi.lookingdetailorderproduct(dataId).subscribe((result) => {
        this.viewdata = result;
        let data = 0;
        for (let i = 0; i < this.viewdata.length; i++) {
          data += this.viewdata[i].totalamount
        }
        this.totalsAmount = data;

        this.ozanliblaryapi.lookingimageorder(dataId).subscribe((result) => {
          this.library = result;
          for(let i=0; i < this.library.length; i++){
            this.library[i]['url'] = 'http://localhost:3000/api/OzanContainers/ozan/download/'+this.library[i].namefile;
          }
          console.log(this.library, 'Library');
        })
      })
    })
  }

  dpPayment(event) {
    console.log(event, 'Data DP');
  }

  fullPayment(event) {
    console.log(event, 'Data Full');
  }

  update() {
    const dataorder = {
      buyername: this.ozanordermodel.buyername,
      companyname: this.ozanordermodel.companyname,
      address: this.ozanordermodel.address,
      shippedto: this.ozanordermodel.shippedto,
      confirmto: this.ozanordermodel.confirmto,
      productionstatus: this.ozanordermodel.productionstatus,
      status: this.ozanordermodel.status
    }

    this.ozanorderapi.updatedataorder(dataorder).subscribe((result) => {
      console.log(result, 'hasil change data')

      const dataproduct = {
        descriptionorder: this.viewdata.descriptionorder,
        sizeorder: this.viewdata.sizeorder,
        qtyorder: this.viewdata.qtyorder,
        unitprice: this.viewdata.unitprice,
      }
      console.log(this.viewdata, 'DATA EDIT')
  
      this.ozanorderproductapi.changedetailproduct(dataproduct).subscribe((result) => {
        console.log(result, 'hasil replace');

        this.viewCtrl.dismiss();
      })
    })
  }

}
