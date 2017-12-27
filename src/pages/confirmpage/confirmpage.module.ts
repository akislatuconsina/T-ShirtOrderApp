import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmpagePage } from './confirmpage';

@NgModule({
  declarations: [
    ConfirmpagePage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmpagePage),
    TranslateModule
  ],
})
export class ConfirmpagePageModule {}
