import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberListPage } from './member-list';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MemberListPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberListPage),
    TranslateModule
  ],
})
export class MemberListPageModule {}
