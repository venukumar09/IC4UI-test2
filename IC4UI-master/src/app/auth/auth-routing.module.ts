import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { ErrorComponent } from '../shared/components/error/error.component';


const routes: Routes = [
  {
    path:'signin',
    component : SigninComponent
  },
  // {
  //   path:'**',
  //   redirectTo : '/404'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
