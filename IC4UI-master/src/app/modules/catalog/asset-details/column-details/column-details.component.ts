import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import * as $$ from 'jquery';
declare var $:any;
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../../shared/services/data.service';


@Component({
  selector: 'app-column-details',
  templateUrl: './column-details.component.html',
  styleUrls: ['./column-details.component.scss']
})
export class ColumnDetailsComponent implements OnInit {
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
  columnDetails: any={};
  dataSensitivity: { pii: any; phi: any; pci: any; conf: any; };
  assetName: any;
  topUsers: any;
  editabletableDetails: any;

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

  columnStatus: String;
  annoteDetails = {
    type: '0',
    text: '',
    rating: '0',
  }

  annoteTypeValues= [
    {id:1, name: 'Comment'},
    {id:2, name: 'Issue'}
  ];

  storedAnnote :any = [];
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  assetType: any;
  newAnnotation = [];

  constructor(private service:ApiService,
    private route: ActivatedRoute,private locStorage:LocalStorageService,
    private loader: NgxSpinnerService,
    private toastr: ToastrService,
    private dataService: DataService,private router:Router,) { }

  ngOnInit() {
    this.columnStatus = 'd';
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
      type: 'C',
      assetId: this.assetId,
      userId: this.userId
    }
    // var result={
    //   "details": [
    //     {
    //       "id": "04811c2bebd7501f39b3edc4f4ed5d7d",
    //       "assetName": "Access_key_ID",
    //       "dsnName": "s3_connection",
    //       "dataPlatform": "S3",
    //       "schema": "gathi-catalog/gathi_ins/accessKeys.csv",
    //       "tableName": "accessKeys",
    //       "assetType": "column",
    //       "description": "",
    //       "usedInApplication": 0,
    //       "usedInReport": 0,
    //       "typeOfProfiling": 0,
    //       "maxRowsToScan": 0,
    //       "profileFrequency": 0,
    //       "loadFrequency": 0,
    //       "attributeLength": "20",
    //       "searchCount": 0,
    //       "dataTypeName": "String",
    //       "dataTypeScale": null,
    //       "dataTypePrecision": null,
    //       "dataFormatText": null,
    //       "defaultValueText": null,
    //       "lastLoadedDate": 0,
    //       "lastModifiedDate": null,
    //       "personallyIdentifiedInfo": null,
    //       "protectedHealthInfo": null,
    //       "paymentCardInfo": null,
    //       "confidential": null,
    //       "domainNames": null,
    //       "rulesApplied": null,
    //       "businessName": "Access_key_ID",
    //       "isNull": " ",
    //       "isPK": " ",
    //       "isFK": " ",
    //       "totalRows": null,
    //       "distinctCount": null,
    //       "nullCount": null,
    //       "nonUniqueCount": null,
    //       "maxVal": null,
    //       "minVal": null,
    //       "meanval": null,
    //       "standardDeviation": null,
    //       "accrPct": null,
    //       "cmpltPct": null,
    //       "cnfmPct": null,
    //       "uniqPct": null,
    //       "cnsPct": null,
    //       "crtLevel_1": null,
    //       "crtLevel_2": null,
    //       "crtLevel_3": null
    //     }
    //   ],
    //   "topUsers": [],
    //   "relatedTerms": []
    // }
    this.service.post(this.service.assetDetails_ep, values).subscribe((result) => {
      console.log(result.details.length)
      if (result.details.length > 0) {
        // result.details[0].accrPct = 20;
        // result.details[0].cmpltPct = 40;
        // result.details[0].cnfmPct = 60;
        // result.details[0].uniqPct = 80;
        // result.details[0].cnsPct = 100;
        this.columnDetails = result.details[0];
        this.editabletableDetails=result.details[0];
        console.log(this.columnDetails)
        this.topUsers = result.topUsers;
        this.assetName = this.columnDetails.assetName;
        this.assetType = this.columnDetails.assetType;
        if (this.columnDetails.rulesApplied !== null && this.columnDetails.rulesApplied !== 0) {
          // this.columnDetails.rulesApplied = this.columnDetails.rulesApplied.split(',');
        } else {
          this.columnDetails.rulesApplied = [];
        }

        this.dataSensitivity = {
          pii: this.columnDetails.personallyIdentifiedInfo,
          phi: this.columnDetails.protectedHealthInfo,
          pci: this.columnDetails.paymentCardInfo,
          conf: this.columnDetails.confidential
        };

        // this.hoveredColor(this.columnDetails.accrPct);
        this.showDetails = true;
      } else {
        // this.showDetails = true;
        this.noDataFound = true;
        // this.toast.showerror('No Data Found.');
      }
    // }, err => {
    //   this.showDetails = true;
    //   // this.toast.showerror('Please try again.');
    });

    this.getAnnotationTypes();
  }
  updateConnection(){
    this.service.post(this.service.assetDetails_ep, this.editabletableDetails).subscribe((result) => {
      alert("Succefully Updated")
    });
  }

   // Change text based on hoverd dq
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

  // Set color based on hoverd dq
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

  details(){
    this.columnStatus = 'd';
  }

  annotate(){
    this.columnStatus = 'a';
    this.getAnnotations();
  }
  leverage(){
    this.columnStatus = 'l';
  }

  
  openAnnote(){
    $('#myModalAnn').modal('show');
    this.annoteDetails.rating = '0';
    this.annoteDetails.text = '';
    this.annoteDetails.type = '0';
    this.selectedValue = 0;
  
  }

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
           
        this.loader.hide();
      }, err => {
        
        this.loader.hide();
      });
  
    

    
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

  goToTable(){
    localStorage.setItem('fromcolumn','y');
    this.router.navigate(['/catalog/assetDetails/File/', this.objId, true], { queryParams: { view: 'details' } });
  }
}
