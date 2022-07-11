import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurateHomeComponent } from './components/curate-home/curate-home.component';
import { CurateMainComponent } from './components/curate-main/curate-main.component';
import { CurateComponent } from './curate.component';


const routes: Routes = [

  {
    path: '',
    component: CurateComponent,
  },
  {
    path : 'ingestion',
    component : CurateMainComponent,
    data : { url : 'curate'},
    children : [
    ]
  },
  {
    path: 'dimBuilder',
    loadChildren: () => import("./dim-builder/dim-builder.module").then(m => m.DimBuilderModule)
  },

  // {
  //   path : '**',
  //   redirectTo : '/404'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurateRoutingModule { }
