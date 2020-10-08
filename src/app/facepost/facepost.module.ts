import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacepostPageRoutingModule } from './facepost-routing.module';

import { FacepostPage } from './facepost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacepostPageRoutingModule
  ],
  declarations: [FacepostPage]
})
export class FacepostPageModule {}
