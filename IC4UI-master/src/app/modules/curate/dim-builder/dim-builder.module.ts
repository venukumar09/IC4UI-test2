import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TreeModule } from 'angular-tree-component';

import { DimBuilderRoutingModule } from './dim-builder-routing.module';
import { DimBuilderComponent } from './dim-builder.component';
import { SourceComponent } from './source/source.component';
import { MapperComponent } from './mapper/mapper.component';
import { JoinerComponent } from './joiner/joiner.component';
import { AggregatorComponent } from './aggregator/aggregator.component';
import { TargetComponent } from './target/target.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { ViewDimJobsComponent } from './view-dim-jobs/view-dim-jobs.component';


@NgModule({
  declarations: [DimBuilderComponent, SourceComponent,
    MapperComponent, JoinerComponent, AggregatorComponent,
    TargetComponent, SchedulerComponent, ViewDimJobsComponent],
  imports: [
    CommonModule,
    FormsModule,
    TreeModule.forRoot(),
    DimBuilderRoutingModule
  ]
})
export class DimBuilderModule { }
