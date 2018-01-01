import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoopBackConfig } from '../../shared/sdk';

/**
 * Generated class for the LookingimageproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lookingimageproduct',
  templateUrl: 'lookingimageproduct.html',
})
export class LookingimageproductPage {
  photo: string;
  public dataimage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LookingimageproductPage');
    this.dataimage = this.navParams.get('photo');
    console.log(this.dataimage,'data photo');
     this.photo = LoopBackConfig.getPath() + '/api/OzanContainers/ozan/download/' + this.dataimage;
  }

}
