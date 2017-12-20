import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { OzanUserCredentialApi } from '../shared/sdk/services/custom/OzanUserCredential';
import { OzanMenuCredentialApi } from '../shared/sdk/services/custom/OzanMenuCredential';
import { Events } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  realm: any;

  @ViewChild(Nav) nav: Nav;
  public storageEvent: any;
  public storageEventUser: any;
  public storageEventNama: any;
  public storageEventCorporate: any;
  public storageData: any;
  public menuCredential: any;
  rootPage: any;

  pages: Array<{ title: string, component: any, icons: any }>;
  public photo: any = 'assets/imgs/ojan.JPG';

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public ozanusercredentialApi: OzanUserCredentialApi,
    public ozanmenucredentialApi: OzanMenuCredentialApi,
    public events: Events
  ) {

    this.storage.ready().then(() => {
      this.storage.get('OzanUserCredential').then((OzanUserCredential) => {
        if (OzanUserCredential == null || OzanUserCredential == undefined) {
          this.rootPage = 'LoginPage';
        } else {
          this.nav.setRoot('HomePage');
          this.storage.get('OzanMenuCredential').then(result => {
            this.menuCredential = result;
          })
        }
      });
    })


    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Dashboard', component: 'HomePage', icons: 'md-home' },
    //   { title: 'Order Online', component: 'OrderPage', icons: 'md-cart' },
    //   { title: 'History Order', component: 'OrderdetailPage', icons: 'md-list-box' },
    //   { title: 'Report Order', component: 'ReportorderPage', icons: 'md-paper' }
    // ];
    this.events.subscribe('ozan:menu', () => {
      this.loadMenu();
    });


  }



  public loadMenu() {
    console.log('MENU');
    this.storage.ready().then(() => {
      this.storage.get('OzanUserData').then((result) => {
        this.storageEvent = result;

        this.storageEventUser = this.storageEvent..realm;
        console.log(this.storageEventUser, 'STORAGE EVENT');
        
        this.storageEventCorporate = this.storageEvent.corporateName;
        console.log(this.storageEventCorporate, 'Hasil Perusahaan');



        const dataMenu = {
          roleUser: this.storageEventUser
        };

        this.ozanmenucredentialApi.ozanFindMenu(dataMenu).subscribe(result => {
          console.log(result, 'MENU NYA');
          this.menuCredential = result;
          this.storage.set('OzanMenuCredential', this.menuCredential);
        })

      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout() {
    console.log('Logout');
    this.storage.get('OzanUserCredential').then((result) => {
      this.storageData = result;
      this.realm = result;

      this.ozanusercredentialApi.ozanLogout(this.storageData).subscribe(result => {
        console.log(result);
        this.storage.clear();
        this.nav.setRoot('LoginPage');
      }, (error) => {
        console.log(error, 'error')
      })
    })

  }
}
