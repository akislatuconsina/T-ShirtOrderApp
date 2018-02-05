import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OzanlibraryApi } from './../../shared/sdk/services/custom/Ozanlibrary';
/**
 * Generated class for the DownpaymentphotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-downpaymentphoto',
  templateUrl: 'downpaymentphoto.html',
})
export class DownpaymentphotoPage {
  xx: any;
  public dpphoto: string;
  public namefile: any;
  public viewphoto : [{}];
  public id: any;
  public data: any;
  public photodp: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ozanliblaryapi: OzanlibraryApi) {
  }

  ionViewDidLoad() {
    this.data = this.navParams.get('data');
    console.log(this.data,'Success Get Data');

    this.id = this.data.id;
    console.log('Succes Get Id');

    const dataphoto = {
      idorder : this.id,
      typeimg : 'downpayment'
    }
     this.ozanliblaryapi.getphotodp(dataphoto).subscribe((result)=>{
       console.log(result);
       this.viewphoto = result;
      //  console.log(this.viewphoto,'RESULT');
      //  this.photodp = this.viewphoto[0];
      //  console.log(this.photodp);
      //  this.xx = this.photodp.namefile;
      //  console.log(this.xx)
      //  this.dpphoto = LoopBackConfig.getPath() + '/api/OzanContainers/ozan/download/' + this.xx;
     })

 
  }

}
