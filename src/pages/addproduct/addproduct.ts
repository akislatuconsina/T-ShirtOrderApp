import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { UUID } from 'angular2-uuid';
import { FileUploadOptions } from '@ionic-native/file-transfer';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the AddproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
})

export class AddproductPage {
  photoName: any;
  fileName: string;
  photo: any;
  @ViewChild('fileInput') fileInput;
  public sizeorder: any;
  public qtyorder: any;
  public descriptionorder: any;
  public filesToUpload: Array<File>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public loadingCtrl : LoadingController,
  ) {
    this.filesToUpload = [];
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AddproductPage');

  }

  public dismiss() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration : 5000
    });
    loader.present();
    let data = { describe: this.descriptionorder, size: this.sizeorder, quantyorder: this.qtyorder, imagedata : this.fileName, image : this.photo };
    this.viewCtrl.dismiss(data);
    loader.dismiss();
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
      // console.log(this.photo);
     // this.dataphoto.push(this.photo);
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
    console.log(this.fileName,'NAMA FILE PHOTO')
    //this.photo = this.fileName;
//this.photoName.push(this.fileName)
    //this.photo = this.fileName;
    this.makeFileRequest("http://localhost:3000/api/OzanContainers/ozan/upload", [], this.filesToUpload, this.fileName).then((result) => {
      console.log(result, 'file request ');

      // this.chip = false;
      // this.nochip = true;
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

}
