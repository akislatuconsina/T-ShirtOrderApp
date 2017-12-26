import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailreportPage } from './detailreport';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DetailreportPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailreportPage),
    TranslateModule
  ],
})
export class DetailreportPageModule {}
