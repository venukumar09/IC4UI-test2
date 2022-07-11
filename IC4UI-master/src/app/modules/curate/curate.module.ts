import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurateRoutingModule } from './curate-routing.module';
import { CurateHomeComponent } from './components/curate-home/curate-home.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { CdcComponent } from './components/services/cdc/cdc.component';
import { CurateServicesComponent } from './components/services/curate-services/curate-services.component';
import { CurateMainComponent } from './components/curate-main/curate-main.component';
import { CurateScheduleComponent } from './components/curate-schedule/curate-schedule.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { InputModalComponent } from './components/input-modal/input-modal.component';
import { CurateComponent } from './curate.component';


@NgModule({
  declarations: [CurateHomeComponent, CdcComponent, CurateServicesComponent, CurateMainComponent, CurateScheduleComponent, InputModalComponent, CurateComponent],
  imports: [
    CommonModule,
    FormsModule,
    CurateRoutingModule,
    DragDropModule ,
    MatDialogModule
  ],
  providers:[
    {provide: MatDialogRef, useValue: {}},
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  entryComponents:[
    CurateScheduleComponent,
    InputModalComponent
  ]
    
})
export class CurateModule { }
