import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'comment',
    loadChildren: () => import('./comment/comment.module').then( m => m.CommentPageModule)
  },
  {
    path: 'deleteuser',
    loadChildren: () => import('./deleteuser/deleteuser.module').then( m => m.DeleteuserPageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'facepost',
    loadChildren: () => import('./facepost/facepost.module').then( m => m.FacepostPageModule)
  },
  {
    path: 'fcomment',
    loadChildren: () => import('./fcomment/fcomment.module').then( m => m.FcommentPageModule)
  },
  {
    path: 'homeview',
    loadChildren: () => import('./homeview/homeview.module').then( m => m.HomeviewPageModule)
  },
  {
    path: 'login-pop',
    loadChildren: () => import('./login-pop/login-pop.module').then( m => m.LoginPopPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'viewprofile',
    loadChildren: () => import('./viewprofile/viewprofile.module').then( m => m.ViewprofilePageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
