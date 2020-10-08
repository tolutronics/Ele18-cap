import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteuserPage } from './deleteuser.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteuserPageRoutingModule {}
