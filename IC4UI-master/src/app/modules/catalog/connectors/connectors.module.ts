import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectorsRoutingModule } from './connectors-routing.module';
import { SelectSourcesComponent } from './select-sources/select-sources.component';
import { CreateConnectionsComponent } from './create-connections/create-connections.component';

import { FormsModule } from '@angular/forms';
import { ViewEditConnectionsComponent } from './view-edit-connections/view-edit-connections.component';
import {MatTableModule} from '@angular/material/table';
import { ConnectorsComponent } from './connectors.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { SideBarComponent } from 'src/app/shared/side-bar/side-bar.component';
import { CreateFileConnectorComponent } from './create-file-connector/create-file-connector.component';
import { CreateReportConnectorComponent } from './create-report-connector/create-report-connector.component';


@NgModule({
  declarations: [SelectSourcesComponent, CreateConnectionsComponent, ViewEditConnectionsComponent,ConnectorsComponent, CreateFileConnectorComponent,CreateFileConnectorComponent, CreateReportConnectorComponent ],
  exports:[SelectSourcesComponent,CreateConnectionsComponent,ViewEditConnectionsComponent,ConnectorsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    ConnectorsRoutingModule
  ]
})
export class ConnectorsModule { }
