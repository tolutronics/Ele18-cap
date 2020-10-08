import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPopPageRoutingModule } from './login-pop-routing.module';

import { LoginPopPage } from './login-pop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPopPageRoutingModule
  ],
  declarations: [LoginPopPage]
})
export class LoginPopPageModule {}
