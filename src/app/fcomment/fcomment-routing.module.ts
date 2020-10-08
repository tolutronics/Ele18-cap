import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FcommentPage } from './fcomment.page';

const routes: Routes = [
  {
    path: '',
    component: FcommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FcommentPageRoutingModule {}
