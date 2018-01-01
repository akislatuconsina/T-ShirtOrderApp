import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaidpaymentphotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paidpaymentphoto',
  templateUrl: 'paidpaymentphoto.html',
})
export class PaidpaymentphotoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaidpaymentphotoPage');
  //   this.dataimage = this.navParams.get('photo');
  //   console.log(this.dataimage,'data photo');
  //    this.photo = LoopBackConfig.getPath() + '/api/OzanContainers/ozan/download/' + this.dataimage;
  }
}
