import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { OzanOrderApi } from './../../shared/sdk/services/custom/OzanOrder';
import { OzanOrder } from './../../shared/sdk/models/OzanOrder';
import { OzanLibraryApi } from './../../shared/sdk/services/custom/OzanLibrary';
import { OzanLibrary } from './../../shared/sdk/models/OzanLibrary';
import { OzanOrderProductApi } from './../../shared/sdk/services/custom/OzanOrderProduct';
import { UUID } from 'angular2-uuid';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer';




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
  public datatemp: any;
  public idorder: any;
  @ViewChild('fileInput') fileInput;

  public photoData: any;
  public photoName = [];
  public productname = [{}];
  public input = [{}];
  public ozanmodel: any = OzanOrder;
  public ozanlibrary: any = OzanLibrary;

  public filesToUpload: Array<File>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertctrl: AlertController,
    public ozanorderapi: OzanOrderApi,
    public ozanlibraryapi: OzanLibraryApi,
    public ozanorderproductapi: OzanOrderProductApi,
    public transfer: FileTransfer,
    public loadingCtrl: LoadingController
  ) {
    this.filesToUpload = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }


  public upload() {
    this.makeFileRequest("http://localhost:3000/api/OzanContainers/ozan/upload", [], this.filesToUpload).then((result) => {
      console.log(result);
    }, (error) => {
      console.error(error);
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload, 'OKOKOKOK')
    const options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'IMG_' + UUID.UUID() + '.jpg',
      chunkedMode: false,
      mimeType: 'image/jpg'
    };
    this.photoName.push(options)
    this.upload();
  }


  public getPicture() {
    this.fileInput.nativeElement.click();
  }

  public makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", url, true);
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
    let confirm = this.alertctrl.create({
      title: 'Are You Sure?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log(this.input, 'INPUT');

            const dataOrder = {
              buyerName: this.ozanmodel.buyerName,
              companyName: this.ozanmodel.companyName,
              address: this.ozanmodel.address,
              shippedTo: this.ozanmodel.shippedTo,
            }

            this.ozanorderapi.ozanBuying(dataOrder).subscribe(result => {
              console.log(result, 'hasil buyer n dll')
              this.datatemp = result;
              this.idorder = this.datatemp.id

              for (let i = 0; i < this.input.length; i++) {
                this.input[i]['idorder'] = this.idorder;
                console.log(this.input[i], 'hasil input');

                this.ozanorderproductapi.ozanProduct(this.input[i]).subscribe(result => {

                  this.ozanlibraryapi.Ozanlibrary(this.photoName[i]).subscribe(result => {
                    console.log(result, ' hasil photo');
                  }, (error) => {
                    console.log('Error Upload Name Photo');
                  });
                }, (error) => {
                  console.log(error);
                })
              }

            }, (error) => {
              console.log(error)
            });
          }
        },
        {
          text: 'No',
          handler: () => {
            let confirm = this.alertctrl.create({
              title: 'Your Have Canceled',
              buttons: [{
                text: 'Dismiss',

              }]
            })
            confirm.present();
          }
        }
      ]
    });
    confirm.present();
  }








}


