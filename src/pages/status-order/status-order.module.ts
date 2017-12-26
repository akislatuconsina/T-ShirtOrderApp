import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatusOrderPage } from './status-order';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    StatusOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(StatusOrderPage),
    TranslateModule
  ],
})
export class StatusOrderPageModule {}
