import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LookingDetailOrderPage } from './looking-detail-order';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LookingDetailOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(LookingDetailOrderPage),
    TranslateModule
  ],
})
export class LookingDetailOrderPageModule {}
