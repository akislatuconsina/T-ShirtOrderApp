import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{ title: string, component: any, icons: any }>;
  public photo: any = 'assets/imgs/ojan.JPG';

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public storage: Storage,
    public splashScreen: SplashScreen) {

    this.storage.get('ozanStorage').then((ozanStorage) => {
      if (ozanStorage == null || ozanStorage == undefined) {
        this.rootPage = 'LoginPage';
      } else {
        this.nav.setRoot('HomePage');
      }
    });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage', icons: 'home' },
      { title: 'Order Online', component: 'MenuPage', icons: 'md-cart' },
      { title: 'Order Detail', component: 'HomePage', icons: 'md-cart' },
      { title: 'Laporan Order', component: 'HomePage', icons: 'md-code-download' },
      { title: 'Pengaturan Akun', component: 'HomePage', icons: 'md-color-filter' },
      { title: 'Logout', component: 'HomePage', icons: 'home' }
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
    this.nav.setRoot('LoginPage');
  }
}
