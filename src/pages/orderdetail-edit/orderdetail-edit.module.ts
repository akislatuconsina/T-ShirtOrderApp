import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderdetailEditPage } from './orderdetail-edit';

@NgModule({
  declarations: [
    OrderdetailEditPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderdetailEditPage),
  ],
})
export class OrderdetailEditPageModule {}
