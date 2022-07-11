import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth/auth.gaurd';
import { AdminComponent } from './admin/components/admin/admin.component';
import { CatalogComponent } from './catalog/catalog.component';
import { HomePageComponent } from '../shared/home-page/home-page.component';


const routes: Routes = [
  {
    path : 'home',
    component:HomePageComponent
  },
  {
    path : 'catalog',
    loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule) 
  },
  {
    path : 'curate',
    loadChildren: () => import('./curate/curate.module').then(m => m.CurateModule) 
  },
  {
    path : 'consume',
    loadChildren: () => import('./consume/consume.module').then(m => m.ConsumeModule) 
  },
  {
    path : 'context',
    loadChildren: () => import('./context/context.module').then(m => m.ContextModule) 
  },
  {
    path : 'operations',
    loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule) 
  },
  {
    path : 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
  },
  {
    path : 'myaccount',
    loadChildren: () => import('./myaccount/myaccount.module').then(m => m.MyaccountModule) 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
