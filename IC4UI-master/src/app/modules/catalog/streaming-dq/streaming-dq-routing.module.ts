import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamingDqComponent } from './streaming-dq.component';


const routes: Routes = [ 
  {
  path:'',
  component:StreamingDqComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StreamingDqRoutingModule { }
