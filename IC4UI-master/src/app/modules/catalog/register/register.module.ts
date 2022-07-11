import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { UploadTemplateComponent } from './upload-template/upload-template.component';
import { DragDropUploadDirective } from './drag-drop-upload.directive';
import { ConnectorComponent } from './connector/connector.component';


@NgModule({
  declarations: [RegisterComponent, UploadTemplateComponent, DragDropUploadDirective, ConnectorComponent],
  exports: [RegisterComponent, UploadTemplateComponent],
  imports: [
    CommonModule,
    FormsModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
