import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPage } from './order';
import { Camera } from '@ionic-native/camera';
@NgModule({
  declarations: [
    OrderPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderPage)
  ],
  providers :[
    Camera
  ]
})
export class OrderPageModule {}
