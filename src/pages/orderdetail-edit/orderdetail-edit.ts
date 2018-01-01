import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  public ozanorderproduct : any = Ozanorderproduct

  // public dataEdit = [{}];

  constructor(
    public ozanorderproductapi: OzanorderproductApi,
    public ozanorderapi: OzanorderApi,
    public ozanliblaryapi: OzanlibraryApi,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public translate : TranslateService,
  ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad OrderdetailEditPage');
    this.data = this.navParams.get('event')
    this.id = this.data.id;


    const data = {
      id: this.id
    }

    this.ozanorderapi.changedetailorder(data).subscribe((result) => {
      console.log(result, 'hasil looking');
      this.ozanordermodel = result;
    })
    
    this.ozanorderproductapi.changedetailproduct(data).subscribe((result)=>{
      console.log(result, 'hasil looking 2')
      this.viewdata = result;
    })


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
    })

    const dataproduct = {
      descriptionorder : this.viewdata.descriptionorder,
      sizeorder : this.viewdata.sizeorder,
      qtyorder : this.viewdata.qtyorder,
      unitprice : this.viewdata.unitprice,
    }
    console.log(this.viewdata, 'DATA EDIT')

    this.ozanorderproductapi.changedetailproduct(dataproduct).subscribe((result)=>{
      console.log(result, 'hasil replace')
    })

  }

}
