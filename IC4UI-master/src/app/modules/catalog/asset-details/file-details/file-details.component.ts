import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute, ParamMap ,Router} from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import * as $$ from 'jquery';
declare var $:any;
import 'datatables.net';
import 'datatables.net-bs4';
import { DataService } from '../../../../shared/services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss']
})
export class FileDetailsComponent implements OnInit {

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
  assetType: any;
  topUsers: any;
  editabletableDetails:any;
  columnStatus: string;
  coldtl:any;

  hoveredElement = {
    title: '',
    text: '',
    color: 'gray'
  };
  helpText = {
    'accuracy': `Data element values are properly assigned or valid.
                 Eg: Name field has numbers and Gender field has invalid values instead of M,F etc.`,
    'completeness': `Data element is always required to be populated.`,
    'consistency': `Data element should not give conflicting information and should be consistent across systems.`,
    'conformity': `To ensure that the data follows the set of standard definitions and format.`,
    'uniqueness': `To ensure that each data record is distinct and unique, and there is no data duplication reported.`
  };
  iframeURL: SafeResourceUrl;

  annoteDetails = {
    type: '0',
    text: '',
    rating: '0',
  }

  annoteTypeValues= [
    {id:1, name: 'Comment'},
    {id:2, name: 'Issue'}
  ];

  storedAnnote :any = [

    // {
    //   "user" : "test-user1",
    //   "type" :"Comment",
    //   "type_id" : 1,
    //   "annotation" : "text goes here..",
    //   "date" : "2021-07-05T10:35:29.617645",
    //   "rating" : 5
    // },
   
  ];

  storedAnnoteCopy = [

   
  ];

  annoteTypeValue;
  dataTable: any = {};
  
 

  constructor(private service:ApiService,private route: ActivatedRoute,
    private locStorage:LocalStorageService, private sanitizer: DomSanitizer,
    private dataService: DataService, private loader: NgxSpinnerService,
    private toastr: ToastrService,private router:Router,
    ) {
     
     }

