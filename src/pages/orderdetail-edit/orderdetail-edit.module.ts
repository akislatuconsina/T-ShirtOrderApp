import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderdetailEditPage } from './orderdetail-edit';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrderdetailEditPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderdetailEditPage),
    TranslateModule
  ],
})
export class OrderdetailEditPageModule {}
