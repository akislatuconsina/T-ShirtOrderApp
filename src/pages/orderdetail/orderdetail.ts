import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';



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
  public variabel: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalctrl : ModalController
  ) {
  }

  ionViewDidLoad() {
  console.log('ionViewDidLoad OrderdetailPage');

  }

 Editdata(){
  let modal = this.modalctrl.create('OrderdetailEditPage');
  modal.present();
 }
 
 Detailorder(){
  let modal = this.modalctrl.create('LookingDetailOrderPage');
  modal.present();
 }

}
