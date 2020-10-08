import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacepostPage } from './facepost.page';

const routes: Routes = [
  {
    path: '',
    component: FacepostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacepostPageRoutingModule {}
