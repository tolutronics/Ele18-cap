import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeviewPage } from './homeview.page';

const routes: Routes = [
  {
    path: '',
    component: HomeviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeviewPageRoutingModule {}
