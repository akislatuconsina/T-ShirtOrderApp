import { Component } from '@angular/core';
import { OzanorderApi } from './../../shared/sdk/services/custom/Ozanorder';
import { Ozanorder } from './../../shared/sdk/models/Ozanorder';
import { OzanorderproductApi } from './../../shared/sdk/services/custom/Ozanorderproduct';
import { OzanlibraryApi } from './../../shared/sdk/services/custom/Ozanlibrary';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  public viewimage: any;
  public viewdata: any;
  public id: any;
  public data: any;
  public ozanordermodel: any = Ozanorder;

  constructor(
    public ozanorderproductapi: OzanorderproductApi,
    public ozanorderapi: OzanorderApi,
    public ozanliblaryapi : OzanlibraryApi,
    public navCtrl: NavController,
    public navParams: NavParams,
    public navCtrl: NavController,
    public translate : TranslateService,
    public storage : Storage,
    public navParams: NavParams
  ) {
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
