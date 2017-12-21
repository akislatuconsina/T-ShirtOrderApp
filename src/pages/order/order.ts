import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { OzanorderApi } from './../../shared/sdk/services/custom/Ozanorder';
import { Ozanorder } from './../../shared/sdk/models/Ozanorder';
import { OzanlibraryApi } from './../../shared/sdk/services/custom/Ozanlibrary';
import { Ozanlibrary } from './../../shared/sdk/models/Ozanlibrary';
import { OzanorderproductApi } from './../../shared/sdk/services/custom/Ozanorderproduct';
import { UUID } from 'angular2-uuid';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  @ViewChild('fileInput') fileInput;
  public companyname: any;
  public buyername: any;

  public roleuser: any;
  public userid: any;
  public realm: any;
  public datatemp: any;
  public idorder: any;

  public photoData: any;
  public photoName = [];
  public productname = [{}];
  public input = [{}];
  public ozanmodel: any = Ozanorder;
  public ozanlibrary: any = Ozanlibrary;

  public filesToUpload: Array<File>;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public ozanorderapi: OzanorderApi,
    public ozanlibraryapi: OzanlibraryApi,
    public ozanorderproductapi: OzanorderproductApi,
    public transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    public storage: Storage
  ) {
    this.filesToUpload = [];
    this.ozanmodel.buyername = this.realm;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad OrderPage');
    this.storage.ready().then(() => {
      this.storage.get('OzanUserData').then((result) => {
        this.userid = result.id;
        this.realm = result.realm;
        console.log(this.realm, 'Data Storage');
      });
    });
  }

  public upload() {

    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    const options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'IMG_' + UUID.UUID() + '.jpg',
      chunkedMode: false,
      mimeType: 'image/jpg'
    };
    this.makeFileRequest("http://localhost:3000/api/OzanContainers/ozan/upload", [], this.filesToUpload, options).then((result) => {
      console.log(result);
      loader.dismiss();
    }, (error) => {
      console.error(error);
      loader.dismiss();
      let alert = this.alertCtrl.create({
        subTitle: 'Ups.. Sorry. Cant Upload Foto. Check your connection or file size too large, Max 1 Mb!',
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    // const options: FileUploadOptions = {
    //   fileKey: 'file',
    //   fileName: 'IMG_' + UUID.UUID() + '.jpg',
    //   chunkedMode: false,
    //   mimeType: 'image/jpg'
    // };
    const fileName = 'IMG_' + UUID.UUID() + '.jpg';
    this.makeFileRequest("http://localhost:3000/api/OzanContainers/ozan/upload", [], this.filesToUpload, fileName).then((result) => {
      console.log(result);
      loader.dismiss();
    }, (error) => {
      console.error(error);
      loader.dismiss();
      let alert = this.alertCtrl.create({
        subTitle: 'Ups.. Sorry. Cant Upload Foto. Check your connection or file size too large, Max 1 Mb!',
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }

  public getPicture() {
    this.fileInput.nativeElement.click();
  }

  public makeFileRequest(url: string, params: Array<string>, files: Array<File>, options) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append('file', files[0], options);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }

  public addnewproduct() {
    this.input.push({})
  }

  public deleteproduct(index) {
    this.input.splice(index, 1);
  }

  public sendorder() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    const dataOrder = {
      userid: this.userid,
      buyername: this.realm,
      companyname: this.ozanmodel.companyname,
      address: this.ozanmodel.address,
      shippedto: this.ozanmodel.shippedto,
      confirmto: '-',
      productionstatus: '1',
      status: 1
    }
    this.ozanorderapi.ozanBuying(dataOrder).subscribe(result => {
      console.log('Sukses Save Buying');
      this.datatemp = result;
      this.idorder = this.datatemp.id

      for (let i = 0; i < this.input.length; i++) {
        this.input[i]['idorder'] = this.idorder;
        this.ozanorderproductapi.ozanProduct(this.input[i]).subscribe(result => {
          console.log('Sukses Save Product Detail');
          this.ozanlibraryapi.Ozanlibrary(this.photoName[i]).subscribe(result => {
            console.log('Sukses Save Foto');
            loader.dismiss();
          }, (error) => {
            console.log('Error Upload Name Photo');
            loader.dismiss();
            let alert = this.alertCtrl.create({
              subTitle: 'Ups.. Sorry. Cant Order. Check your connection! And Try Again.',
              buttons: ['Dismiss']
            });
            alert.present();
          });
        }, (error) => {
          console.log(error);
          loader.dismiss();
          let alert = this.alertCtrl.create({
            subTitle: 'Ups.. Sorry. Cant Order. Check your connection! And Try Again.',
            buttons: ['Dismiss']
          });
          alert.present();
        });
      }

    }, (error) => {
      console.log(error);
      loader.dismiss();
      let alert = this.alertCtrl.create({
        subTitle: 'Ups.. Sorry. Cant Order. Check your connection! And Try Again.',
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }
}


