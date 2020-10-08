import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeviewPageRoutingModule } from './homeview-routing.module';

import { HomeviewPage } from './homeview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeviewPageRoutingModule
  ],
  declarations: [HomeviewPage]
})
export class HomeviewPageModule {}
