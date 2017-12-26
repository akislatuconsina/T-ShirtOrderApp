import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { OzanusercredentialApi } from '../shared/sdk/services/custom/Ozanusercredential';
import { OzanmenulistApi } from '../shared/sdk/services/custom/Ozanmenulist';
import { Events } from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
  public realmUser: any;
  public realm: any;
  public storageEvent: any;
  public storageEventUser: any;
  public storageEventNama: any;
  public storageEventCorporate: any;
  public storageData: any;
  public menuCredential: any;
  public language = 'id';
  rootPage: any;

  pages: Array<{ title: string, component: any, icons: any }>;
  public photo: any = 'assets/imgs/ojan.JPG';

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public ozanusercredentialApi: OzanusercredentialApi,
    public ozanmenucredentialApi: OzanmenulistApi,
    public events: Events,
    public translate: TranslateService
  ) {

    this.storage.ready().then(() => {
      this.storage.get('OzanUserCredential').then((OzanUserCredential) => {
        if (OzanUserCredential == null || OzanUserCredential == undefined) {
          this.rootPage = 'LoginPage';
        } else {
          this.nav.setRoot('HomePage');
          this.storage.get('OzanMenuCredential').then(result => {
            this.menuCredential = result;
            this.storage.get('OzanUserData').then(result => {
              this.storageEvent = result;
              this.realmUser = this.storageEvent.realm;
              this.storageEventCorporate = this.storageEvent.corporatename;

              this.storage.get('language').then((language) => {
                if (this.language != null && this.language != undefined) {
                  this.translate.setDefaultLang(this.language);
                  this.translate.use(this.language);
                }
              });
        

            });
          });
        }
      });
    });


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

        this.realmUser = this.storageEvent.realm;
        this.storageEventUser = this.storageEvent.roleuser;
        
        this.storageEventCorporate = this.storageEvent.corporatename;
        console.log(this.storageEventCorporate, 'Hasil Perusahaan');



        const dataMenu = {
          roleuser: this.storageEventUser
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

  public setting(){
    this.nav.push('SettingPage');
  }
}
