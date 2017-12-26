import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { OzanorderApi } from './../../shared/sdk/services/custom/Ozanorder';
import { Ozanorder } from './../../shared/sdk/models/Ozanorder';
import { OzanorderproductApi } from './../../shared/sdk/services/custom/Ozanorderproduct';
// import { Ozanorderproduct } from './../../shared/sdk/models/Ozanorderproduct';
import { OzanlibraryApi } from './../../shared/sdk/services/custom/Ozanlibrary';

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
  public viewimage: any;
  public viewdata: any;
  public id: any;
  public data: any;
  public ozanordermodel: any = Ozanorder
  // public ozanorderproductmodel: any = Ozanorderproduct

  constructor(
    public ozanorderproductapi: OzanorderproductApi,
    public ozanorderapi: OzanorderApi,
    public ozanliblaryapi : OzanlibraryApi,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LookingDetailOrderPage');
    this.data = this.navParams.get('event')
    // console.log(this.data,'result')
    this.id = this.data.id;
    // console.log(this.id);

    const data = {
      id: this.id
    }

    this.ozanorderapi.lookingdetailorder(data).subscribe((result) => {
      console.log(result, 'hasil looking');
      this.ozanordermodel = result;
    })

    this.ozanorderproductapi.lookingdetailorderproduct(data).subscribe((result) => {
      console.log(result, 'ini looking dua')
      this.viewdata = result;
    })

    this.ozanliblaryapi.lookingimageorder(data).subscribe((result)=>{
      console.log(result, 'ini looking tiga')
      this.viewimage = result;
    })

    

  }

}
