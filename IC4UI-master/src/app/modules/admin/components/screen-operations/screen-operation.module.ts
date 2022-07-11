import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TreeModule } from 'angular-tree-component';
import { ScreenoperationsRoutingModule } from './sccreen-operations-routing.module';
import { AddscreenComponent } from './addscreen/addscreen.component';
import { AddscreenoperationsComponent } from './addscreenoperations/addscreenoperations.component';
import { ScreenOperationsComponent } from './screen-operations.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [ScreenOperationsComponent,AddscreenComponent,AddscreenoperationsComponent],
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule.forRoot(),
    ScreenoperationsRoutingModule
  ]
})


export class ScreenOperationModule { }