  ngOnInit() {

   var x = localStorage.getItem('fromcolumn');
   if(x == 'y'){
    this.columnStatus='y';
   }else{
    this.columnStatus='n';
   }

   localStorage.removeItem('fromcolumn');
    
    this.userId = this.locStorage.retrieve('userId');
    this.roleId = this.locStorage.retrieve('roleId');
    this.orgId = this.locStorage.retrieve('orgId');
    const data: any = this.locStorage.retrieve('urls');
    // this.iframeURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://us-east-1.online.tableau.com/#/site/gathi/views/DataQualityScorecard/DataQualityScorecard?Tab%20Nm=workorder');
    this.iframeURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://sso.online.tableau.com/public/idp/SSO');
    
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
        // result.table[0].accrPct = 20;
        // result.table[0].cmpltPct = 40;
        // result.table[0].cnfmPct = 60;
        // result.table[0].uniqPct = 80;
        // result.table[0].cnsPct = 100;
        this.tableDetails = result.table[0];
        this.editabletableDetails=result.table[0]
        this.coldtl=result.columns;
        // this.topUsers = result.topUsers;
        this.assetName = this.tableDetails.assetName;
        this.assetType = this.tableDetails.assetType;

        if (this.tableDetails.rulesApplied !== null && this.tableDetails.rulesApplied !== 0
          && this.tableDetails.rulesApplied !== undefined
         ) {
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

        this.hoveredColor(this.tableDetails.accrPct);
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

  this.getAnnotationTypes();

  this.getObjDetails(this.assetId);
  
  }
  colSta(){
    this.columnStatus='y';
    this.configDqRules = false;
  }
  tablSta(){
    this.columnStatus='n';
    this.configDqRules = false;
  }
  updateConnection(){
    this.service.post(this.service.assetDetails_ep, this.editabletableDetails).subscribe((result) => {

    });
  }

  profilingData;
  previewData(){
    this.columnStatus='p';
    this.configDqRules = false;
    this.service.post(this.service.getProfilingData,{})
    .subscribe(res =>{
      console.log(res);
      this.profilingData = res
    }, err =>{
      console.log(err);
    })
    // console.log(this.assetId)
  }

  previewData1(){
    
    this.configDqRules = false;
    // this.service.post(this.service.getProfilingData,{assetId: this.assetId})
    this.service.post(this.service.getProfilingData,{})
    .subscribe(res =>{
      console.log(res);
      this.profilingData = res
      this.columnStatus='p1';
    }, err =>{
      console.log(err);
    })
    // console.log(this.assetId)
  }

  hoveredOn(ele) {
    switch (ele) {
      case 'Accuracy': {
        this.hoveredElement.title = ele;
        this.hoveredElement.text = this.helpText.accuracy;
        break;
      }
      case 'Completeness': {
        this.hoveredElement.title = ele;
        this.hoveredElement.text = this.helpText.completeness;
        break;
      }
      case 'Conformity': {
        this.hoveredElement.title = ele;
        this.hoveredElement.text = this.helpText.conformity;
        break;
      }
      case 'Uniqueness': {
        this.hoveredElement.title = ele;
        this.hoveredElement.text = this.helpText.uniqueness;
        break;
      }
      case 'Consistency': {
        this.hoveredElement.title = ele;
        this.hoveredElement.text = this.helpText.consistency;
        break;
      }
      default: {
        this.hoveredElement.title = 'Accuracy';
        this.hoveredElement.text = this.helpText.accuracy;
        break;
      }
    }
  }

  hoveredColor(per) {
    if (per === null) {
      this.hoveredElement.color = 'gray';
    } else if (per <= 74) {
      this.hoveredElement.color = 'red';
    } else if (per > 74 && per <= 94) {
      this.hoveredElement.color = 'orange';
    } else if (per > 94) {
      this.hoveredElement.color = 'green';
    }
  }

  getColor(value, type) {
    if (type === 'bar') {
      if (value === null) {
        return 'na-perst';
      } else if (value <= 74) {
        return 'red';
      } else if (value > 74 && value <= 94) {
        return 'orange';
      } else if (value > 94) {
        return 'green';
      }
    } else if (type === 'text') {
      if (value === null) {
        return 'na-perst-text';
      } else if (value <= 74) {
        return 'low-perst-text';
      } else if (value > 74 && value <= 94) {
        return 'mid-perst-text';
      } else if (value > 94) {
        return 'high-perst-text';
      }
    }
  }
  annotate(){
    this.columnStatus = 'a';
    this.configDqRules = false;

  //   $(document).ready( function () {
  //     $('.tableviewColms').DataTable({
  //       bAutoWidth: false,
  //      bSort: false,
  //     });
  // } );
  this.getAnnotations();
    // const table: any = $$(".tableviewColms");
    // this.dataTable = table.DataTable({
    //   bAutoWidth: false,
    //   bSort: false,
    // });
  }

  onRate(value){
    this.annoteDetails.rating = value;
  }

  newAnnotation = [];
  saveAnnote(){

      if (this.annoteDetails.type == '0') {
        this.toastr.warning('Please select Annotation Type.');
        // alert('Please select Annotation Type.');
        return;
      }
      if (this.annoteDetails.text == '') {
         this.toastr.warning('Please add Annotation Text.');
        // alert('Please add Annotation Text.');
        return;
      }
     
      this.newAnnotation.push({
         Type: (this.assetType == 'File' || this.assetType == 'Table' || this.assetType == 'View')?'T':this.assetType[0] ,
         Asst_id: this.assetId,
        Clbrtn_id: this.annoteDetails.type,
        Clbrtn_txt: this.annoteDetails.text,
        usr_id: this.userId,
        rating: this.annoteDetails.rating,
         assetName: this.assetName
      });
      const data = { collaboration_data: this.newAnnotation };
      const params = { params: data };
      // this.loader.show();
      this.service.post(this.service.addAnnotation_ep, params).subscribe((result) => {
         this.toastr.success('Annotation Saved Successfully.')
        // alert('Annotation Saved Successfully.');
        this.newAnnotation = [];
        this.annoteDetails.type = '0';
        this.annoteDetails.text = '';
        this.annoteDetails.rating = '0';
        $('#myModalAnn').modal('hide');
        this.getAnnotations();
        this.onRate(0);    
        this.loader.hide();
      }, err => {
        
        this.loader.hide();
      });
  
    

    
  }

  // resetAnnoteDetails(){
  //   this.annoteDetails.type = '';
  //   this.annoteDetails.text = '';
  //   this.annoteDetails.rating = 0;
  // }

  // filterAnnote(){
  //   this.storedAnnote = this.storedAnnoteCopy.filter(x => x.type_id == this.annoteTypeValue);
  // }

  check(datavalue,ratingvalue){
    if(datavalue == ratingvalue){
      return true;
    }else{
      return false;
    }
  }

  annotationTypes = [];
  getAnnotationTypes() {
    const data = {};
    const assetParams = { params: data };
    if (this.dataService.annotationTypes.length === 0) {
      this.service.post(this.service.getAnnotationTypes_ep, assetParams).subscribe((result) => {
        if (result !== '' || result !== undefined) {
          this.annotationTypes = result[0].array_to_json;
          this.dataService.annotationTypes = result[0].array_to_json;
        }
      }, err => {
        console.log(err);
      });
    } else {
      this.annotationTypes = this.dataService.annotationTypes;
    }
  }

  getAnnotations() {
    const data = { 
      Type: (this.assetType == 'File' || this.assetType == 'Table' || this.assetType == 'View')?'T':this.assetType[0], asset_id: this.assetId 
    };
    const assetParams = { params: data };
    this.loader.show();
    this.service.post(this.service.getAnnotations_ep, assetParams).subscribe((result) => {

      if (result !== '' || result !== undefined) {
        // this.allannotations = new MatTableDataSource(result);
      
        this.storedAnnote = result[0].array_to_json == null ? []: result[0].array_to_json;
        // this.annotations = result;
        // this.showAnnotations = true;

      //    $(document).ready( function () {
      //     $('.tableviewColms').DataTable({
      //       bAutoWidth: false,
      //      bSort: false,
      //     });
      // });
      }
      this.loader.hide();
    }, err => {
      // this.showAnnotations = true;
      this.loader.hide();
      // this.toast.showerror('Please Try Again.');
    });

   
  }

  columnDetails: any;
  getObjDetails = (objId) => {
    this.loader.show();
    this.service
      .post(this.service.cdeDqAssetDetails, {
        type: "T",
        assetId: objId,
        userId: this.userId,
      })
      .subscribe(
        (result) => {
          this.loader.hide();
          if (result.table.length > 0) {
            // this.tableDetails = result.table[0];
            this.columnDetails = result.columns;
            // this.showDetails = true;
            // console.log(this.tableDetails);
            // this.stepper = new Stepper(document.querySelector("#stepper1"), {
            //   linear: true,
            //   animation: true,
            // });

            setTimeout(() => this.getCDERulesForObj(), 0);
          } else {
            this.toastr.info("No Data Found!");
          }
        },
        (err) => {
          this.loader.hide();
           this.toastr.error("Got error!. While getting details.");
        }
      );
  };

  getCDERulesForObj() {
    this.loader.show();
    this.service
      .post(this.service.getCDEDqRulesByObj, {
        objId: this.assetId , //this.objId,
        userId: this.userId,
      })
      .subscribe(
        (result) => {
          this.columnDetails.forEach((e) => {
            e.rules = [];
            e.obj_prpt_id = e.id;
          });

          if (result.length > 0) {
            const _appliedRules = result;
            console.log(_appliedRules);

            for (let i = 0; i < this.columnDetails.length; i++) {
              const ele1 = this.columnDetails[i];
              for (let j = 0; j < _appliedRules.length; j++) {
                const ele2 = _appliedRules[j];
                if (ele1.id === ele2.obj_prpt_id) {
                  this.columnDetails[i].rules = ele2.rules || [];
                }
              }
            }
            console.log(this.columnDetails);
          } else {
             this.toastr.info("No Data Found!");
          }
          this.loader.hide();

        //   $(document).ready( function () {
        //     $('.tableviewColms1').DataTable({
        //       bAutoWidth: false,
        //      bSort: false,
        //     });
        // });

               // const table: any = $$(".tableviewColms1");
          // this.dataTable = table.DataTable({
          //   bAutoWidth: false,
          //   bSort: false,
          // });
          
        },
        (err) => {
          this.loader.hide();
           this.toastr.error("Got error!. While getting rules.");
        }
      );
  }

  dqSource: any;
  configDqRules = false;
  dqRulesEdit(itm) {
    this.dqSource = {
      obj_id: this.tableDetails.id,
      obj_prpt_id: itm.id,
      obj_prpt: itm,
      rul_type: "CDE",
    };
    this.configDqRules = true;
    this.columnStatus = '';
  }


  finalRules(eve) {
    this.getStreamingRulesForObj();
  }

  getStreamingRulesForObj() {
    this.loader.show();
    this.service
      .post(this.service.getStreamingDqRulesByObj_ep, {
        objId: this.assetId, //this.objId,
        userId: this.userId,
      })
      .subscribe(
        (result) => {
          // alert('rr')
          this.columnDetails.forEach((e) => {
            e.rules = [];
            e.obj_prpt_id = e.id;
          });

          if (result.length > 0) {
            const _appliedRules = result;
            console.log(_appliedRules);

            for (let i = 0; i < this.columnDetails.length; i++) {
              const ele1 = this.columnDetails[i];
              for (let j = 0; j < _appliedRules.length; j++) {
                const ele2 = _appliedRules[j];
                if (ele1.id === ele2.obj_prpt_id) {
                  this.columnDetails[i].rules = ele2.rules || [];
                }
              }
            }
            console.log(this.columnDetails);
          } else {
            this.toastr.info("No Data Found!");
          }
          this.loader.hide();
        },
        (err) => {
          this.loader.hide();

           this.toastr.error("Got error!. While getting rules.");
        }
      );
  }

  showDqRules($event) {
    this.configDqRules = $event;
    this.columnStatus = 'y';
  }

  selectedRule ={
    rul_nm: '',
    ruleDefValuesLabel: '',
    rule_def: '',
    values: '',
    resolvedValue: ''
  };
  showRulevalues(itm){
    const defVla = itm.rule_def.match(/{{\S+/g);
      console.log('**********')
      console.log(defVla)
      const values = itm.tfm_rul_txt.split('|');
      let resolved_rul = itm.rule_def;
      for (let i = 0; i < defVla.length; i++) {
        const ele = defVla[i].replace(')','');
        const val = values[i];
        console.log(ele);
        console.log(val);

        resolved_rul = resolved_rul.replace(ele,val)
        console.log(resolved_rul)
      }

      this.selectedRule.resolvedValue = resolved_rul;

      if (defVla.length > 0) {
        this.selectedRule.ruleDefValuesLabel = defVla
          .join(" | ")
          .replace(/[^a-zA-Z 0-9|.]+/g,'');
      } else {
        this.selectedRule.ruleDefValuesLabel  = defVla;
      }
      this.selectedRule.rule_def =  itm.rule_def;
      this.selectedRule.values =  itm.tfm_rul_txt;
      this.selectedRule.rul_nm =  itm.rul_nm;
      $("#modalValues").modal({
        show: true,
        backdrop: "static",
        keyboard: false,
      });


    // $$("#modalValues").modal("hide");
    console.log(itm)
  }

  stars: number[] = [1, 2, 3, 4, 5];
selectedValue: number = 0;

countStar(star) {
    this.selectedValue = star;
    this.annoteDetails.rating = star;
  }

addClass(star) {
   console.log("star", star); 
   console.log("selectedvalue", this.selectedValue);
   let ab = "";
   for (let i = 0; i < star; i++) {
     console.log("star i", star);
     ab = "starId" + i;
     document.getElementById(ab).classList.add("selected");
   }
}
removeClass(star) {
   console.log("removestar", star);
   let ab = "";
  for (let i = star-1; i >= this.selectedValue; i--) {
     console.log("star i", star);
     ab = "starId" + i;
     document.getElementById(ab).classList.remove("selected");
   }
}

openAnnote(){
  $('#myModalAnn').modal('show');
  this.annoteDetails.rating = '0';
  this.annoteDetails.text = '';
  this.annoteDetails.type = '0';
  this.selectedValue = 0;
  // this.onRate('0');
}

goToColDet(id){
  this.router.navigate(['/catalog/assetDetails/Column/', id, true], { queryParams: { view: 'details', objId: this.assetId } });
}
}
