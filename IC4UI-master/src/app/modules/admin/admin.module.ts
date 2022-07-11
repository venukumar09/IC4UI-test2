import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { LobComponent } from './components/lob/lob.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { OrgCreationComponent } from './components/org-creation/org-creation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ScreenOperationsComponent } from './components/screen-operations/screen-operations.component';
import { AddscreenComponent } from './components/screen-operations/addscreen/addscreen.component';
import { AddscreenoperationsComponent } from './components/screen-operations/addscreenoperations/addscreenoperations.component';


@NgModule({
  declarations: [AdminComponent, UserComponent, LobComponent, ApplicationsComponent, OrganizationComponent, OrgCreationComponent],
  imports: [
    MatDialogModule,
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents:[
    OrgCreationComponent]
})
export class AdminModule { }
