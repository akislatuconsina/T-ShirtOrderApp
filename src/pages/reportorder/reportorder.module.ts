import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportorderPage } from './reportorder';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ReportorderPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportorderPage),
    TranslateModule
  ],
})
export class ReportorderPageModule {}
