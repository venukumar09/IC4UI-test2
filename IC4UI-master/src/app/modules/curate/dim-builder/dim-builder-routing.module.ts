import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DimBuilderComponent } from './dim-builder.component';
import { ViewDimJobsComponent } from './view-dim-jobs/view-dim-jobs.component';


const routes: Routes = [
  {
    path: 'view/jobs',
    component: ViewDimJobsComponent
  },
  {
    path: 'create/job',
    component: DimBuilderComponent
  },
  {
    path: 'edit/job',
    component: DimBuilderComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DimBuilderRoutingModule { }
