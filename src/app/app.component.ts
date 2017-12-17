import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { OzanUserCredentialApi } from '../shared/sdk/services/custom/OzanUserCredential';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
  public accessTok: any;
  public storageData: any;
  rootPage: any;

  pages: Array<{ title: string, component: any, icons: any }>;
  public photo: any = 'assets/imgs/ojan.JPG';

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public ozanusercredentialApi: OzanUserCredentialApi
  ) {

    this.storage.get('OzanUserCredential').then((OzanUserCredential) => {
      if (OzanUserCredential == null || OzanUserCredential == undefined) {
        this.rootPage = 'LoginPage';
      } else {
        this.nav.setRoot('HomePage');
      }
    });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: 'HomePage', icons: 'md-home' },
      { title: 'Order Online', component: 'OrderPage', icons: 'md-cart' },
      { title: 'History Order', component: 'OrderdetailPage', icons: 'md-list-box' },
      { title: 'Report Order', component: 'ReportorderPage', icons: 'md-paper' }
    ];


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
