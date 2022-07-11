import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-grossary-details',
  templateUrl: './grossary-details.component.html',
  styleUrls: ['./grossary-details.component.scss']
})
export class GrossaryDetailsComponent implements OnInit {


  assetId: any;
  modelflag: any;
  show: any;
  objId: any;
  previous: any;
  screenPermissions = [];
  userId: any;
  roleId: any;
  orgId: any;
  showDetails: boolean=false;
  noDataFound: boolean=false;
  tableDetails: any;
  dataSensitivity: { pii: any; phi: any; pci: any; conf: any; };
  assetName: any;
  topUsers: any;
  editabletableDetails:any;

  constructor(private service:ApiService,private route: ActivatedRoute,private locStorage:LocalStorageService) { }

  ngOnInit() {
    this.userId = this.locStorage.retrieve('userId');
    this.roleId = this.locStorage.retrieve('roleId');
    this.orgId = this.locStorage.retrieve('orgId');
    const data: any = this.locStorage.retrieve('urls');

    // this.screenPermissions = this.security.getscreenpermissions(this.screenName);
    // getting attribute id from route.
    this.route.params.subscribe((params: ParamMap) => {
      this.assetId = params['id'];
      this.modelflag = params['flag'];
      this.route.queryParams.subscribe(qparams => {
        this.show = qparams.view;
        this.objId = qparams.objId
        this.previous = qparams.pre;
        if (this.show === 'details' || this.show === 'annotate') {
         this.loadInitData();
        }
      });
    });
  }
  loadInitData(){
    const values = {
      type: 'T',
      assetId: this.assetId,
      userId: this.userId
    }
    
    
    // var result={
    //   "table": [
    //     {
    //       "id": "5ff1f8da24b3b82812f242452fca85c5",
    //       "dsnName": "INS_HTTPS_DS",
    //       "dataPlatform": "HTTPS",
    //       "schema": "Ins_Cust2",
    //       "assetName": "Lob",
    //       "assetType": "File",
    //       "description": "This table contains general information which refers to a product or a set of related products that serve a particular customer transaction or business need. In some industry sectors, like insurance, \"line of business\" also has a regulatory and accounting definition to meet a statutory set of insurance policies. It may or may not be a strategically relevant business unit.",
    //       "size": 153,
    //       "applicationName": "CRM",
    //       "lobData": "Life Insurance",
    //       "usedInApplication": 0,
    //       "usedInReport": 0,
    //       "profiledColumns": 0,
    //       "typeOfProfiling": 0,
    //       "maxRowsToScan": 0,
    //       "profileFrequency": 0,
    //       "usedInJobs": 0,
    //       "loadFrequency": null,
    //       "lastloadedDate": 0,
    //       "avgJobCompletionTime": 0,
    //       "slaMisses": 0,
    //       "lastModifiedDate": "2019-05-06T00:00:00",
    //       "certifiedDate": null,
    //       "accrPct": null,
    //       "cmpltPct": 100,
    //       "cnfmPct": null,
    //       "uniqPct": 100,
    //       "cnsPct": 100,
    //       "crtLevel_1": null,
    //       "crtLevel_2": null,
    //       "crtLevel_3": null,
    //       "cnfdl_flag": "N"
    //     },
    //     {
    //       "id": "5ff1f8da24b3b82812f242452fca85c5",
    //       "dsnName": "INS_HTTPS_DS",
    //       "dataPlatform": "HTTPS",
    //       "schema": "Ins_Cust2",
    //       "assetName": "Lob",
    //       "assetType": "File",
    //       "description": "This table contains general information which refers to a product or a set of related products that serve a particular customer transaction or business need. In some industry sectors, like insurance, \"line of business\" also has a regulatory and accounting definition to meet a statutory set of insurance policies. It may or may not be a strategically relevant business unit.",
    //       "size": 153,
    //       "applicationName": "CRM",
    //       "lobData": "Life Insurance",
    //       "usedInApplication": 0,
    //       "usedInReport": 0,
    //       "profiledColumns": 0,
    //       "typeOfProfiling": 0,
    //       "maxRowsToScan": 0,
    //       "profileFrequency": 0,
    //       "usedInJobs": 0,
    //       "loadFrequency": null,
    //       "lastloadedDate": 0,
    //       "avgJobCompletionTime": 0,
    //       "slaMisses": 0,
    //       "lastModifiedDate": "2019-05-06T00:00:00",
    //       "certifiedDate": null,
    //       "accrPct": null,
    //       "cmpltPct": 100,
    //       "cnfmPct": null,
    //       "uniqPct": 100,
    //       "cnsPct": 100,
    //       "crtLevel_1": null,
    //       "crtLevel_2": null,
    //       "crtLevel_3": null,
    //       "cnfdl_flag": "N"
    //     },
    //     {
    //       "id": "5ff1f8da24b3b82812f242452fca85c5",
    //       "dsnName": "INS_HTTPS_DS",
    //       "dataPlatform": "HTTPS",
    //       "schema": "Ins_Cust2",
    //       "assetName": "Lob",
    //       "assetType": "File",
    //       "description": "This table contains general information which refers to a product or a set of related products that serve a particular customer transaction or business need. In some industry sectors, like insurance, \"line of business\" also has a regulatory and accounting definition to meet a statutory set of insurance policies. It may or may not be a strategically relevant business unit.",
    //       "size": 153,
    //       "applicationName": "CRM",
    //       "lobData": "Life Insurance",
    //       "usedInApplication": 0,
    //       "usedInReport": 0,
    //       "profiledColumns": 0,
    //       "typeOfProfiling": 0,
    //       "maxRowsToScan": 0,
    //       "profileFrequency": 0,
    //       "usedInJobs": 0,
    //       "loadFrequency": null,
    //       "lastloadedDate": 0,
    //       "avgJobCompletionTime": 0,
    //       "slaMisses": 0,
    //       "lastModifiedDate": "2019-05-06T00:00:00",
    //       "certifiedDate": null,
    //       "accrPct": null,
    //       "cmpltPct": 100,
    //       "cnfmPct": null,
    //       "uniqPct": 100,
    //       "cnsPct": 100,
    //       "crtLevel_1": null,
    //       "crtLevel_2": null,
    //       "crtLevel_3": null,
    //       "cnfdl_flag": "N"
    //     },
    //     {
    //       "id": "5ff1f8da24b3b82812f242452fca85c5",
    //       "dsnName": "INS_HTTPS_DS",
    //       "dataPlatform": "HTTPS",
    //       "schema": "Ins_Cust2",
    //       "assetName": "Lob",
    //       "assetType": "File",
    //       "description": "This table contains general information which refers to a product or a set of related products that serve a particular customer transaction or business need. In some industry sectors, like insurance, \"line of business\" also has a regulatory and accounting definition to meet a statutory set of insurance policies. It may or may not be a strategically relevant business unit.",
    //       "size": 153,
    //       "applicationName": "CRM",
    //       "lobData": "Life Insurance",
    //       "usedInApplication": 0,
    //       "usedInReport": 0,
    //       "profiledColumns": 0,
    //       "typeOfProfiling": 0,
    //       "maxRowsToScan": 0,
    //       "profileFrequency": 0,
    //       "usedInJobs": 0,
    //       "loadFrequency": null,
    //       "lastloadedDate": 0,
    //       "avgJobCompletionTime": 0,
    //       "slaMisses": 0,
    //       "lastModifiedDate": "2019-05-06T00:00:00",
    //       "certifiedDate": null,
    //       "accrPct": null,
    //       "cmpltPct": 100,
    //       "cnfmPct": null,
    //       "uniqPct": 100,
    //       "cnsPct": 100,
    //       "crtLevel_1": null,
    //       "crtLevel_2": null,
    //       "crtLevel_3": null,
    //       "cnfdl_flag": "N"
    //     },
    //     {
    //       "id": "5ff1f8da24b3b82812f242452fca85c5",
    //       "dsnName": "INS_HTTPS_DS",
    //       "dataPlatform": "HTTPS",
    //       "schema": "Ins_Cust2",
    //       "assetName": "Lob",
    //       "assetType": "File",
    //       "description": "This table contains general information which refers to a product or a set of related products that serve a particular customer transaction or business need. In some industry sectors, like insurance, \"line of business\" also has a regulatory and accounting definition to meet a statutory set of insurance policies. It may or may not be a strategically relevant business unit.",
    //       "size": 153,
    //       "applicationName": "CRM",
    //       "lobData": "Life Insurance",
    //       "usedInApplication": 0,
    //       "usedInReport": 0,
    //       "profiledColumns": 0,
    //       "typeOfProfiling": 0,
    //       "maxRowsToScan": 0,
    //       "profileFrequency": 0,
    //       "usedInJobs": 0,
    //       "loadFrequency": null,
    //       "lastloadedDate": 0,
    //       "avgJobCompletionTime": 0,
    //       "slaMisses": 0,
    //       "lastModifiedDate": "2019-05-06T00:00:00",
    //       "certifiedDate": null,
    //       "accrPct": null,
    //       "cmpltPct": 100,
    //       "cnfmPct": null,
    //       "uniqPct": 100,
    //       "cnsPct": 100,
    //       "crtLevel_1": null,
    //       "crtLevel_2": null,
    //       "crtLevel_3": null,
    //       "cnfdl_flag": "N"
    //     },
    //     {
    //       "id": "5ff1f8da24b3b82812f242452fca85c5",
    //       "dsnName": "INS_HTTPS_DS",
    //       "dataPlatform": "HTTPS",
    //       "schema": "Ins_Cust2",
    //       "assetName": "Lob",
    //       "assetType": "File",
    //       "description": "This table contains general information which refers to a product or a set of related products that serve a particular customer transaction or business need. In some industry sectors, like insurance, \"line of business\" also has a regulatory and accounting definition to meet a statutory set of insurance policies. It may or may not be a strategically relevant business unit.",
    //       "size": 153,
    //       "applicationName": "CRM",
    //       "lobData": "Life Insurance",
    //       "usedInApplication": 0,
    //       "usedInReport": 0,
    //       "profiledColumns": 0,
    //       "typeOfProfiling": 0,
    //       "maxRowsToScan": 0,
    //       "profileFrequency": 0,
    //       "usedInJobs": 0,
    //       "loadFrequency": null,
    //       "lastloadedDate": 0,
    //       "avgJobCompletionTime": 0,
    //       "slaMisses": 0,
    //       "lastModifiedDate": "2019-05-06T00:00:00",
    //       "certifiedDate": null,
    //       "accrPct": null,
    //       "cmpltPct": null,
    //       "cnfmPct": null,
    //       "uniqPct": 100,
    //       "cnsPct": 100,
    //       "crtLevel_1": null,
    //       "crtLevel_2": null,
    //       "crtLevel_3": null,
    //       "cnfdl_flag": "N"
    //     },
    //     {
    //       "id": "5ff1f8da24b3b82812f242452fca85c5",
    //       "dsnName": "INS_HTTPS_DS",
    //       "dataPlatform": "HTTPS",
    //       "schema": "Ins_Cust2",
    //       "assetName": "Lob",
    //       "assetType": "File",
    //       "description": "This table contains general information which refers to a product or a set of related products that serve a particular customer transaction or business need. In some industry sectors, like insurance, \"line of business\" also has a regulatory and accounting definition to meet a statutory set of insurance policies. It may or may not be a strategically relevant business unit.",
    //       "size": 153,
    //       "applicationName": "CRM",
    //       "lobData": "Life Insurance",
    //       "usedInApplication": 0,
    //       "usedInReport": 0,
    //       "profiledColumns": 0,
    //       "typeOfProfiling": 0,
    //       "maxRowsToScan": 0,
    //       "profileFrequency": 0,
    //       "usedInJobs": 0,
    //       "loadFrequency": null,
    //       "lastloadedDate": 0,
    //       "avgJobCompletionTime": 0,
    //       "slaMisses": 0,
    //       "lastModifiedDate": "2019-05-06T00:00:00",
    //       "certifiedDate": null,
    //       "accrPct": null,
    //       "cmpltPct": null,
    //       "cnfmPct": null,
    //       "uniqPct": 100,
    //       "cnsPct": 100,
    //       "crtLevel_1": null,
    //       "crtLevel_2": null,
    //       "crtLevel_3": null,
    //       "cnfdl_flag": "N"
    //     },
    //     {
    //       "id": "5ff1f8da24b3b82812f242452fca85c5",
    //       "dsnName": "INS_HTTPS_DS",
    //       "dataPlatform": "HTTPS",
    //       "schema": "Ins_Cust2",
    //       "assetName": "Lob",
    //       "assetType": "File",
    //       "description": "This table contains general information which refers to a product or a set of related products that serve a particular customer transaction or business need. In some industry sectors, like insurance, \"line of business\" also has a regulatory and accounting definition to meet a statutory set of insurance policies. It may or may not be a strategically relevant business unit.",
    //       "size": 153,
    //       "applicationName": "CRM",
    //       "lobData": "Life Insurance",
    //       "usedInApplication": 0,
    //       "usedInReport": 0,
    //       "profiledColumns": 0,
    //       "typeOfProfiling": 0,
    //       "maxRowsToScan": 0,
    //       "profileFrequency": 0,
    //       "usedInJobs": 0,
    //       "loadFrequency": null,
    //       "lastloadedDate": 0,
    //       "avgJobCompletionTime": 0,
    //       "slaMisses": 0,
    //       "lastModifiedDate": "2019-05-06T00:00:00",
    //       "certifiedDate": null,
    //       "accrPct": null,
    //       "cmpltPct": null,
    //       "cnfmPct": null,
    //       "uniqPct": 100,
    //       "cnsPct": 100,
    //       "crtLevel_1": null,
    //       "crtLevel_2": null,
    //       "crtLevel_3": null,
    //       "cnfdl_flag": "N"
    //     },
    //     {
    //       "id": "5ff1f8da24b3b82812f242452fca85c5",
    //       "dsnName": "INS_HTTPS_DS",
    //       "dataPlatform": "HTTPS",
    //       "schema": "Ins_Cust2",
    //       "assetName": "Lob",
    //       "assetType": "File",
    //       "description": "This table contains general information which refers to a product or a set of related products that serve a particular customer transaction or business need. In some industry sectors, like insurance, \"line of business\" also has a regulatory and accounting definition to meet a statutory set of insurance policies. It may or may not be a strategically relevant business unit.",
    //       "size": 153,
    //       "applicationName": "CRM",
    //       "lobData": "Life Insurance",
    //       "usedInApplication": 0,
    //       "usedInReport": 0,
    //       "profiledColumns": 0,
    //       "typeOfProfiling": 0,
    //       "maxRowsToScan": 0,
    //       "profileFrequency": 0,
    //       "usedInJobs": 0,
    //       "loadFrequency": null,
    //       "lastloadedDate": 0,
    //       "avgJobCompletionTime": 0,
    //       "slaMisses": 0,
    //       "lastModifiedDate": "2019-05-06T00:00:00",
    //       "certifiedDate": null,
    //       "accrPct": null,
    //       "cmpltPct": null,
    //       "cnfmPct": null,
    //       "uniqPct": 100,
    //       "cnsPct": 100,
    //       "crtLevel_1": null,
    //       "crtLevel_2": null,
    //       "crtLevel_3": null,
    //       "cnfdl_flag": "N"
    //     },
    //     {
    //       "id": "5ff1f8da24b3b82812f242452fca85c5",
    //       "dsnName": "INS_HTTPS_DS",
    //       "dataPlatform": "HTTPS",
    //       "schema": "Ins_Cust2",
    //       "assetName": "Lob",
    //       "assetType": "File",
    //       "description": "This table contains general information which refers to a product or a set of related products that serve a particular customer transaction or business need. In some industry sectors, like insurance, \"line of business\" also has a regulatory and accounting definition to meet a statutory set of insurance policies. It may or may not be a strategically relevant business unit.",
    //       "size": 153,
    //       "applicationName": "CRM",
    //       "lobData": "Life Insurance",
    //       "usedInApplication": 0,
    //       "usedInReport": 0,
    //       "profiledColumns": 0,
    //       "typeOfProfiling": 0,
    //       "maxRowsToScan": 0,
    //       "profileFrequency": 0,
    //       "usedInJobs": 0,
    //       "loadFrequency": null,
    //       "lastloadedDate": 0,
    //       "avgJobCompletionTime": 0,
    //       "slaMisses": 0,
    //       "lastModifiedDate": "2019-05-06T00:00:00",
    //       "certifiedDate": null,
    //       "accrPct": null,
    //       "cmpltPct": null,
    //       "cnfmPct": null,
    //       "uniqPct": 100,
    //       "cnsPct": 100,
    //       "crtLevel_1": null,
    //       "crtLevel_2": null,
    //       "crtLevel_3": null,
    //       "cnfdl_flag": "N"
    //     },
    //     {
    //       "id": "5ff1f8da24b3b82812f242452fca85c5",
    //       "dsnName": "INS_HTTPS_DS",
    //       "dataPlatform": "HTTPS",
    //       "schema": "Ins_Cust2",
    //       "assetName": "Lob",
    //       "assetType": "File",
    //       "description": "This table contains general information which refers to a product or a set of related products that serve a particular customer transaction or business need. In some industry sectors, like insurance, \"line of business\" also has a regulatory and accounting definition to meet a statutory set of insurance policies. It may or may not be a strategically relevant business unit.",
    //       "size": 153,
    //       "applicationName": "CRM",
    //       "lobData": "Life Insurance",
    //       "usedInApplication": 0,
    //       "usedInReport": 0,
    //       "profiledColumns": 0,
    //       "typeOfProfiling": 0,
    //       "maxRowsToScan": 0,
    //       "profileFrequency": 0,
    //       "usedInJobs": 0,
    //       "loadFrequency": null,
    //       "lastloadedDate": 0,
    //       "avgJobCompletionTime": 0,
    //       "slaMisses": 0,
    //       "lastModifiedDate": "2019-05-06T00:00:00",
    //       "certifiedDate": null,
    //       "accrPct": null,
    //       "cmpltPct": null,
    //       "cnfmPct": null,
    //       "uniqPct": 100,
    //       "cnsPct": 100,
    //       "crtLevel_1": null,
    //       "crtLevel_2": null,
    //       "crtLevel_3": null,
    //       "cnfdl_flag": "N"
    //     },
    //     {
    //       "id": "5ff1f8da24b3b82812f242452fca85c5",
    //       "dsnName": "INS_HTTPS_DS",
    //       "dataPlatform": "HTTPS",
    //       "schema": "Ins_Cust2",
    //       "assetName": "Lob",
    //       "assetType": "File",
    //       "description": "This table contains general information which refers to a product or a set of related products that serve a particular customer transaction or business need. In some industry sectors, like insurance, \"line of business\" also has a regulatory and accounting definition to meet a statutory set of insurance policies. It may or may not be a strategically relevant business unit.",
    //       "size": 153,
    //       "applicationName": "CRM",
    //       "lobData": "Life Insurance",
    //       "usedInApplication": 0,
    //       "usedInReport": 0,
    //       "profiledColumns": 0,
    //       "typeOfProfiling": 0,
    //       "maxRowsToScan": 0,
    //       "profileFrequency": 0,
    //       "usedInJobs": 0,
    //       "loadFrequency": null,
    //       "lastloadedDate": 0,
    //       "avgJobCompletionTime": 0,
    //       "slaMisses": 0,
    //       "lastModifiedDate": "2019-05-06T00:00:00",
    //       "certifiedDate": null,
    //       "accrPct": null,
    //       "cmpltPct": null,
    //       "cnfmPct": null,
    //       "uniqPct": 100,
    //       "cnsPct": 100,
    //       "crtLevel_1": null,
    //       "crtLevel_2": null,
    //       "crtLevel_3": null,
    //       "cnfdl_flag": "N"
    //     }
    //   ],
    //   "columns": [
    //     {
    //       "id": "370370ccc98ae4ba62ae766603e88a94",
    //       "assetName": "MasterLineOfBusiness",
    //       "dataType": "character varying",
    //       "dataTypeLength": "250",
    //       "isNull": "N",
    //       "isPK": "Y",
    //       "isFK": "N",
    //       "orderNumber": 1,
    //       "rul_nms": "Null Check",
    //       "searchCount": 0
    //     },
    //     {
    //       "id": "c768fca528ef93744f6fcd80ba54a5d2",
    //       "assetName": "LineOfBusinessDescription",
    //       "dataType": "character varying",
    //       "dataTypeLength": "250",
    //       "isNull": "Y",
    //       "isPK": "N",
    //       "isFK": "N",
    //       "orderNumber": 2,
    //       "rul_nms": "Null Check, Data Format Check",
    //       "searchCount": 0
    //     }
    //   ],
    //   "relatedTerms": [],
    //   "relatedJobs_Tar": [],
    //   "relatedJobs_Src": [
    //     {
    //       "SourceJobs": "Lob_data_05082019",
    //       "SourceJobIds": "3d3a96a1e1dc5d012ea850ab1f5c3e8b"
    //     }
    //   ]
    // }
      
    this.service.post(this.service.assetDetails_ep, values).subscribe((result) => {

      if (result.table.length !== 0) {
        this.tableDetails = result.table[0];
        this.editabletableDetails=result.table[0]
        // this.topUsers = result.topUsers;
        this.assetName = this.tableDetails.assetName;
        if (this.tableDetails.rulesApplied !== null && this.tableDetails.rulesApplied !== 0) {
          this.tableDetails.rulesApplied = this.tableDetails.rulesApplied.split(',');
        } else {
          this.tableDetails.rulesApplied = [];
        }

        this.dataSensitivity = {
          pii: this.tableDetails.personallyIdentifiedInfo,
          phi: this.tableDetails.protectedHealthInfo,
          pci: this.tableDetails.paymentCardInfo,
          conf: this.tableDetails.confidential
        };

        // this.hoveredColor(this.tableDetails.accrPct);
        this.showDetails = true;
      } else {
        // this.showDetails = true;
        this.noDataFound = true;
        // this.toast.showerror('No Data Found.');
      }
    // }, err => {
    //   this.showDetails = true;
    //   // this.toast.showerror('Please try again.');
    // });
  });
  }
  updateConnection(){
    this.service.post(this.service.assetDetails_ep, this.editabletableDetails).subscribe((result) => {
      alert("successfully updated")
    });
  }
}
