import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ColumnDetailsComponent} from './column-details/column-details.component'
import { TableDetailsComponent } from './table-details/table-details.component';
import { GrossaryDetailsComponent } from './grossary-details/grossary-details.component';
import { FileDetailsComponent } from './file-details/file-details.component'
const routes: Routes = [
//   {
//     path:'',
//     component:ColumnDetailsComponent
// },
  {
      path: '',
      children: [
          { path: 'Table/:id/:flag', component: TableDetailsComponent , data: { breadcrumb: 'Table Details' } },
          { path: 'Column/:id/:flag', component: ColumnDetailsComponent, data: { breadcrumb: 'Column Details' } },
          { path: 'Glossary/:id/:flag', component: GrossaryDetailsComponent, data: { breadcrumb: 'Glossary Details' } },
          { path: 'File/:id/:flag', component: FileDetailsComponent, data: { breadcrumb: 'File Details' } },
          // { path: 'annotate/:id/:flag', component: AnnotationsComponent, data: { breadcrumb: 'Annotate Details' } },
          // { path: 'jobdetails/:id', component: JobDetailsComponent, data: { breadcrumb: 'Job Details' } },
          // { path: 'impactAnalysis/:id/:obj_nm', component: ImpactAnalysisComponent, data: { breadcrumb: 'Impact Analysis' } },
      ]
  }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetDetailsRoutingModule {
  
 }
