import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPopPage } from './login-pop.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPopPageRoutingModule {}
