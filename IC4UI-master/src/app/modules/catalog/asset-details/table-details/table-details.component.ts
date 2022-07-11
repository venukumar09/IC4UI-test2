import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { DataService } from 'src/app/shared/services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as $$ from 'jquery';
declare var $:any;
@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.scss']
})
export class TableDetailsComponent implements OnInit {
  showDqEdit = false;
  dqSource = {
    obj_id: '',
    obj_prpt_id: '',
    obj_prpt: []
  }
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
  editabletableDetails: any;
  coldtl: any;
  columnStatus: string;
  columnDetails: any;
  screenName = 'Asset Details';
  // screenPermissions = [];

  // todo get these from server(maybe from config  file)
  helpText = {
    'accuracy': `Data element values are properly assigned or valid.
                 Eg: Name field has numbers and Gender field has invalid values instead of M,F etc.`,
    'completeness': `Data element is always required to be populated.`,
    'consistency': `Data element should not give conflicting information and should be consistent across systems.`,
    'conformity': `To ensure that the data follows the set of standard definitions and format.`,
    'uniqueness': `To ensure that each data record is distinct and unique, and there is no data duplication reported.`
  };
  relatedJobs_Src: any = [];
  relatedJobs_Tar: any = [];
  tableDetailsTableauUrl: any;
  hoveredElement = {
    title: '',
    text: '',
    color: 'gray'
  };
  srcObjects:any = [];
  isProfiling: boolean;
  constructor(private service:ApiService,
    private dataservice: DataService,
    private route: ActivatedRoute,
    private locStorage:LocalStorageService,
    private loader: NgxSpinnerService,
    private toastr: ToastrService,
    private dataService: DataService,) { }

  ngOnInit() {
    this.srcObjects = [];
    this.columnStatus='n'
    this.userId = this.locStorage.retrieve('userId');
    this.roleId = this.locStorage.retrieve('roleId');
    this.orgId = this.locStorage.retrieve('orgId');
    // const data: any = this.locStorage.retrieve('urls');
    
    // this.screenPermissions = this.security.getscreenpermissions(this.screenName);

    const data: any = this.locStorage.retrieve('urls');
    // this.tableDetailsTableauUrl = data.tableau_table_details;
    // default event for DQ score
    console.log("dqscore1")
    // this.screenPermissions = this.security.getscreenpermissions(this.screenName);
    // getting attribute id from route.
    this.route.params.subscribe((params: ParamMap) => {
      console.log("dqscore2")
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
    this.hoveredOn('');
  }
  colSta(){
    this.columnStatus='y';
  }
  tablSta(){
    this.columnStatus='n';
  }
  previewData(){
    this.columnStatus='p';
    console.log(this.assetId)
  }
  dqRulesEdit(ele) {
    this.dqSource = {
      obj_id: this.tableDetails.id,
      obj_prpt_id: ele.id,
      obj_prpt: ele
    };
    this.showDqEdit = true;
  }
  // Dq Score Color
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


  loadInitData(){
    const values = {
      type: 'T',
      assetId: this.assetId,
      userId: this.userId
    }

      
    this.service.post(this.service.assetDetails_ep, values).subscribe((result) => {
      if (result.table.length > 0) {
        this.tableDetails = result.table[0];
        this.editabletableDetails=result.table[0]
        this.columnDetails = result.columns;
        this.coldtl=result.columns
        this.srcObjects = this.tableDetails.srcobjs || [];
        this.dataservice.assetFullDetails = this.tableDetails;
            this.relatedJobs_Src = this.tableDetails.relatedJobs_Src;
            this.srcObjects = this.tableDetails.srcobjs || [];
            this.relatedJobs_Tar = this.tableDetails.relatedJobs_Tar;
            this.showDetails = true;
            this.hoveredColor(this.tableDetails.accrPct);
        // this.topUsers = result.topUsers;
        this.assetName = this.tableDetails.assetName;
        this.assetType = this.tableDetails.assetType;
        if (this.tableDetails.rulesApplied !== null && this.tableDetails.rulesApplied !== 0) {
          // this.tableDetails.rulesApplied = this.tableDetails.rulesApplied.split(',');
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
        this.showDetails = true;
        this.noDataFound = true;
        // this.toast.showerror('No Data Found.');
        this.showDetails = true;
      let assetname = this.tableDetails.assetName
      this.assetName = this.tableDetails.assetName
      const url = this.tableDetailsTableauUrl + assetname + '&:display_count=no&:showVizHome=no'
      // this.iframeURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }
    // }, err => {
    //   this.showDetails = true;
    //   // this.toast.showerror('Please try again.');
    });

    this.getAnnotationTypes();
    
  }
//   backtosources(){
//     this.childEvent.emit('this is a test');
// }
  showDqRules($event) {
    this.showDqEdit = $event

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
  updateConnection(){
    this.service.post(this.service.assetDetails_ep, this.editabletableDetails).subscribe((result) => {
      alert("successfully updated")
    });
  }
  configDqRules = false;
  storedAnnote = [];
  assetType: any;
  newAnnotation = [];
  annoteDetails = {
    type: '0',
    text: '',
    rating: '0',
  };
  annotationTypes = [];
  annotate(){
    this.columnStatus = 'a';
    this.configDqRules = false;
    this.getAnnotations();
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
      
        this.storedAnnote = result[0].array_to_json;
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
onRate(value){
  this.annoteDetails.rating = value;
}

check(datavalue,ratingvalue){
  if(datavalue == ratingvalue){
    return true;
  }else{
    return false;
  }
}

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
openAnnote(){
  $('#myModalAnn').modal('show');
  this.annoteDetails.rating = '0';
  this.annoteDetails.text = '';
  this.annoteDetails.type = '0';
  this.onRate('0');
}

dataRules = [];
showAddedRules(rules){
  $('#myModalDq').modal('show');
  this.dataRules = rules;


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

  
}
