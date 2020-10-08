import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FcommentPageRoutingModule } from './fcomment-routing.module';

import { FcommentPage } from './fcomment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FcommentPageRoutingModule
  ],
  declarations: [FcommentPage]
})
export class FcommentPageModule {}
