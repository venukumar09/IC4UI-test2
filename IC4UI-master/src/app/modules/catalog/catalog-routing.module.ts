import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectorsComponent } from './connectors/connectors.component';
import { RegisterComponent } from './register/register.component';
import { CatalogComponent } from './catalog.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import {AssetDetailsModule} from './asset-details/asset-details.module'
import { DqConfigComponent } from './dq-config/dq-config.component';
import { FormBasedIngestionComponent } from './form-based-ingestion/form-based-ingestion.component';
import { JinjaRulesComponent } from './jinja-rules/jinja-rules.component';
import { StreamingDqComponent } from './streaming-dq/streaming-dq.component';
import { BusinessGlossaryComponent } from './business-glossary/business-glossary.component';
const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
    // children: [
    //   {
    //     path: 'connectors',
    //     loadChildren: () => import(`./connectors/connectors.module`).then(m => m.ConnectorsModule)
    //   },
    //   {
    //     path: 'register',
    //     loadChildren: () => import(`./register/register.module`).then(m => m.RegisterModule)
    //     // component: RegisterComponent
    //   },
    // ]
  },
  {
    path:'connectors',
    component:ConnectorsComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'searchResults/:text/:flag',
    component:SearchResultsComponent
  },
  { path: 'dq-config/:id/:flag',
    component: DqConfigComponent , data: { breadcrumb: 'DQ Config' }
  },
  { path: 'form-based-ingestion/:id/:flag',
    component: FormBasedIngestionComponent ,
  },
  {
    path:'fbi',
    component:FormBasedIngestionComponent
  },
  {
    path: 'assetDetails',
    // loadChildren: './asset-details/asset-details.module#AssetDetailsModule'
    loadChildren: () => import('./asset-details/asset-details.module').then(m => m.AssetDetailsModule)
  },
  {
    path: 'streamingdq/:id',
    loadChildren: () => import('./streaming-dq/streaming-dq.module').then(m => m.StreamingDqModule)
  },
  {
    path:'dq/rules/:id',
    component:JinjaRulesComponent
  },
  {
    path:'glossary',
    component:BusinessGlossaryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
