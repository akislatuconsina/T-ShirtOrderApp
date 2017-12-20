import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { OzanorderApi } from './../../shared/sdk/services/custom/Ozanorder';
import { Ozanorder } from './../../shared/sdk/models/Ozanorder';
import { OzanlibraryApi  } from './../../shared/sdk/services/custom/Ozanlibrary';
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
  public roleuser: any;
  public userid: any;
  public datatemp: any;
  public idorder: any;
  @ViewChild('fileInput') fileInput;

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
    public alertctrl: AlertController,
    public ozanorderapi: OzanorderApi,
    public ozanlibraryapi: OzanlibraryApi,
    public ozanorderproductapi: OzanorderproductApi,
    public transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    public storage : Storage
  ) {
    this.filesToUpload = [];
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad OrderPage');
    this.storage.ready().then(() => {
      this.storage.get('OzanUserCredential').then((result)=>{
        this.userid = result.userId;
        console.log(this.userid, 'user id load page');      
      });
    });
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

  // public sendorder() {
  //   let confirm = this.alertctrl.create({
  //     title: 'Are You Sure?',
  //     buttons: [
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           console.log(this.input, 'INPUT');
  //           console.log(this.userid, 'ORDER USER ID')
  //           const dataOrder = {
  //             userid : this.userid,
  //             buyername: this.ozanmodel.buyername,
  //             companyname: this.ozanmodel.companyname,
  //             address: this.ozanmodel.address,
  //             shippedto: this.ozanmodel.shippedto,
  //             confirmto: '-',
  //             productionstatus: '-',
  //             status: 1
  //           }
  //           console.log(dataOrder, '123123')
  //           this.ozanorderapi.ozanBuying(dataOrder).subscribe(result => {
  //             console.log(result, 'hasil buyer n dll')
  //             this.datatemp = result;
  //             this.idorder = this.datatemp.id

  //             for (let i = 0; i < this.input.length; i++) {
  //               this.input[i]['idorder']= this.idorder;
               
  //               console.log(this.input[i], 'hasil input');

  //               this.ozanorderproductapi.ozanProduct(this.input[i]).subscribe(result => {

  //                 this.ozanlibraryapi.Ozanlibrary(this.photoName[i]).subscribe(result => {
  //                   console.log(result, ' hasil photo');
                    
  //                 }, (error) => {
  //                   console.log('Error Upload Name Photo');
  //                 });
  //               }, (error) => {
  //                 console.log(error);
  //               })
  //             }

  //           }, (error) => {
  //             console.log(error)
  //           });
  //         }
  //       },
  //       {
  //         text: 'No',
  //         handler: () => {
  //           let confirm = this.alertctrl.create({
  //             title: 'Your Have Canceled',
  //             buttons: [{
  //               text: 'Dismiss',

  //             }]
  //           })
  //           confirm.present();
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }


  public sendorder(){
    let alert = this.alertctrl.create({
      title: 'Are Your Sure',
      buttons: [
        {
          text: 'Yes',
          handler: () => { 
            console.log(this.input, 'INPUT');
            console.log(this.userid, 'ORDER USER ID')
            const dataOrder = {
              userid : this.userid,
              buyername: this.ozanmodel.buyername,
              companyname: this.ozanmodel.companyname,
              address: this.ozanmodel.address,
              shippedto: this.ozanmodel.shippedto,
              confirmto: '-',
              productionstatus: '1',
              status: 1
            }
            console.log(dataOrder, '123123')
            this.ozanorderapi.ozanBuying(dataOrder).subscribe(result => {
              console.log(result, 'hasil buyer n dll')
              this.datatemp = result;
              this.idorder = this.datatemp.id

              for (let i = 0; i < this.input.length; i++) {
                this.input[i]['idorder']= this.idorder;
               
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

            let alert = this.alertctrl.create({
              title: 'Check Detail Order',
              buttons: [
                {
                  text: 'Dismiss',
                  role: 'cancel',
                  handler: () => {
                    this.navCtrl.setRoot('HomePage')
                    console.log('Cancel clicked');
                  }
                },
              ]
            });
            alert.present();         
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
  }







//}


