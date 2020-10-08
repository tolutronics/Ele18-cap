import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteuserPageRoutingModule } from './deleteuser-routing.module';

import { DeleteuserPage } from './deleteuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteuserPageRoutingModule
  ],
  declarations: [DeleteuserPage]
})
export class DeleteuserPageModule {}
