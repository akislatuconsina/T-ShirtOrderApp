import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { OzanorderApi } from './../../shared/sdk/services/custom/Ozanorder';
import { Ozanorder } from './../../shared/sdk/models/Ozanorder';
import { OzanlibraryApi } from './../../shared/sdk/services/custom/Ozanlibrary';
import { Ozanlibrary } from './../../shared/sdk/models/Ozanlibrary';
import { OzanorderproductApi } from './../../shared/sdk/services/custom/Ozanorderproduct';
import { UUID } from 'angular2-uuid';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';


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
  public xphoto: any;
  public datatemporary: any;
  public dataphoto: any;
  public photo: any;
  @ViewChild('fileInput') fileInput;
  public inputform: boolean;
  public fileName: any;
  public companyname: any;
  public buyername: any;
  public corporate: any;
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
    public translate: TranslateService,
    public ozanorderapi: OzanorderApi,
    public ozanlibraryapi: OzanlibraryApi,
    public ozanorderproductapi: OzanorderproductApi,
    public transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public storage: Storage
  ) {
    this.filesToUpload = [];
    this.ozanmodel.buyername = this.realm;
    this.ozanmodel.companyname = this.corporate;
    // this.input[0]['unitprice'] = 0; 
    console.log(this.input, 'Input')
    if (this.input.length == 1) {
      this.inputform = true;
    }
  }

  ionViewDidLoad(index) {
    this.input.splice(index, 1);
    //console.log('ionViewDidLoad OrderPage');
    this.storage.ready().then(() => {
      this.storage.get('OzanUserData').then((result) => {
        this.userid = result.id;
        this.realm = result.realm;
        this.corporate = result.corporatename;
        console.log(this.corporate, 'Data Storage');
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
        subTitle: this.translate.instant('Ups.. Sorry. Cant Upload Foto. Check your connection or file size too large, Max 1 Mb!'),
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }

  fileChangeEvent(event) {
    console.log(event);
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      this.photo = (readerEvent.target as any).result;
      // console.log(this.photo);
    };
     reader.readAsDataURL(event.target.files[0]);

    this.filesToUpload = <Array<File>>event.target.files;
    // let loader = this.loadingCtrl.create({
    //   content: "Please wait..."
    // });
    // loader.present();

    this.fileName = 'IMG_' + UUID.UUID() + '.jpg';
    //this.photoName.push(this.fileName)
    console.log(this.photoName,'dataphoto')
    this.makeFileRequest("http://localhost:3000/api/OzanContainers/ozan/upload", [], this.filesToUpload, this.fileName).then((result) => {
      console.log(result);
      loader.dismiss();
    }, (error) => {
      console.error(error);
      loader.dismiss();
      let alert = this.alertCtrl.create({
        subTitle: this.translate.instant('Ups.. Sorry. Cant Upload Foto. Check your connection or file size too large, Max 1 Mb!'),
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

  // public addnewproduct() {
  // const priceUnit = this.input[0]['unitprice'] = 0; 
  // this.input.push({});
  // console.log(this.input.length - 1, 'Kurang 1');
  // console.log(this.input.length, 'Length');
  // this.input[2]['unitprice'] = 0;
  // for (let i = 0; i < this.input.length; i++) {
  //   this.input[i]['unitprice'] = 0;
  // }
  // }


  public addnewproduct() {
    let modal = this.modalCtrl.create('AddproductPage');
    modal.onDidDismiss(data => {
      console.log(data);
      this.input.push(data);
      console.log(this.input, 'DATA OPERAN')
      this.inputform = false;
      this.datatemporary = data;
      this.xphoto = this.datatemporary.imagedata;
      console.log(this.xphoto,'Operan Photo')
      this.photoName.push(this.xphoto);
    });
    modal.present();
  }

  // public onInputTime(event) {
  //   console.log(event, 'VAL');
  //   // console.log(this.input[i]['unitprice'])
  //   for (let i = 0; i < this.input.length; i++) {
  //     console.log(this.input[i]['unitprice']);
  //     this.input[i]['unitprice'] = event * this.input[i]['unitprice'];
  //     // this.input[i]['unitprice'] = event * this.input[i]['unitprice'];
  //   }
  // }

  // public onChange(value): any {
  //   console.log(value, 'VALUE SELECT');
  //   console.log(this.input.length, 'SELECT');
  //   for (let i = 0; i < this.input.length; i++) {
  //     // console.log(this.input[i]['descriptionorder']);

  //     if(this.input[i]['descriptionorder'] == 'Seragam Pria (Jaring)') {
  //       console.log(this.input[i]['sizeorder'] , 'SIZE');
  //       if(this.input[i]['sizeorder'] == 'S') {
  //         this.input[i]['unitprice'] = 10000;
  //       } else if (this.input[i]['sizeorder'] == 'M'){
  //         this.input[i]['unitprice'] = 15000;
  //       } else if (this.input[i]['sizeorder'] == 'L'){
  //         this.input[i]['unitprice'] = 20000;
  //       } else if (this.input[i]['sizeorder'] == 'XL'){
  //         this.input[i]['unitprice'] = 25000;
  //       } else if (this.input[i]['sizeorder'] == 'XXL'){
  //         this.input[i]['unitprice'] = 30000;
  //       } else if (this.input[i]['sizeorder'] == 'XXXL'){
  //         this.input[i]['unitprice'] = 35000;
  //       }
  //     }
  //   }
  // }

  public deleteproduct(index) {
    this.input.splice(index, 1);
  }

  public sendorder() {
    console.log(this.input, "INPUT");
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    const dataOrder = {
      userid: this.userid,
      buyername: this.realm,
      companyname: this.corporate,
      address: this.ozanmodel.address,
      shippedto: this.ozanmodel.shippedto,
      confirmto: '-',
      productionstatus: 1,
      status: 1
    }
    this.ozanorderapi.ozanBuying(dataOrder).subscribe(result => {
      console.log(result, 'Sukses Save Buying');
      this.datatemp = result;
      this.idorder = this.datatemp.id

      for (let i = 0; i < this.input.length; i++) {
        this.input[i]['idorder'] = this.idorder;
        this.ozanorderproductapi.ozanProduct(this.input[i]).subscribe(result => {
          console.log('Sukses Save Product Detail');

          const datafile = {
            idorder: this.idorder,
            namefile: this.photoName[i]
          }
          this.ozanlibraryapi.Ozanlibrary(datafile).subscribe(result => {
            console.log('Sukses Save Foto');
            loader.dismiss();
          }, (error) => {
            console.log('Error Upload Name Photo');
            loader.dismiss();
            let alert = this.alertCtrl.create({
              subTitle: this.translate.instant('Ups.. Sorry. Cant Order. Check your connection! And Try Again.'),
              buttons: ['Dismiss']
            });
            alert.present();
          });
        }, (error) => {
          console.log(error);
          loader.dismiss();
          let alert = this.alertCtrl.create({
            subTitle: this.translate.instant('Ups.. Sorry. Cant Order. Check your connection! And Try Again.'),
            buttons: ['Dismiss']
          });
          alert.present();
        });
      }

    }, (error) => {
      console.log(error);
      loader.dismiss();
      let alert = this.alertCtrl.create({
        subTitle: this.translate.instant('Ups.. Sorry. Cant Order. Check your connection! And Try Again.'),
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }

  public lookingphoto(inputs) {
    console.log(inputs.imagedata, 'EVENT BRE');
    const photox = inputs.imagedata;
    let modal = this.modalCtrl.create('LookingimageproductPage', { photo: photox  });
    modal.present();
  }



}


