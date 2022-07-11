import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


import { StreamingDqRoutingModule } from './streaming-dq-routing.module';
import { StreamingDqComponent } from './streaming-dq.component';
import { StreamingDqRulesComponent } from 'src/app/shared/components/streaming-dq-rules/streaming-dq-rules.component';



@NgModule({
  declarations: [
    StreamingDqComponent,
    StreamingDqRulesComponent,
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    StreamingDqRoutingModule,
    
  ]
})
export class StreamingDqModule { }
