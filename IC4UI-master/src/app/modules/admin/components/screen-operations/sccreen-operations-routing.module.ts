import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddscreenoperationsComponent } from './addscreenoperations/addscreenoperations.component';
import { AddscreenComponent } from './addscreen/addscreen.component';
import { ScreenOperationsComponent } from './screen-operations.component';


const routes: Routes = [
    {
        path: '',
        component: ScreenOperationsComponent
    },

    {
        path: 'addscreen',
        component: AddscreenComponent
    },
    {
        path: 'addoperation',
        component: AddscreenoperationsComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScreenoperationsRoutingModule { }
