import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { OzanorderApi } from './../../../shared/sdk/services/custom/Ozanorder';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare var cordova: any;

/**
 * Generated class for the DetailreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailreport',
  templateUrl: 'detailreport.html',
})
export class DetailreportPage {
  id: any;
  public optData = {};
  public viewdataDP: any;
  public loading: any;

  public type: any;

  constructor(
    public modalctrl: ModalController,
    public navCtrl: NavController,
    public translate : TranslateService,
    public storage : Storage,
    public navParams: NavParams,
    public ozanorderapi: OzanorderApi,
    public loadingCtrl: LoadingController, 
    public file: File,
    public toastCtrl: ToastController,
    public fileOpener: FileOpener,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailreportPage');
    
    // const dp = {
    //   statusDP : 2
    // }
    
    // this.ozanorderapi.getreportDP(dp).subscribe((result) =>{
    //   console.log(result, 'data DP');

    // this.viewdataDP = result; 
    // console.log(this.viewdataDP)
    // });  
  }
  

  loader(): void {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  buildTableBody(data, columns) {
    var body = [];

    body.push(columns);

    data.forEach(function (row) {
      var dataRow = [];

      columns.forEach(function (column) {
        dataRow.push(row[column].toString());
      })

      body.push(dataRow);
    });

    return body;
  }

  table(data, columns) {
    return {
      table: {
        headerRows: 1,
        body: this.buildTableBody(data, columns)
      }
    };
  }

  public lookingdetailDP(event){
    console.log(event)
    let modal = this.modalctrl.create('LookingDetailOrderPage', {event});
    modal.present();
  }

  public testPdf(data, columns) {
    this.loader();
    console.log(this.optData['reptype']);
    if (this.optData['reptype'] == 2) {
      this.type = 'Laporan Order Uang Muka';
      console.log(this.type);
    } else if (this.optData['reptype'] == 3) {
      this.type = 'Laporan Order Pelunasan ';
      console.log(this.type);

    }
    this.ozanorderapi.find({
      where: {
        and: [
          { status: 'DownPayment' },
          { id: this.id }
        ]
      }
    }).subscribe((result) => {

      let reportDatas;
      reportDatas = result;

      var tempArr = [];
      for (var i = 0; i < reportDatas.length; i++) {

        tempArr.push(
          {
            id: reportDatas[i].id,
            buyername: reportDatas[i].buyername,
            address: reportDatas[i].address,
            orderdate: reportDatas[i].orderdate,
            deliverydate: reportDatas[i].deliverydate,
            status: reportDatas[i].status,
            productionstatus: reportDatas[i].productionstatus,
            shippedto: reportDatas[i].shippedto,            
            totalamount: reportDatas[i].totalamount,
            payment: reportDatas[i].payment,
          }
        );

        var pdfFile = {
          content: [
            { text: 'REPORT ORDER', alignment: 'center', style: 'header', fontSize: 35, bold: true },
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 3 }] },
            { text: '\n' },
            { text: 'Record date : 07 - 11 - 2017', alignment: 'right', italics: true },
            { text: '\n\n\n' },
            { text: 'Berikut data laporan keuangan ' + this.type, alignment: 'center', style: 'subheader' },
            {
              style: 'tableExample',
              table: {
                body: [
                  [
                    this.table(tempArr, ['id',  'buyername',  'address', 
                    'orderdate','deliverydate', 'status', 'productionstatus','shippedto',
                    'totalamount','payment'])
                  ],
                ]
              },
              layout: 'noBorders'
            },
            { text: '\n' },
            { text: '\n' },
            { text: '\n' },
            { text: '\n' },
            { text: '\n' },
            { text: '\n' },
            { text: '\n' },
            { text: '\n' },
            { text: '\n' },
            { text: '\n' },
            { text: '\n' },
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 10]
            },
            subheader: {
              fontSize: 16,
              bold: true,
              margin: [0, 10, 0, 5]
            },
            tableExample: {
              margin: [0, 5, 0, 15]
            },
            tableHeader: {
              bold: true,
              fontSize: 13,
              color: 'black'
            }
          },
          defaultStyle: {
            // alignment: 'justify'
          }
        }
      }

      let makePdf = null;
      makePdf = pdfFile;
      pdfMake.createPdf(makePdf).getBuffer((buffer) => {
        var utf8 = new Uint8Array(buffer); // Convert to UTF-8...
        let binaryArray = utf8.buffer; // Convert to Binary...

        let fileName = "ReportBudget.pdf";
        let saveDir = cordova.file.externalCacheDirectory;

        this.file.createFile(saveDir, fileName, true).then((fileEntry) => {
          fileEntry.createWriter((fileWriter) => {
            fileWriter.onwriteend = () => {
              let toast = this.toastCtrl.create({
                message: 'Sukses Generate to PDF.',
                duration: 2000,
                position: 'bottom'
              });
              toast.onDidDismiss(() => {
                console.log(saveDir + fileName);
                this.fileOpener.open(
                  saveDir + fileName, 'application/pdf');
              });
              toast.present();
            };
            fileWriter.onerror = (e) => {
              console.log('Error, Gagal Generate to PDF: ' + e.toString());
            };
            fileWriter.write(binaryArray);
          });
        });
      });
        this.loading.dismiss();
    })
  }

}
