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
  public inputData = [{}];
  public ozanmodel: any = Ozanorder;
  public ozanlibrary: any = Ozanlibrary;
  public filesToUpload: Array<File>;


  public amount: any;
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
    console.log(this.input, 'Input')
    if (this.input.length == 1) {
      this.inputform = true;
    }
  }

  ionViewDidLoad(index) {
    this.input.splice(index, 1);
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
    };
    reader.readAsDataURL(event.target.files[0]);

    this.filesToUpload = <Array<File>>event.target.files;

    this.fileName = 'IMG_' + UUID.UUID() + '.jpg';
    console.log(this.photoName, 'dataphoto')
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

  public addnewproduct() {
    let modal = this.modalCtrl.create('AddproductPage');
    modal.onDidDismiss(data => {
      console.log(data);
      /**
       * ----------------------------------------Unit Price----------------------------------------
       */
      if (data.describe == 'Seragam Pria (Jaring)') {
        if (data.size == 'S') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'M') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'L') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXXL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXXX') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        }
      } else if (data.describe == 'Seragam Pria') {
        if (data.size == 'S') {
          this.amount = '15000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'M') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'L') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXXL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXXX') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        }
      } else if (data.describe == 'Celana Pria') {
        if (data.size == 'S') {
          this.amount = '13000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'M') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'L') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXXL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXXX') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        }
      } else if (data.describe == 'Seragam Wanita') {
        if (data.size == 'S') {
          this.amount = '13000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'M') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'L') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXXL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXXX') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        }
      } else if (data.describe == 'Celana Seragam Wanita') {
        if (data.size == 'S') {
          this.amount = '13000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'M') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'L') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXXL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXXX') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        }
      } else if (data.describe == 'Baju Driver') {
        if (data.size == 'S') {
          this.amount = '13000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'M') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'L') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXXL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXXX') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        }
      } else if (data.describe == 'Celana Driver') {
        if (data.size == 'S') {
          this.amount = '13000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'M') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'L') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXXL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXXX') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        }
      } else if (data.describe == 'Topi Kerja Hijau') {
        if (data.size == 'S') {
          this.amount = '13000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'M') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'L') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXXL') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        } if (data.size == 'XXXX') {
          this.amount = '10000';
          const totalamount = data.quantyorder * this.amount;
          data['amount'] = this.amount;
          data['totalamount'] = totalamount;
          this.input.push(data);
        }
      }
      /**------------------------------------------------------------------------------------------ */



      this.inputform = false;
      this.datatemporary = data;
      this.xphoto = this.datatemporary.imagedata;
      console.log(this.xphoto, 'Operan Photo');
      this.photoName.push(this.xphoto);
    });
    modal.present();
  }

  public deleteproduct(index) {
    this.input.splice(index, 1);
  }

  public sendorder() {
    if (this.input.length !== 0) {
      /**----------------------------------------INSERT DATA ORDER---------------------------------------------------------------------- */
      const dataOrder = {
        userid: this.userid,
        buyername: this.realm,
        companyname: this.corporate,
        address: this.ozanmodel.address,
        shippedto: this.ozanmodel.shippedto,
        confirmto: '-',
        invoiceto: '-',
        vendorname: '-',
        trackingno: '-',
        productionstatus: 1,
        status: 1
      }
      console.log(dataOrder, 'DataOrder');
      this.ozanorderapi.ozanBuying(dataOrder).subscribe(result => {
        console.log('Sukses ozanBuying');
        this.datatemp = result;
        this.idorder = this.datatemp.id
        this.navCtrl.setRoot('OrderdetailPage');

        /**----------------------------------------INSERT DATA PRODUCT---------------------------------------------------------------------- */
        for (let i = 0; i < this.input.length; i++) {
          this.input[i]['idorder'] = this.idorder;
          console.log(this.input, 'DATAAAAAAAA');
          this.ozanorderproductapi.ozanProduct(this.input[i]).subscribe(result => {
            console.log('Sukses ozanProduct');

            /**----------------------------------------INSERT DATA FILE---------------------------------------------------------------------- */
            const datafile = {
              idorder: this.idorder,
              namefile: this.photoName[i],
              flag: 'foto-product'
              // typeimg: 'product'
            }

            this.ozanlibraryapi.Ozanlibrary(datafile).subscribe(result => {
              console.log('Sukses Ozanlibrary');
            }, (error) => {
              console.log('Error Upload Name Photo');
              let alert = this.alertCtrl.create({
                subTitle: this.translate.instant('Ups.. Sorry. Cant Order. Check your connection! And Try Again.'),
                buttons: ['Dismiss']
              });
              alert.present();
            });

            /**-------------------------------------------------------------------------------------------------------------- */
          }, (error) => {
            console.log(error);
            let alert = this.alertCtrl.create({
              subTitle: this.translate.instant('Ups.. Sorry. Cant Order. Check your connection! And Try Again.'),
              buttons: ['Dismiss']
            });
            alert.present();
          });
          /**-------------------------------------------------------------------------------------------------------------- */
        }
        let alert = this.alertCtrl.create({
          subTitle: this.translate.instant('Sukses Order.'),
          buttons: ['Dismiss']
        });
        alert.present();
      }, (error) => {
        console.log(error);
        let alert = this.alertCtrl.create({
          subTitle: this.translate.instant('Ups.. Sorry. Cant Order. Check your connection! And Try Again.'),
          buttons: ['Dismiss']
        });
        alert.present();
      });
      /**-------------------------------------------------------------------------------------------------------------- */
    } else {
      let alert = this.alertCtrl.create({
        subTitle: this.translate.instant('Ups.. Sorry. Cant Order. Cant empty the product detail.'),
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  public lookingphoto(inputs) {
    console.log(inputs.imagedata, 'EVENT BRE');
    const photox = inputs.imagedata;
    let modal = this.modalCtrl.create('LookingimageproductPage', { photo: photox });
    modal.present();
  }



}


