import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from '@angular/flex-layout';

import { CatalogRoutingModule } from "./catalog-routing.module";
import { ConnectorsComponent } from "./connectors/connectors.component";
import { ConnectorsModule } from "./connectors/connectors.module";
import { RegisterModule } from "./register/register.module";
import { CatalogComponent } from "./catalog.component";
import { SearchResultsComponent } from "./search-results/search-results.component";
import { AssetDetailsModule } from "./asset-details/asset-details.module";
import { FormsModule } from "@angular/forms";
import { DqConfigComponent } from "./dq-config/dq-config.component";
import { FormBasedIngestionComponent } from "./form-based-ingestion/form-based-ingestion.component";
import { JinjaRulesComponent } from "./jinja-rules/jinja-rules.component";
import { StreamingDqRulesComponent } from "src/app/shared/components/streaming-dq-rules/streaming-dq-rules.component";
import { StreamingDqComponent } from "./streaming-dq/streaming-dq.component";
import { CdeDqRulesComponent } from "src/app/shared/components/cde-dq-rules/cde-dq-rules.component";
import { FilterDataIngestionPipe } from "src/app/shared/pipes/filter-data-ingestion.pipe";
import { TitleCasePipePro } from "src/app/shared/pipes/title-case-pro.pipe";
import { BusinessGlossaryComponent } from './business-glossary/business-glossary.component';

@NgModule({
  declarations: [
    CatalogComponent,
    SearchResultsComponent,
    DqConfigComponent,
    FormBasedIngestionComponent,
    JinjaRulesComponent,
    CdeDqRulesComponent,
    FilterDataIngestionPipe,
    TitleCasePipePro,
    BusinessGlossaryComponent

  ],
  imports: [
    CommonModule,
    ConnectorsModule,
    RegisterModule,
    CatalogRoutingModule,
    FormsModule,
    FlexLayoutModule
  ],

  exports:[
    CdeDqRulesComponent
  ]
})
export class CatalogModule {}
