import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderdetailPage } from './orderdetail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrderdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderdetailPage),
    TranslateModule
  ],
})
export class OrderdetailPageModule {}
