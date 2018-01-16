import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ViewController } from 'ionic-angular';
import { OzanlibraryApi } from './../../shared/sdk/services/custom/Ozanlibrary';
import { Ozanlibrary } from './../../shared/sdk/models/Ozanlibrary';
import { UUID } from 'angular2-uuid';
import { FileUploadOptions } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';


/**
 * Generated class for the ConfirmpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmpage',
  templateUrl: 'confirmpage.html',
})
export class ConfirmpagePage {
  @ViewChild('fileInput') fileInput;
  public namefile: any;
  public orderid: any;
  public id: any;
  public datatemp: any;
  public data: any;
  public idorder: NavParams;
  public photo = 'assets/imgs/camera.png';
  public dataphoto = [{}];
  public photoData: any;
  public photoName = [];
  public filesToUpload: Array<File>;
  public fileName: any;
  public ozanlibrary: any = Ozanlibrary;
  public chip: boolean;
  public nochip: boolean;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public storage: Storage,
    public ozanlibraryapi: OzanlibraryApi,
    public translate: TranslateService
  ) {
    this.filesToUpload = [];
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ConfirmpagePage');
    this.data = this.navParams.get('event');
    this.idorder = this.data.id
    //console.log(this.idorder, 'hasil get id')
  }

  uploadfile() {
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
      console.log(result, 'hasil request');
      //  this.photo = result;
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

    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      this.photo = (readerEvent.target as any).result;
      console.log(this.photo);
      this.dataphoto.push(this.photo);
    };
    reader.readAsDataURL(event.target.files[0]);

    this.filesToUpload = <Array<File>>event.target.files;
    // console.log (fileInput, 'isi foto')
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
    this.fileName = 'IMG_' + UUID.UUID() + '.jpg';
    //this.photo = this.fileName;
    this.photoName.push(this.fileName)
    //this.photo = this.fileName;
    this.makeFileRequest("http://localhost:3000/api/OzanContainers/ozan/upload", [], this.filesToUpload, this.fileName).then((result) => {
      console.log('file request ');

      this.chip = false;
      this.nochip = true;
      // this.photo = result;
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

  sendfilepayment() {
    let data = { imagedata: this.fileName, image: this.photo };
    this.viewCtrl.dismiss(data);

    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    const datafile = {
      idorder: this.idorder,
      namefile: this.photoName,
      typeimg : 'downpayment'
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

  }


  delete(chip: Element, index) {
    chip.remove();
    this.dataphoto.splice(index, 1);
  }


}
