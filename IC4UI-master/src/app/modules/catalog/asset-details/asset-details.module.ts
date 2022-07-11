import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetDetailsRoutingModule } from './asset-details-routing.module';
import { ColumnDetailsComponent } from './column-details/column-details.component';
import { TableDetailsComponent } from './table-details/table-details.component';
import { GrossaryDetailsComponent } from './grossary-details/grossary-details.component';
import { FileDetailsComponent } from './file-details/file-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DqRulesComponent } from 'src/app/shared/components/dq-rules/dq-rules.component';
import { FilterDataIngestionPipe } from 'src/app/shared/pipes/filter-data-ingestion.pipe';
import { FilterDataByTypePipe } from 'src/app/shared/pipes/filter-data-by-types.pipe';
import { ProfilingDataComponent } from '../../curate/components/profiling-data/profiling-data.component';
import { ProfilingData1Component } from '../../curate/components/profiling-data1/profiling-data1.component';
import { CatalogModule} from "src/app/modules/catalog/catalog.module";
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;
@NgModule({
  declarations: [ColumnDetailsComponent,
    TableDetailsComponent, GrossaryDetailsComponent,
     FileDetailsComponent,DqRulesComponent,
     FilterDataByTypePipe,ProfilingDataComponent,ProfilingData1Component],
  imports: [
    CommonModule,
    AssetDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CatalogModule,
    PlotlyModule
  ],


})
export class AssetDetailsModule { }
