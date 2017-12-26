import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageOrderPage } from './manage-order';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ManageOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageOrderPage),
    TranslateModule
  ],
})
export class ManageOrderPageModule {}
