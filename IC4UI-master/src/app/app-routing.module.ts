import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/services/auth/auth.gaurd';
import { ErrorComponent } from './shared/components/error/error.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AdminComponent } from './modules/admin/components/admin/admin.component';


const routes: Routes = [
  {
    path:'',
    redirectTo: '/home',
    pathMatch : 'full'
  },
  {
    path : '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 

  },
  {
    path : '',
    canActivate : [AuthGuard],
    component : LayoutComponent,
    loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule) 

  },
  {
    path: '404',
    component : ErrorComponent
  },
  // {
  //   path: '**',
  //   redirectTo : '/404'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
