import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { AdminComponent } from './admin/components/admin/admin.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
import {HomePageComponent } from '../shared/home-page/home-page.component'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    FormsModule
  ]
})
export class ModulesModule { }
