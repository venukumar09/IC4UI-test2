import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { LobComponent } from './components/lob/lob.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { ScreenOperationsComponent } from './components/screen-operations/screen-operations.component';


const routes: Routes = [
  {
    path : '',
    component : AdminComponent
  },
  {
    path : 'users',
    component : UserComponent
  },
  {
    path : 'lob',
    component : LobComponent
  },
  {
    path : 'organizations',
    component : OrganizationComponent
  },
  {
    path : 'applications',
    component : ApplicationsComponent
  },
  {
    path : 'screenoperations',
    loadChildren: () => import('./components/screen-operations/screen-operation.module').then(m => m.ScreenOperationModule) 
  }
  // {
  //   path : 'screenoperations',
  //   component : ScreenOperationsComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
