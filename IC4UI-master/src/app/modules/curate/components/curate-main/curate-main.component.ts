import { Component, OnInit } from '@angular/core';
import { CdkDragDrop,moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import * as _ from "underscore";
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery';
import * as d3 from '../../../../../../node_modules/d3';
import {hierarchy, tree } from 'd3-hierarchy';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CurateScheduleComponent } from '../curate-schedule/curate-schedule.component';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
//import * as Swal from 'sweetalert2/dist/sweetalert2.js';
import { InputModalComponent } from '../input-modal/input-modal.component';
// import { SocketServiceService } from 'src/app/shared/services/socket-service.service';
// import { SocketServiceService } from 'src/app/shared/services/socket-service.service';

@Component({
  selector: 'app-curate-main',
  templateUrl: './curate-main.component.html',
  styleUrls: ['./curate-main.component.scss']
})
export class CurateMainComponent implements OnInit {

  process = [];
  //job = [];
  jobdata = {
    jobName: '',
    selectedTempltId:"",
    process : [],

  };
  isSource : boolean = false;
  isTarget : boolean = false;
  job = {
    jobName: '',
    selectedTempltId: '',
    selectedTempltName: '',
    slaStartTime: '00:00:00',
    slaEndTime: '13:00:00',
    slaOffsetDays: '0',
    frequency: '',
    inputObj: '',
    outputObj: '',
    scheduleName: '',
    calenderName: '',
    predccondition: '',
    effectiveStartDate: '',
    scheduleeffectiveStartDate: '',
    dragindicator: '0',
    predccondtype: '',
    joboutcondition: '',
    criticaljobindicator: 'N',
    finanpenalityindicator: 'N',
    createDagIndicator: 'Y',
    jobprioritynumber: '',
    jobparselineagetext: '',
    maxrunalaramsec: '',
    minrunalaramsec: '',
    scheduleStartTime: '00:00:00',
    timezone: '',
    suppgroupemail: '',
    scheduleCalenderName: '',
    nextBsndayIndicator: '',
    cronExpression: '',
    isCronExpression: 'N',
    impact : 'medium',
    supportGroup : '',
    ticketing_system_type : 'gathi'
  }
  selectedProcess;
  jobName = "";
  pcs_list = [];
  platforms = [];
  processByType = [];
  datasourceList = [];
  objList= [];
  dblist = [];
  lobs = [];
  apps = [];
  lob = [];
  app = "";
    // view flags
    viewSource = true;
    viewTarget = false;
    viewJob = false;
    viewstatus = false;
  sourceType = "";
  objType = "";
  showObjList = false;
  isChecked = false;
  newTemplateProcess=[];
  selObj = "";
  basePath;
  pcsDetails : any=[];
  isEditMode = false;
  selSource="";
  selTarget="";
  selProcessing="";
  selHouseKeeping="";
  selExtraction="";
  selService="";
  selPlatform = "";
  selDatasource = "";
  selDB = "";
  selObject = "";
  searchObj = "";
  objName = "";
  isMapper = false;
  org_id;
  org_nm;
  isGroupOpen = false;
  tempPcsGroup = [];
  cur_components : any = {
    source : {
      isRegisterd : false,
      obj_id : "",
      obj_nm : "",
      OUT_PATH: "",
      pltfrm : "",
      dat_src: "",
      database: "",

    },
    services : [],
    target : {
      isRegisterd : false,
      obj_id : "",
      obj_nm : "",
      OUT_PATH: "",
      pltfrm : "",
      dat_src: "",
      database: "",
    }

  }
  isSourceTarget: boolean = false;
  isGraph: boolean;
  isMaximize : boolean = false;
  finalTreeJSON : any;
  urlService_: string;
  colors = ['#337ab7','#5cb85c','#f0ad4e','#4ab1eb','#9467bd'];
  margin: {
    top : 0,
    right : 0,
    bottom : 100,
    left : 0
   };
  width: number;
  height: number;
  tooltip: { width : 150, height : 40, textMargin : 5 };
  rectNode: { width : 140, height : 60, textMargin : 5 };
  nodeGroup: any;
  linkGroup: any;
  nodeGroupTooltip: any;
  defs: any;
  i: number = 0;
  duration: number = 750;
  mousedown: any;
  root:any;
  source = {
    cloneObject: '',
    obj_id: '',
    obj_phy_nm: '',
    obj_type_nm: '',
    obj_db_pltfm_nm: '',
    obj_schm_nm: '',
    ln_of_bsn_id: '',
    ln_of_bsn_nm: '',
    apn_id: '',
    apn_nm: '',
    site_id: '',
    dat_src_nm: '',
    sourceLocation: '',
    lnd_file_path_txt: '',
    lnd_file_nm: '',
    sub_area_nm: '',
    dl_raw_site_id: '',
    dl_raw_loc_txt: '',
    dl_raw_obj_type_nm: '',
    prflg_zn_site_id: '',
    prflg_zn_loc_txt: '',
    delimitterCode: '',
    rec_lst_updt_by_id: '',
    dl_raw_fmt_type_nm: '',
    org_id: '',
    obj_dlvr_mode_ind: '',
    removeHeaderIndicator: '',
    obj_fmt_type_nm: '',
    file_dlmt_cd: '',
    isCdc:false,
    is_public : false
  }

  target = {
    obj_id: '',
    obj_phy_nm: '',
    obj_type_nm: '',
    obj_db_pltfm_nm: '',
    obj_schm_nm: '',
    obj_loc_path_txt: '',
    obj_lyr_nm: '',
    ln_of_bsn_nm: '',
    ln_of_bsn_id: '',
    site_id: '',
    dat_src_nm: '',
    apn_id: '',
    apn_nm: '',
    crtd_by_id: '',
    obj_ownr_id: '',
    prgm_id: '',
    prj_id: '',
    sub_apn_id: '',
    sub_area_nm: '',
    org_id: '',
    obj_desc_txt: '',
    is_public: 'N'
  }
  previous: any;  // previous page
  clone = {
    job_id: '',
    source_obj_id: '',
    target_obj_id: ''
  };
  roleId: any;
  userId: any;
  sourceDetails: any = [];
  sourceAttributes = [];
  finalSourceAttributes = [];
  targetAttributes = [];
  targetAuditClmns = [];
  uniqueTargetDbPlatforms = [];
  convertedDataTypes: any;

  actualSubjectAreas = [];
  subjectAreas = [];
  finalLob = [];
  applications = [];
  finalApplications = [];
  finalTarApplications = [];
  sites = [];
  jobs = [];
  uniqueJobs = [];
  finalJobs = [];
  organizations = [];

  editLobs: boolean;
  editAplications: boolean;
  isLoading = false;
  defaultValues: any = [];  // default values for source and target from service
  deliveryMode = 'push'; // push - pull
  allCalenderNames = []
  uniqueCalenderNames = []
  calenderNames = []

  allScheduleNames = []
  uniqueScheduleNames = []
  scheduleNames = []

  selectedTemplate = '';
  effectiveStartDate: any = ''
  schffectiveStartDate: any;
  filterScheduleNames = [];
  overideProcessParmText = {}

  showAirflow = false;
  isSchedule: boolean = false;
  isProcess: boolean = false;
  tmplName: string;
  isTmplInput : boolean = false;
  alljobTemplates: any=[];
  jobTemplates: any[];
  uniqueJobTemplates = [];
  isNewTemplate: boolean;
  sourceBlock : boolean = true;
  profilingBlock : boolean = false;
  activeNavBlock: string = "source";
  file_found : boolean = false;
  iframeURL: SafeResourceUrl;
  airflowurl:SafeResourceUrl;
  isJobLog = false;
  isAirflow : boolean = false;
  airflow_url: any;
  dagUrl: any;
  currentObject: any;
  targetAdded: boolean;
  sourceAdded: boolean;
  constructor(private route: ActivatedRoute, private sanitizer : DomSanitizer, private router: Router,public dialog: MatDialog, private service : ApiService,private storage : LocalStorageService, private loader : NgxSpinnerService) {
    this.org_id = this.storage.retrieve('orgid');
    this.org_nm = this.storage.retrieve('orgName');
    this.roleId = this.storage.retrieve('roleId');
    this.userId = this.storage.retrieve('userId');


   }

  ngOnInit() {

    // this.process = [];
    // this.webSocket.listen('message').subscribe((data)=>{
    //   console.log(data);
    // })
    const data: any = this.storage.retrieve('urls');
    this.dagUrl = data.airflow_dag;
    this.airflow_url = data.airflow;
    //  this.isAirflowairflowurl = true;
     this.airflowurl = this.sanitizer.bypassSecurityTrustResourceUrl(this.airflow_url);
    this.getPcsList();
    this.getOrgs();
    //this.getLOBList();
    this.getPlatforms();
    this.getCalenderNames();
     this.getScheduleNames();
     this.getJobTemplates();
    //this.basePath = this.org_nm + '_gathi/rawzone/';

  }

  drop(event: CdkDragDrop<string[]>) {
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // } else {
    //   transferArrayItem(event.previousContainer.data,
    //                     event.container.data,
    //                     event.previousIndex,
    //                     event.currentIndex);
    // }

      //console.log(this.process);
      moveItemInArray(this.process, event.previousIndex, event.currentIndex);
      this.setInpathOutpath()
      console.log(this.process);
  }

  editProcess(pcs){
    this.isEditMode = true;
    console.log(pcs);
    let pcsarr = _.where(this.pcs_list,{pcs_id : pcs.pcs_id})
    this.pcsDetails = pcs.params;
    console.log(this.pcsDetails);
  }
  cancel(){
    this.isEditMode = false;
  }


  onSourceChange(){
    console.log(this.selSource);
    this.process.push(this.selSource)
  }
  onTargetChange(){
    console.log(this.selTarget);
    // let pcs = this.process.filter((val,i)=>{if(this.selService == val.pcs_id)return val})
    // this.process.push(pcs[0])
  }
  onServiceChange(evt,selpcs){
    this.selService = selpcs.pcs_id;
   if(this.isSourceAdded()){
      console.log(this.selService);
      if(this.selService && this.selService.length){
      let pcs : any= this.processByType.filter((val,i)=>{if(this.selService == val.pcs_id) return val})[0]
        let obj = {
          pcs_nm : pcs.pcs_nm,
          pcs_id:pcs.pcs_id,
          params : _.where(this.pcs_list,{pcs_id : pcs.pcs_id})
      }
      console.log(obj);
      let parm = {
        pcs_nm : pcs.pcs_nm,
        pcs_id:pcs.pcs_id,
        parm_nm_txt : 'IN_PATH',
        parm_val_txt :  '',
        parm_type: "Mandatory"

    }
    let outParm = {
      pcs_nm : pcs.pcs_nm,
      pcs_id:pcs.pcs_id,
      parm_nm_txt : 'OUT_PATH',
      parm_val_txt :  this.basePath + "/" + pcs.pcs_nm.toLowerCase() +'/$BUS_DT',
      parm_type: "Mandatory"

  }
      if(this.process.length){

        let pcs  = _.findWhere(obj.params, {
          parm_nm_txt: 'IN_PATH'
        })
        if(pcs){

          pcs.parm_val_txt = this.process[this.process.length-1].OUT_PATH;
          parm = pcs;
        }
        else
          {
            parm.parm_val_txt =  this.process[this.process.length-1].OUT_PATH;
            obj.params.push(parm)
          }

        //obj.params[obj.params.length-1].IN_PATH = this.process[this.process.length-1].OUT_PATH || '';
      }
      else{
        console.log(_.findWhere(obj.params, {
          parm_nm_txt: 'IN_PATH'
        }))
        let pcs  = _.findWhere(obj.params, {
          parm_nm_txt: 'IN_PATH'
        })
        if(pcs){

          pcs.parm_val_txt = this.cur_components.source.OUT_PATH;
          parm = pcs;
        }
        else
          {
            parm.parm_val_txt =  this.cur_components.source.OUT_PATH;
            obj.params.push(parm)

          }
        //parm.parm_val_txt =  this.cur_components.source.OUT_PATH;
      }
      console.log(parm)

      let outPathIndex = _.findIndex(obj.params,{parm_nm_txt:'OUT_PATH'});
      if(outPathIndex == -1){

        obj.params.push(outParm)
      }
      else{
        obj.params[outPathIndex].parm_val_txt = this.basePath + '/' + pcs.pcs_nm.toLowerCase() + '/$BUS_DT';
      }

      obj = JSON.parse(JSON.stringify(obj));
      this.process.push(obj)
    }
   }
   else{

     alert('Please configure Source');

     this.selService = "";
     evt.target.value = '';
     console.log(this.selService)
   }
  }

  onProcessingChange(){
    console.log(this.selProcessing);
    this.process.push(this.selProcessing)
  }
  onExtractionChange(){
    console.log(this.selExtraction);
    this.process.push(this.selExtraction)
  }
  onHouseKeepingChange(){
    console.log(this.selHouseKeeping);
    this.process.push(this.selHouseKeeping)
  }

  // Get Process List by organization
  getPcsList(){
    this.loader.show();
    let params = {
      org_id : this.org_id
    }
    this.service.post(this.service.getPcsParams,params).subscribe(res=>{
      this.pcs_list = res
      var data = _.uniq(_.pluck(this.pcs_list, 'param_grp_nm'));
      console.log(data);
      var parr = [];
      parr = this.setProcessByParamType(res, false);
      this.processByType = parr;
      console.log(this.processByType)
      this.loader.hide();
    },
    err=>{
      this.loader.hide();

    })
  }

   //format or structurize process list by param type
   setProcessByParamType(list, addOvrdParams) {
    let pcsnames = _.uniq(_.pluck(list, 'pcs_nm'));
    let pArray = [];
    for (var i = 0; i < pcsnames.length; i++) {
      //let pcs :any= {pcs_nm:"",pcs_id:"",pcs_exe_cmd_txt:"",default:[],mandatory:[],overriden:[]};
      let pcs: any = { pcs_nm: "", pcs_id: "", pcs_exe_cmd_txt: "", mandatory: [], optional: [], overriden: [] };

      pcs.pcs_nm = pcsnames[i];
      pcs.mandatory = _.where(list, { parm_type: 'Mandatory', pcs_nm: pcsnames[i] })
      pcs.optional = _.where(list, { parm_type: 'Optional', pcs_nm: pcsnames[i] })
      if (addOvrdParams)
        pcs.overriden = _.where(list, { parm_type: 'Overriden', pcs_nm: pcsnames[i] })
      if (pcs.mandatory.length) {
        pcs.pcs_id = pcs.mandatory[0].pcs_id;
        pcs.pcs_type_nm = pcs.mandatory[0].pcs_type_nm;
        pcs.pcs_exe_cmd_txt = pcs.mandatory[0].pcs_exe_cmd_txt;
        pcs.pcs_desc_txt = pcs.mandatory[0].pcs_desc_txt;
        pArray.push(pcs)
      }
    }
    return pArray;
  }

  //triggerd when param value is changed
  parmChange(obj, index, type) {
    obj['isOverriden'] = true;
    let i = _.findIndex(this.newTemplateProcess, { pcs_id: obj.pcs_id });
    this.newTemplateProcess[i][type][index] = obj;
    console.log(this.newTemplateProcess[i][type][index]);
    console.log(obj);
  }

  // Get Platforms list by organization and platform type.
  getPlatforms(){
    this.loader.show();
    let req={
      org_id : this.org_id,
      pltfm_type : "db"
    }
    this.service.post(this.service.getPlatformsList,req).subscribe(res=>{
      this.platforms = res;
      this.loader.hide();
    },
    err=>{
      this.loader.hide();
    })
  }

  // Get selected process details.
  getPcsDetails(id){
    this.loader.show();
    let req={
      id:id
    }

    this.service.post(this.service.getPcsParams,req).subscribe(res=>{
      console.log(res);
      this.loader.hide();
    },
    err=>{
      this.loader.hide();
    })

  }

  //Get lob list by organization
  getLOBList(){
    this.loader.show();
    let req={
      org_id : this.source.org_id
    }
    this.service.post(this.service.get_lobs,req).subscribe(res=>{

    this.lobs = res;
    this.finalLob = this.lobs.filter(i => i.org_id === this.source.org_id);
    this.loader.hide();
    //this.organizationChange();
    },err=>{
    this.loader.hide();
    })
  }

// on Lob selection change
onLOBChange(type,query){
  //this.cur_components.source.lob = lob.ln_of_bsn_nm;

  //this.getAppsList();
}
//Get Application list based on selected lob and organization.
  getAppsList(lob){
    this.loader.show();
    let req={
      org_id : this.source.org_id,
      lob_id : lob
    }
    this.service.post(this.service.get_applications,req).subscribe(res=>{

    this.apps = res;
    this.applications = res;
    //this.organizationChange();
    this.finalApplications = this.applications.filter(i => i.org_id === this.source.org_id);
    this.loader.hide();

    },err=>{
      this.loader.hide();

    })
  }

  // On application selection change
  onAppChange(app){
    this.cur_components.source.app = app.app_nm;
  }
  //on Platfrom selection change.
  onPlatformChange(){
      console.log(this.selPlatform);
      this.cur_components.source.pltfrm = this.selPlatform;
      this.getDatasourceList();
  }

//Get datasource list based on selected platform and organization.
getDatasourceList(){
  this.loader.show();
  let req={
    org_id : this.org_id,
    pltfm_name : this.selPlatform
  }
  this.service.post(this.service.getDatasourceList,req).subscribe(res=>{
    this.datasourceList = res;
    this.loader.hide();
  },
  err=>{
    this.loader.hide();
  })
}
// this function is used to toggle parameters dispaly section
  editSource(){
    this.isSourceTarget = true;
    this.isEditMode = false;
  }
  //on Datasource selection change.
  onDatasourceChange(){
    console.log(this.selDatasource);
    this.cur_components.source.dat_src = this.selDatasource;
    this.getDBList();
  }

  // get database list
  getDBList(){
    this.loader.show();
    let req = {
      org_id : this.org_id,
      site_id : this.selDatasource
    }
    this.service.post(this.service.getDBList,req).subscribe(res=>{
      this.dblist = res;
      this.loader.hide();
    },
    err=>{
      this.loader.hide();

    })
  }

  //on databse selection change.
  onDBChange(){
    this.cur_components.source.database = this.selDB;
    this.getObjectList();
  }
  //Get Object list by selected datasource, database and organization.
  getObjectList(){
    this.loader.show();
    let req = {
      org_id : this.org_id,
      site_id :this.selDatasource,
      db_nm : this.selDB
    }
    this.service.post(this.service.getObjectList,req).subscribe(res=>{
      this.objList = res;
      this.loader.hide();
    },
    err=>{
      this.loader.hide();

    })
  }

  //Get object list by searched text within organization.
  getObjects(){

    let req = {
      org_id : this.org_id,
      lob : this.source.apn_id,
      app : this.source.apn_id,
      search_term :this.searchObj,
    }
    if(this.searchObj && this.searchObj.length>2){
      this.loader.show();
      this.service.post(this.service.getObjects,req).subscribe(res=>{
        this.objList = res;
        this.showObjList = true;
        this.loader.hide();
      },
      err=>{
        this.loader.hide();

      })

    }

  }
  // configure source object with basic dbpull as outpath.
  selObjectEvnt(obj){
    this.selObj = obj.tbl_nm;
    this.cur_components.source.obj_nm = this.selObj;
    this.cur_components.source.obj_id = obj.obj_id;
    let org = this.org_id ? this.org_id.toLowerCase().replace(/[. ]/g,"_") : "";
    this.cur_components.source.lob = this.lobs.filter((val,i)=>{
      if(val.ln_of_bsn_id == this.lob)
        return val.ln_of_bsn_nm;
    })[0].ln_of_bsn_nm
    this.cur_components.source.app = this.apps.filter((val,i)=>{
      if(val.apn_id == this.app)
        return val.apn_nm;
    })[0].apn_nm
    let lob = this.cur_components.source.lob?this.cur_components.source.lob.toLowerCase().replace(/[. ]/g,"_") : "";
    let app = this.cur_components.source.app?this.cur_components.source.app.toLowerCase().replace(/[. ]/g,"_") : "";
    this.basePath = (this.org_nm + '-gathi/rawzone/').replace(/_/g,'-') + lob + '/' + app + '/' + this.selObj;
    this.cur_components.source.OUT_PATH = this.basePath + '/dbpull/$BUS_DT';
    console.log(this.basePath);
    this.showObjList = false;
  }

  getTable(pcs){
console.log(JSON.stringify(pcs));
this.isMapper = true;
  }


  //Run or Submit Job with series of services selected
  submitjob(){
    if(this.jobName && this.jobName.length){
      this.loader.show();
      this.cur_components.services = this.process;
      this.cur_components.job_nm = this.jobName;
      console.log(JSON.stringify(this.cur_components));
      console.log(this.process)
      this.service.post(this.service.curateJob,this.cur_components).subscribe(res=>{
        console.log(res);
        if(res.statuscode)
          alert("Job executed successfully.");
        else
          alert("Job failed.")
        this.loader.hide();
      },
      err=>{
        console.log(err);
        alert("Oops! Something went wrong please try again.");
        this.loader.hide();
      })
    }
    else{
      alert("Please enter Job Name for the services you want to run.");
    }
  }

  // delete service from selected service stack
  delProcess(pcs,type,ele,index){

    if(type == 'moveout'){
      this.process[index].groupedPcs = this.process[index].groupedPcs.filter((val,i)=>{
        if(val.pcs_id != pcs.pcs_id)
          {
            val.isChecked = false;
            return val;
          }
      })
      if(this.process[index].groupedPcs.length ==1)
          this.process[index] = this.process[index].groupedPcs[0]
      pcs.isChecked = false;
      this.process.push(pcs);
    }
    else{
      this.process = this.process.filter((val,i)=>{
        if(i != index) return val;
      })
    }
    // console.log(this.process.filter((val,i)=>{
    //   if(val.pcs_id != pcs.pcs_id) return val;
    // }))
    this.setInpathOutpath()

  }

  // add selected process to run parallely to tempgroup
  groupProcess(pcs,index,isChecked){

    console.log(isChecked);
    pcs = JSON.parse(JSON.stringify(pcs));
    if(isChecked)
      this.tempPcsGroup.push(pcs);
    else
      this.tempPcsGroup = this.tempPcsGroup.filter((val,i)=> { return val.pcs_id != pcs.pcs_id});
    this.isGroupOpen = true;

  }

  // group the finall selected process to run parallely
  closePcsGroup(){
    if(this.tempPcsGroup.length && this.tempPcsGroup.length>1){
      this.isGroupOpen = false;
      let grpPcs = {
        isGroup : true,
        groupedPcs : this.tempPcsGroup
      }
      this.process = this.process.filter(this.comparer(this.tempPcsGroup))
      this.process.push(grpPcs);
      this.tempPcsGroup = [];
    }
    else{
      alert("Please select atleast two services to group.");
    }
  }

  //compare process with other process
  comparer(otherArray){
    return function(current){
      return otherArray.filter(function(other){
        return other.pcs_id == current.pcs_id
      }).length == 0;
    }
  }

  // This function checks whether the process is configured or not before a service is added
  isSourceAdded() {
    let isAdded = true;
    let source : any= this.cur_components.source;
    if(source.isRegisterd){
      if(source.obj_id.length && source.OUT_PATH.length)
        isAdded = true;
    }
    else{
      if(source.obj_id.length && source.OUT_PATH.length)
        isAdded = true;
    }

    return isAdded;
  }

  // This function checks whether the process is configured or not before a service is added
  isTargetAdded() {
    let isAdded = true;
    let source : any= this.cur_components.source;
    if(source.isRegisterd){
      if(source.obj_id.length && source.OUT_PATH.length)
        isAdded = true;
    }
    else{
      if(source.obj_id.length && source.OUT_PATH.length)
        isAdded = true;
    }

    return isAdded;
  }



  // set Inpath/outpath for a selected services
  setInpathOutpath(){
    this.process.forEach((ele,i) => {
      console.log(ele)
      console.log(i)
      let inPathIndex = _.findIndex(this.process[i].params,{
        parm_nm_txt: 'IN_PATH'
      })

      if(i==0){


        this.process[i].params[inPathIndex].parm_val_txt = this.cur_components.source.OUT_PATH;
      }
      else{
        let outPathIndex = _.findIndex(this.process[i-1].params,{
          parm_nm_txt: 'OUT_PATH'
        })
        this.process[i].params[inPathIndex].parm_val_txt = this.process[i-1].params[outPathIndex].parm_val_txt;
      }

    });
  }
  getModifiedPcs(pcs:any){
    console.log(pcs)
  }

  // Add new Process
addProcess(e:any, type,ptype) {
  
  if((e == 'target' && this.targetAdded)|| (e == 'source' && this.sourceAdded))
    return;
  else if(this.targetAdded)
    return;
  let pcs = JSON.parse(JSON.stringify(this.process));
  if(e == 'source' || e == 'target'){
      pcs.pcs_nm = e;
      e= pcs;
  }
  if (type && type == 'list') {
    console.log(e);
    e.nodeId = e.pcs_nm + Math.floor((Math.random() * 100000) + 1);

    pcs = JSON.parse(JSON.stringify(e));
    let obj : any = {
      dim_type : "",
      componentDetails : []
    }
    //if(e && e.pcs_type_nm && e.pcs_type_nm.toLowerCase() == 'dim_builder'){
    if(e == 'source' || e == 'target'){
      obj.type = e;
      obj.dim_type = e;
    }
    else{
      obj.dim_type = "process";
      obj.type = "process";
      e.type = 'process'
    }
    this.jobdata.process.push(JSON.parse(JSON.stringify(obj)));
    this.finalTreeJSON = this.prepareTree(this.jobdata.process,e)
    this.isGraph = true;
    $("#tree-container").empty();
    console.log(JSON.stringify(this.finalTreeJSON))
    this.treeBoxes('',this.finalTreeJSON);
  }
  else {
    if (pcs.pcs_nm === '') {
      // this.toaster.showwarning('Please enter process name.');
      return;
    }
    if (pcs.pcs_exe_cmd_txt === '') {
      // this.toaster.showwarning('Please provide process command.');
      return;
    }
    if (pcs.pcs_parm_val_txt === '') {
      // this.toaster.showwarning('Please enter valid parameters.');
      return;
    }
  }
  pcs["pcs_ord"] = this.newTemplateProcess.length + 1;
  if(e.pcs_nm != 'source' && e.pcs_nm != 'target')
    this.newTemplateProcess.push(pcs);
  if(e.pcs_nm == 'target'){
    this.targetAdded = true;
  }
  else if(e.pcs_nm == 'source')
      this.sourceAdded = true;
  console.log(this.newTemplateProcess);




}

prepareTree(l,e){

  let tree : any=this.finalTreeJSON;
  let currChild = this.proceesJsonByDimType(e);

  if(this.jobdata.process.length == 1)
    return currChild;
  else
    tree = this.getFinalJSONT(this.finalTreeJSON,e,currChild);
    return this.finalTreeJSON;



}

getFinalJSONT(tree,e,currChild){


       if(tree.children.length == 0){

        tree.children.push(currChild);
        console.log(tree);
        return tree;

      }
      else{
        this.getFinalJSONT(tree.children[0],e,currChild);
      }



}

// d3 funcution do not modify this function
treeBoxes(urlService, jsonData)
{

  this.urlService_ = '';

  let blue = '#337ab7',
    green = '#5cb85c',
    yellow = '#f0ad4e',
    blueText = '#4ab1eb',
    purple = '#9467bd';
  //this.colors = ['#337ab7','#5cb85c','#f0ad4e','#4ab1eb','#9467bd'];
  this.newTemplateProcess= this.newTemplateProcess;

  this.margin = {
          top : 0,
          right : 0,
          bottom : 100,
          left : 0
         },
    // Height and width are redefined later in function of the size of the tree
    // (after that the data are loaded)
    this.width = 800 - this.margin.right - this.margin.left,
    this.height = 400 - this.margin.top - this.margin.bottom;

    this.rectNode = { width : 140, height : 60, textMargin : 5 },
    this.tooltip = { width : 150, height : 40, textMargin : 5 };
    this.i = 0,
    this.duration = 750,
    this.root;

  let mousedown; // Use to save temporarily 'mousedown.zoom' value
  let mouseWheel,
    mouseWheelName,
    isKeydownZoom = false;

  let tree;
  let baseSvg,
    svgGroup,
    nodeGroup, // If nodes are not grouped together, after a click the svg node will be set after his corresponding tooltip and will hide it
    nodeGroupTooltip,
    linkGroup,
    linkGroupToolTip,
    defs;

  this.init(urlService, jsonData);


}
 init(urlService, jsonData)
  {
    this.urlService_ = urlService;
    if (urlService && urlService.length > 0)
    {
      if (urlService.charAt(urlService.length - 1) != '/')
        this.urlService_ += '/';
    }

    if (jsonData)
      this.drawTree(jsonData);
    else
    {
      console.error(jsonData);
      alert('Invalides data.');
    }
  }
  drawTree(jsonData: any) {

      let tree = d3.tree().size([ this.height, this.width ]);
      this.root = jsonData;
      this.root.fixed = true;

      // Dynamically set the height of the main svg container
      // breadthFirstTraversal returns the max number of node on a same level
      // and colors the nodes
      let maxDepth = 0;
      const treeRoot = hierarchy(this.root)
      tree(treeRoot)
      let maxTreeWidth = this.breadthFirstTraversal(treeRoot.descendants(), (currentLevel)=> {
        maxDepth++;
        //currentLevel.forEach(function(node) {
        for(let j=0;j<currentLevel.length;j++) {
          let node = currentLevel[j];
          // if (node.data.type.toLowerCase() == 'aggregator')
          //   node.data.color = blue;
          // if (node.data.type.toLowerCase() == 'mapper')
          //   node.data.color = green;
          // if (node.data.type.toLowerCase() == 'joiner')
          //   node.data.color = yellow;
          // if (node.data.type.toLowerCase() == 'process')
          //   node.data.color = purple;
            if(node.data.color.length==0)
              node.data.cololr = '#4ab1eb';
            //node.data.color = JSON.parse(JSON.stringify(this.colors[Math.floor(Math.random() * this.colors.length)]));
            this.root.id = node.data.nodeId;
          }
        });
      this.height = maxTreeWidth * (this.rectNode.height + 20) + this.tooltip.height + 20 - this.margin.right - this.margin.left;
      this.width = maxDepth * (this.rectNode.width * 1.5) + this.tooltip.width / 2 - this.margin.top - this.margin.bottom;

      tree = d3.tree().size([ this.height, this.width ]);
      this.root.x0 = this.height / 2;
      this.root.y0 = 0;

      d3.select("body").on('keydown',this.deleteItem.bind(this));

      let baseSvg = d3.select('#tree-container').append('svg')
        .attr('width', this.width + this.margin.right + this.margin.left)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .attr('class', 'svgContainer');

      // Mouse wheel is desactivated, else after a first drag of the tree, wheel event drags the tree (instead of scrolling the window)
      //getMouseWheelEvent();
      //d3.select('#tree-container').select('svg').on(mouseWheelName, null);
      //d3.select('#tree-container').select('svg').on('dblclick.zoom', null);

      let svgGroup = baseSvg.append('g')
      .attr('class','drawarea')
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

      // SVG elements under nodeGroupTooltip could be associated with nodeGroup,
      // same for linkGroupToolTip and linkGroup,
      // but this separation allows to manage the order on which elements are drew
      // and so tooltips are always on top.
      this.nodeGroup = svgGroup.append('g')
            .attr('id', 'nodes');
      this.linkGroup = svgGroup.append('g')
            .attr('id', 'links');
      // linkGroupToolTip = svgGroup.append('g')
      //              .attr('id', 'linksTooltips');
      this.nodeGroupTooltip = svgGroup.append('g')
                   .attr('id', 'nodesTooltips');

      this.defs = baseSvg.append('defs');
      this.initArrowDef();
      this.initDropShadow();

      this.update(this.root);

  }

  update(source)
  {
    // Compute the new tree layout
    // var nodes = tree.nodes(root).reverse(),
    //   links = tree.links(nodes);

// create a hierarchy from the root
const treeRoot = hierarchy(this.root)
tree(treeRoot)
// nodes
const nodes = treeRoot.descendants()
// links
const links = treeRoot.links()


this.currentObject = null;

    // Check if two nodes are in collision on the ordinates axe and move them
    this.breadthFirstTraversal(treeRoot.descendants(), this.collision);
    // Normalize for fixed-depth
    nodes.forEach((d)=> {
      d.y = d.depth * (this.rectNode.width * 1.5);
    });

  // 1) ******************* Update the nodes *******************
    var node = this.nodeGroup.selectAll('g.node').data(nodes, (d)=> {
      return d.id || (d.id = ++this.i);
    });
    var nodesTooltip = this.nodeGroupTooltip.selectAll('g').data(nodes, (d)=> {
      return d.id || (d.id = ++this.i);
    });

    // Enter any new nodes at the parent's previous position
    // We use "insert" rather than "append", so when a new child node is added (after a click)
    // it is added at the top of the group, so it is drawed first
    // else the nodes tooltips are drawed before their children nodes and they
    // hide them
    var nodeEnter = node.enter().insert('g', 'g.node')
    .attr('class', 'node')
    .attr('transform', (d)=> {
      d.x = 70;
      d.id = d.data.nodeId;
      console.log(d);console.log(d.y +'---- '+ d.x);return 'translate(' + d.y + ',' + d.x + ')'; })
    .on('click', this.click.bind(this))
    //.on("mouseover", this.click.bind(this))
    // .on("mouseout", function() {
    //     d3.select(this).style("stroke","none");
    //     currentObject = null;
    // });

    // var nodeEnterTooltip1 = nodesTooltip.enter().append('g')
    //   .attr('transform', function(d) {
    //       return 'translate(' + source.y0 + ',' + source.x0 + ')'; });

   let nodesvg = nodeEnter.append('g');

    nodesvg.append('rect')
    .attr('rx', 6)
    .attr('ry', 6)
    .attr('width', this.rectNode.width)
    .attr('height', this.rectNode.height)
    .attr('class', 'node-rect')
    .attr('id',function(d){
      return d.data.nodeId
    })
    .attr('fill', function (d) {
       console.log(d);
       return d.data.color
      })
    .attr('filter', 'url(#drop-shadow)')

    ;


    nodeEnter.append('foreignObject')
    .attr('x', this.rectNode.textMargin)
    .attr('y', this.rectNode.textMargin)
    .attr('width', ()=> {
          return (this.rectNode.width - this.rectNode.textMargin * 2) < 0 ? 0
              : (this.rectNode.width - this.rectNode.textMargin * 2)
        })
    .attr('height', ()=> {
          return (this.rectNode.height - this.rectNode.textMargin * 2) < 0 ? 0
              : (this.rectNode.height - this.rectNode.textMargin * 2)
        })
    .append('xhtml').html((d)=> {
          d = d.data;
          let sourceSVG = '<svg  class="flow-svg" height="13" viewBox="0 0 21.349 15.998" width="21.349" xmlns="http://www.w3.org/2000/svg"><g  id="open-folder" transform="translate(0 -67.229)"><g  data-name="Group 558" id="Group_558" transform="translate(0 67.229)"><path  d="M5.761,75.041A5.346,5.346,0,0,1,8,74.5h9.453V72.683a2.561,2.561,0,0,0-2.545-2.545H8.726v-.364a2.449,2.449,0,0,0-.75-1.8,2.45,2.45,0,0,0-1.8-.75H2.545a2.449,2.449,0,0,0-1.8.75,2.449,2.449,0,0,0-.75,1.8V80.682q0,.046.006.142c0,.064.006.112.006.142L.068,80.9,3.9,76.4A5.3,5.3,0,0,1,5.761,75.041Z" data-name="Path 1373" fill="#FFFFFF" id="Path_1373" transform="translate(0 -67.229)"></path><path  d="M41.062,286.642a1.539,1.539,0,0,0-.687-.148H28.012a3.943,3.943,0,0,0-1.63.4,3.852,3.852,0,0,0-1.369.983l-3.818,4.5a1.169,1.169,0,0,0-.352.75.5.5,0,0,0,.3.488,1.538,1.538,0,0,0,.687.148H34.194a3.945,3.945,0,0,0,1.63-.4,3.85,3.85,0,0,0,1.369-.983l3.818-4.5a1.169,1.169,0,0,0,.352-.75A.5.5,0,0,0,41.062,286.642Z" data-name="Path 1374" fill="#FFFFFF" id="Path_1374" transform="translate(-20.014 -277.768)"></path></g></g></svg>';
          let targetSVG = '<svg  class="flow-svg" height="13" id="dot-and-circle" viewBox="0 0 19.42 19.42" width="19.42" xmlns="http://www.w3.org/2000/svg"><g  data-name="Group 557" id="Group_557" transform="translate(0 0)"><path  d="M18.118,4.836A9.669,9.669,0,0,0,14.584,1.3,9.5,9.5,0,0,0,9.71,0,9.5,9.5,0,0,0,4.836,1.3,9.667,9.667,0,0,0,1.3,4.836,9.5,9.5,0,0,0,0,9.71a9.5,9.5,0,0,0,1.3,4.874,9.669,9.669,0,0,0,3.534,3.534,9.5,9.5,0,0,0,4.874,1.3,9.5,9.5,0,0,0,4.874-1.3,9.667,9.667,0,0,0,3.534-3.534,9.5,9.5,0,0,0,1.3-4.874A9.5,9.5,0,0,0,18.118,4.836Zm-2.453,8.325a6.859,6.859,0,0,1-2.5,2.5,6.722,6.722,0,0,1-3.452.923,6.723,6.723,0,0,1-3.452-.923,6.859,6.859,0,0,1-2.5-2.5A6.721,6.721,0,0,1,2.832,9.71a6.723,6.723,0,0,1,.923-3.452,6.856,6.856,0,0,1,2.5-2.5A6.722,6.722,0,0,1,9.71,2.832a6.722,6.722,0,0,1,3.452.923,6.856,6.856,0,0,1,2.5,2.5,6.722,6.722,0,0,1,.923,3.452A6.722,6.722,0,0,1,15.665,13.161Z" data-name="Path 1370" fill="#FFFFFF" id="Path_1370" transform="translate(0 0)"></path><path  d="M149.418,146.178a3.237,3.237,0,1,0,2.288.948A3.119,3.119,0,0,0,149.418,146.178Z" data-name="Path 1371" fill="#FFFFFF" id="Path_1371" transform="translate(-139.708 -139.705)"></path></g></svg>';
          let servicesSVG = '<svg  class="flow-svg" height="13" id="chat-bubble" viewBox="0 0 18.887 18.695" width="18.887" xmlns="http://www.w3.org/2000/svg"><path  d="M144.712,117.366a2.331,2.331,0,1,0-2.331,2.331A2.333,2.333,0,0,0,144.712,117.366Zm0,0" data-name="Path 1360" fill="#FFFFFF" id="Path_1360" transform="translate(-132.938 -109.193)"></path><path  d="M18.887,16.346V0H0V16.346H2.988l2.348,2.349,2.349-2.349ZM8.682,13.3V11.951a3.834,3.834,0,0,1-1.37-.569l-.953.953L5.282,11.258l.953-.953a3.829,3.829,0,0,1-.569-1.37H4.319V7.411H5.665a3.837,3.837,0,0,1,.569-1.37l-.953-.953L6.359,4.011l.953.953a3.834,3.834,0,0,1,1.37-.569V3.049h1.524V4.395a3.833,3.833,0,0,1,1.37.569l.953-.953,1.077,1.077-.953.953a3.831,3.831,0,0,1,.569,1.37h1.346V8.935H13.222a3.834,3.834,0,0,1-.569,1.37l.953.953-1.077,1.077-.953-.953a3.829,3.829,0,0,1-1.37.569V13.3Zm0,0" data-name="Path 1361" fill="#FFFFFF" id="Path_1361"></path></svg>';
          let svgIcon = servicesSVG;
          if(d.nodeName.toLowerCase() == 'source')
              svgIcon = sourceSVG;
          else if(d.nodeName.toLowerCase() == 'target')
              svgIcon = targetSVG;
          return '<div style="font: 10px sans-serif;cursor:pointer;color: white;width: '
              + (this.rectNode.width - this.rectNode.textMargin * 2) + 'px; height: '
              + (this.rectNode.height - this.rectNode.textMargin * 2) + 'px;" class="node-text wordwrap">'
              + '<b>' + d.nodeName + svgIcon +'</b><br><br>'
              // + '<p style="display:inline">Obj1: </p>' + d.obj1 + '<br>'
              // + '<p style="display:inline">Obj2: </p>' + d.obj2 + '<br>'
              + '</div>';
        })
    .on('mouseover', function(d) {
      $('#nodeInfoID' + d.id).css('visibility', 'visible');
      $('#nodeInfoTextID' + d.id).css('visibility', 'visible');
    })
    .on('mouseout', function(d) {
      $('#nodeInfoID' + d.id).css('visibility', 'hidden');
      $('#nodeInfoTextID' + d.id).css('visibility', 'hidden');
    });

  // let delSvg = nodeEnter.append('g')
  // .attr('rx', 16)
  // .attr('ry', 16)
  // // .attr('width',30)
  // // .attr('height',20)
  // .attr('transform', (d)=> {
  //   d.x = 70;
  //   console.log(d);console.log(d.y +'---- '+ d.x);return 'translate(' + 140 + ',' + 0 + ')'; })
  //   .attr('filter', 'url(#drop-shadow)')
  //   .on('click', this.delProcess.bind(this));
  // delSvg.append("path")
  //   .attr("d", 'M222.993,154.7a.594.594,0,0,0-.594.594V166.53a.594.594,0,0,0,1.189,0V155.3A.594.594,0,0,0,222.993,154.7Zm0,0')
  //   .attr("transfrom",'translate('+-209.184+','+  -145.51+')')
  //   .attr('fill',"#707070")
  //   delSvg.append("path")
  //   .attr("d", 'M104.993,154.7a.594.594,0,0,0-.594.594V166.53a.594.594,0,0,0,1.189,0V155.3A.594.594,0,0,0,104.993,154.7Zm0,0')
  //   .attr("transfrom",'translate('+-98.197 +','+ -145.51+')')
  //   .attr('fill',"#707070")
  //   delSvg.append("path")
  //   .attr("d", 'M1.685,7.554V22.2a3.279,3.279,0,0,0,.872,2.261,2.927,2.927,0,0,0,2.124.918H15.925a2.926,2.926,0,0,0,2.124-.918A3.279,3.279,0,0,0,18.92,22.2V7.554a2.27,2.27,0,0,0-.582-4.465H15.295V2.346A2.334,2.334,0,0,0,12.941,0H7.664A2.335,2.335,0,0,0,5.31,2.346v.743H2.267a2.27,2.27,0,0,0-.582,4.465Zm14.24,16.634H4.68A1.882,1.882,0,0,1,2.873,22.2V7.606H17.731V22.2A1.882,1.882,0,0,1,15.925,24.188ZM6.5,2.346A1.145,1.145,0,0,1,7.664,1.187h5.277a1.145,1.145,0,0,1,1.165,1.159v.743H6.5ZM2.267,4.278h16.07a1.07,1.07,0,1,1,0,2.14H2.267a1.07,1.07,0,0,1,0-2.14Zm0,0')
  //   .attr("transfrom",'translate('+0+','+ 0+')')
  //   .attr('fill',"#707070")
  //   delSvg.append("path")
  //   .attr("d", 'M163.993,154.7a.594.594,0,0,0-.594.594V166.53a.594.594,0,0,0,1.189,0V155.3A.594.594,0,0,0,163.993,154.7Zm0,0')
  //   .attr("transfrom",'translate(-153.69 -145.51)')
  //   .attr('fill',"#707070");




    // Transition nodes to their new position.
    var nodeUpdate = node.transition().duration(this.duration)
    .attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; });
    nodesTooltip.transition().duration(this.duration)
    .attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; });

    nodeUpdate.select('rect')
    .attr('class', function(d) { return d._children ? 'node-rect-closed' : 'node-rect'; });

    nodeUpdate.select('text').style('fill-opacity', 1);

    // Transition exiting nodes to the parent's new position
    var nodeExit = node.exit().transition().duration(this.duration)
      .attr('transform', function(d) { return 'translate(' + source.y + ',' + source.x + ')'; })
      .remove();
    nodesTooltip.exit().transition().duration(this.duration)
      .attr('transform', function(d) { return 'translate(' + source.y + ',' + source.x + ')'; })
    .remove();

    nodeExit.select('text').style('fill-opacity', 1e-6);


  // 2) ******************* Update the links *******************
    var link = this.linkGroup.selectAll('path').data(links, (d)=> {
      return d.target.id;
    });
    // var linkTooltip = linkGroupToolTip.selectAll('g').data(links, function(d) {
    //   return d.target.id;
    // });

    function linkMarkerStart(direction, isSelected) {
      if (direction == 'SYNC')
      {
        return isSelected ? 'url(#start-arrow-selected)' : 'url(#start-arrow)';
      }
      return '';
    }

    function linkType(link) {
      if (link.direction == 'SYNC')
        return "Synchronous [\u2194]";
      else
      {
        if (link.direction == 'ASYN')
          return "Asynchronous [\u2192]";
      }
      return '???';
    }

    // d3.selection.prototype.moveToFront = function() {
    //     return this.each(function(){
    //         this.parentNode.appendChild(this);
    //       });
    //   };

    // Enter any new links at the parent's previous position.
      // Enter any new links at the parent's previous position.
      var linkenter = link.enter().insert('path', 'g')
      .attr('class', 'link')
      .attr('fill',"none")
      .attr('stroke',"lightsteelblue")
      .attr('stroke-width',"2px")
      .attr('id', function(d) { return 'linkID' + d.target.id; })
      .attr('d', (d)=> { return this.diagonal(d); })
      .attr('marker-end', 'url(#end-arrow)')
      .attr('marker-start', function(d) { console.log(d);return linkMarkerStart(d.target.data.link.direction, false); })

      .on('mouseout', function(d) {
        d3.select(this).attr('marker-end', 'url(#end-arrow)');
        d3.select(this).attr('marker-start', linkMarkerStart(d.target.data.link.direction, false));
        d3.select(this).attr('class', 'link');
        $('#tooltipLinkID' + d.target.id).css('visibility', 'hidden');
        $('#tooltipLinkTextID' + d.target.id).css('visibility', 'hidden');
      });

      // linkTooltip.enter().append('rect')
      // .attr('id', function(d) { return 'tooltipLinkID' + d.target.id; })
      // .attr('class', 'tooltip-box')
      // .style('fill-opacity', 0.8)
      // .attr('x', function(d) { return (d.target.y + rectNode.width - d.source.y) / 2 + d.source.y; })
      // .attr('y', function(d) { return (d.target.x - d.source.x) / 2 + d.source.x; })
      // .attr('width', tooltip.width)
      // .attr('height', tooltip.height)
      // .on('mouseover', function(d) {
      //   $('#tooltipLinkID' + d.target.id).css('visibility', 'visible');
      //   $('#tooltipLinkTextID' + d.target.id).css('visibility', 'visible');
      //   // After selected a link, the cursor can be hover the tooltip, that's why we still need to highlight the link and the arrow
      //   $('#linkID' + d.target.id).attr('class', 'linkselected');
      //   $('#linkID' + d.target.id).attr('marker-end', 'url(#end-arrow-selected)');
      //   $('#linkID' + d.target.id).attr('marker-start', linkMarkerStart(d.target.data.link.direction, true));

      //   removeMouseEvents();
      // })
    //   .on('mouseout', function(d) {
    //     $('#tooltipLinkID' + d.target.id).css('visibility', 'hidden');
    //     $('#tooltipLinkTextID' + d.target.id).css('visibility', 'hidden');
    //     $('#linkID' + d.target.id).attr('class', 'link');
    //     $('#linkID' + d.target.id).attr('marker-end', 'url(#end-arrow)');
    //     $('#linkID' + d.target.id).attr('marker-start', linkMarkerStart(d.target.data.link.direction, false));

    //     reactivateMouseEvents();
    //   });

    //   linkTooltip.enter().append('text')
    //   .attr('id', function(d) { return 'tooltipLinkTextID' + d.target.id; })
    //   .attr('class', 'tooltip-text')
    //   .attr('x', function(d) { return (d.target.y + rectNode.width - d.source.y) / 2 + d.source.y + tooltip.textMargin; })
    //   .attr('y', function(d) { return (d.target.x - d.source.x) / 2 + d.source.x + tooltip.textMargin * 2; })
    //   .attr('width', tooltip.width)
    //   .attr('height', tooltip.height)
    //   .style('fill', 'white')
    //   .append("tspan")
    //      .text(function(d) { return linkType(d.target.data.link); })
    //      .append("tspan")
    //     .attr('x', function(d) { return (d.target.y + rectNode.width - d.source.y) / 2 + d.source.y + tooltip.textMargin; })
    //      .attr('dy', '1.5em')
    //     .text(function(d) {return d.target.data.link.name;});

    // // Transition links to their new position.
    // var linkUpdate = link.transition().duration(duration)
    //             .attr('d', function(d) { return diagonal(d); });
    // linkTooltip.transition().duration(duration)
    //        .attr('d', function(d) { return diagonal(d); });

    // // Transition exiting nodes to the parent's new position.
    // link.exit().transition()
    // .remove();

    // linkTooltip.exit().transition()
    //   .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  deleteItem(d){
    if(d3.event.keyCode == 46)
      {
        this.isProcess = false;
        this.newTemplateProcess = this.newTemplateProcess.filter(i => i.nodeId !== this.currentObject.data.nodeId);
        this.selectedProcess = [];
        this.refreshTree();
        if(this.targetAdded)
          {
            this.targetAdded = false;
            this.addProcess('target','list','loadtable');
          }
      }

  }


  // Toggle children on click.
  click(d) {
    //console.log(d3.select('#'+d.id).style("stroke","blue"))
    d3.selectAll('rect').classed("selc-service",false);
    d3.selectAll('rect').attr("stroke",null);
    d3.selectAll('#'+d.id).attr("stroke",'blue');
    d3.select('#'+d.id).classed("selc-service",true);
    this.currentObject = d;
    //d3.select(d).style("stroke","black");
    console.log(d)
    console.log(this.newTemplateProcess)
    this.isSource = false;
    this.isTarget = false;
    this.isProcess = false;
    this.isAirflow = false;
    if(d.data.nodeName == 'source')
        this.isSource = true;
    else if(d.data.nodeName=="target")
            {
              this.isTarget = true;
              if (this.deliveryMode === 'push') {
                if (this.source.lnd_file_nm === null || this.source.lnd_file_nm === '') {
                  console.log('Please Enter Landing File Name.');
                  return;
                }
                if (this.source.lnd_file_path_txt === null || this.source.lnd_file_path_txt === '') {
                  this.source.lnd_file_path_txt = this.defaultValues.src_landing_location;
                }
              } else {
                if (this.source.obj_type_nm.toLowerCase() == 'file') {
                  if (this.source.lnd_file_path_txt === null || this.source.lnd_file_path_txt === '') {
                    this.source.lnd_file_path_txt = this.defaultValues.src_landing_location;
                  }
                } else {
                  this.source.lnd_file_nm = '';
                  this.source.lnd_file_path_txt = '';
                }
              }

              if (this.source.ln_of_bsn_id === null || this.source.ln_of_bsn_id === ''
                || this.source.ln_of_bsn_id === undefined || this.source.ln_of_bsn_id === '-1') {
                console.log('Please Select LOB.');
                return;
              } else if (this.source.apn_id === null || this.source.apn_id === ''
                || this.source.apn_id === undefined || this.source.apn_id === '-1') {
                console.log('Please Select Application.');
                return;
              }

              if (!this.viewJob) {

                // this.filterSubjectAreas(this.source.apn_id, this.source.ln_of_bsn_id);
                this.filterSubjectAreas();

                // init target defaults
                if (this.previous !== 'objectDetails') {
                  this.target.obj_phy_nm = this.source.obj_phy_nm + '_v';
                }
                this.target.obj_type_nm = this.defaultValues.trg_obj_type_nm;
                this.target.obj_schm_nm = this.defaultValues.trg_schema_nm;
                this.target.obj_db_pltfm_nm = this.defaultValues.trg_obj_db_pltfm_nm;
                this.target.site_id = this.defaultValues.trg_site_id;
                this.target.obj_lyr_nm = this.defaultValues.trg_obj_lyr_nm;
                this.target.dat_src_nm = this.defaultValues.trg_dat_src_nm;

                // this.source.sub_area_nm = '';

                // this.setTargetAttributes();
                // get converted dataTypes
                this.getConvertedDataTypes();

                if (this.clone.job_id === undefined || this.clone.job_id === null || this.clone.job_id === '') {
                  this.target.obj_loc_path_txt = this.defaultValues.target_location + this.source.sub_area_nm;
                  this.target.ln_of_bsn_id = this.source.ln_of_bsn_id;
                  this.target.ln_of_bsn_nm = this.source.ln_of_bsn_nm;
                  this.target.apn_id = this.source.apn_id;
                  this.target.apn_nm = this.source.apn_nm;
                }
                this.target_lobSelectChng();
              }
              this.getConvertedDataTypes();
            }
    else
        {
          this.isProcess = true;
          this.selectedProcess = _.where(this.newTemplateProcess,{nodeId : d.data.nodeId});
        }
    console.log(this.selectedProcess);

    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    //update(d);
   // this.click1(d)
  }

  // Breadth-first traversal of the tree
  // func function is processed on every node of a same level
  // return the max level
    breadthFirstTraversal(tree, func)
    {
      var max = 0;
      if (tree && tree.length > 0)
      {
        var currentDepth = tree[0].depth;
        var fifo = [];
        var currentLevel = [];

        fifo.push(tree[0]);
        while (fifo.length > 0) {
          var node = fifo.shift();
          if (node.depth > currentDepth) {
            func(currentLevel);
            currentDepth++;
            max = Math.max(max, currentLevel.length);
            currentLevel = [];
          }
          currentLevel.push(node);
          if (node.children) {
            for (var j = 0; j < node.children.length; j++) {
              fifo.push(node.children[j]);
            }
          }
        }
      func(currentLevel);
      return Math.max(max, currentLevel.length);
    }
    return 0;
    }

  // x = ordoninates and y = abscissas
  collision(siblings) {
    var minPadding = 5;
    if (siblings) {
      for (var i = 0; i < siblings.length - 1; i++)
      {
        if (siblings[i + 1].x - (siblings[i].x + this.rectNode.height) < minPadding)
          siblings[i + 1].x = siblings[i].x + this.rectNode.height + minPadding;
      }
    }
  }

  removeMouseEvents() {
    // Drag and zoom behaviors are temporarily disabled, so tooltip text can be selected
    this.mousedown = d3.select('#tree-container').select('svg').on('mousedown.zoom');
    d3.select('#tree-container').select('svg').on("mousedown.zoom", null);
  }

  reactivateMouseEvents() {
    // Reactivate the drag and zoom behaviors
    d3.select('#tree-container').select('svg').on('mousedown.zoom', this.mousedown);
  }

  // Name of the event depends of the browser
  getMouseWheelEvent() {
    if (d3.select('#tree-container').select('svg').on('wheel.zoom'))
    {
      let mouseWheelName = 'wheel.zoom';
      return d3.select('#tree-container').select('svg').on('wheel.zoom');
    }
    if (d3.select('#tree-container').select('svg').on('mousewheel.zoom') != null)
    {
      let mouseWheelName = 'mousewheel.zoom';
      return d3.select('#tree-container').select('svg').on('mousewheel.zoom');
    }
    if (d3.select('#tree-container').select('svg').on('DOMMouseScroll.zoom'))
    {
      let mouseWheelName = 'DOMMouseScroll.zoom';
      return d3.select('#tree-container').select('svg').on('DOMMouseScroll.zoom');
    }
  }

  diagonal(d) {
    var p0 = {
      x : d.source.x + this.rectNode.height / 2,
      y : (d.source.y + this.rectNode.width)
    }, p3 = {
      x : d.target.x + this.rectNode.height / 2,
      y : d.target.y  - 12 // -12, so the end arrows are just before the rect node
    }, m = (p0.y + p3.y) / 2;
    let p : any = [ p0, {
      x : p0.x,
      y : m
    }, {
      x : p3.x,
      y : m
    }, p3 ];
    p = p.map(function(d) {
      return [ d.y, d.x ];
    });
    return 'M' + p[0] + 'C' + p[1] + ' ' + p[2] + ' ' + p[3];
  }

  initDropShadow() {
    var filter = this.defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("color-interpolation-filters", "sRGB");

    filter.append("feOffset")
    .attr("result", "offOut")
    .attr("in", "SourceGraphic")
      .attr("dx", 0)
      .attr("dy", 0);

    filter.append("feGaussianBlur")
        .attr("stdDeviation", 2);

    filter.append("feOffset")
        .attr("dx", 2)
        .attr("dy", 2)
        .attr("result", "shadow");

    filter.append("feComposite")
      .attr("in", 'offOut')
      .attr("in2", 'shadow')
      .attr("operator", "over");
  }

   initArrowDef() {
    // Build the arrows definitions
    // End arrow
    this.defs.append('marker')
    .attr('id', 'end-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 0)
    .attr('refY', 0)
    .attr('fill','lightsteelblue')
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .attr('class', 'arrow')
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5');

    // End arrow selected
    this.defs.append('marker')
    .attr('id', 'end-arrow-selected')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 0)
    .attr('refY', 0)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .attr('class', 'arrowselected')
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5');

    // Start arrow
    this.defs.append('marker')
    .attr('id', 'start-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 0)
    .attr('refY', 0)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .attr('class', 'arrow')
    .append('path')
    .attr('d', 'M10,-5L0,0L10,5');

    // Start arrow selected
    this.defs.append('marker')
    .attr('id', 'start-arrow-selected')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 0)
    .attr('refY', 0)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .attr('class', 'arrowselected')
    .append('path')
    .attr('d', 'M10,-5L0,0L10,5');
  }



proceesJsonByDimType(obj){
  let tempTree = {
    "nodeName" : "Process",
    "name" : "Process",
    "type" : "process",
    "obj1" : "",
    "label" : "Node name 1",
    "color" : "#4ab1eb",
    "nodeId" : "",
    "obj2" : "",
    "link" : {
        "name" : "Process",
        "nodeName" : "Process",
        "direction" : "ASYN"
      },
    "children" : []

}
  // if(obj && obj.name.toLowerCase() == 'joiner')
  // {
    console.log(obj)
    tempTree.type = obj.type;
    tempTree.nodeName = obj.pcs_nm;
    tempTree.link.name = tempTree.nodeName;
    tempTree.link.nodeName = tempTree.nodeName;
    tempTree.nodeId = obj.nodeId;
  //}

  return tempTree;

}
saveProcess(){
  console.log(this.newTemplateProcess);
  console.log(this.processByType);
}

//get Source Details

getSourceDetails(obj) {
  this.loader.show();
  const parms = {
    assetId: obj.obj_id,
    userId: this.userId,
    orgId: this.org_id
  }
  this.service.post(this.service.ing_source_and_defaults_ep, parms).subscribe(res => {
    this.searchObj = '';
    //this.logMsg('getSourceDetails', parms, res);

    this.sourceAttributes = res.source_attributes;  // obj properties
    this.sourceDetails = res.source_details[0]; // obj details
    this.actualSubjectAreas = res.subject_areas; // subject areas
    //this.lob = res.lob;    // lobs
    //this.applications = res.applications;   // applications
    this.sites = res.sites; // sites
    this.jobs = res.jobs; // success jobs for clone
    this.defaultValues = res.default_data; // default values
    this.targetAuditClmns = res.default_data.audit_clms // audit clmns for target
    //this.organizations = res.organizations; // organizations
    this.uniqueTargetDbPlatforms = res.unique_db_platforms;
    // this.finalJobs = res.jobs;

    // Fill Source Details
    this.fillSourceDetails();

    this.finalSourceAttributes = res.source_attributes;
    this.loader.hide();
    // if (this.previous == 'objectDetails') {
    //   setTimeout(() => {
    //     this.cloneFromChange();
    //   }, 250);
    // }
  }, err => {
    this.loader.hide();
    //this.toast.showerror('Error Getting Data.Please Try Again.')
  })
}

private fillSourceDetails() {
  const src = this.sourceDetails;
  this.source.obj_id = src.id;
  this.source.obj_phy_nm = src.obj_phy_nm;
  this.source.obj_type_nm = src.obj_type_nm;
  this.source.obj_db_pltfm_nm = src.obj_db_pltfm_nm;
  this.source.obj_schm_nm = src.obj_schm_nm;
  this.source.ln_of_bsn_nm = src.ln_of_bsn_nm;
  this.source.apn_nm = src.apn_nm;
  this.source.dat_src_nm = src.conn_nm;
  this.source.site_id = src.conn_id;
  this.source.sourceLocation = src.obj_loc_path_txt;
  this.source.obj_fmt_type_nm = src.obj_fmt_type_nm;

  this.deliveryMode = src.obj_dlvr_mode_ind !== null && src.obj_dlvr_mode_ind !== '' ? src.obj_dlvr_mode_ind : 'push';
  this.source.lnd_file_nm = src.lnd_file_nm;
  this.source.sub_area_nm = ''; // src.sub_area_nm;

  if (this.source.obj_type_nm.toLowerCase() === 'file') {
    this.source.file_dlmt_cd = src.file_dlmt_cd === null || src.file_dlmt_cd === '' ? ',' : src.file_dlmt_cd.trim();
  }
  if (src.rmv_hdr_rec_ind !== null) {
    this.source.removeHeaderIndicator = src.rmv_hdr_rec_ind;
  }
  else {
    this.source.removeHeaderIndicator = 'N';
  }

  // init default values
  this.source.lnd_file_path_txt = src.lnd_file_path_txt !== null && src.lnd_file_path_txt !== '' ? src.lnd_file_path_txt : this.defaultValues.src_landing_location;
  this.source.dl_raw_site_id = src.dl_raw_site_id !== null && src.dl_raw_site_id !== '' ? src.dl_raw_site_id : this.defaultValues.src_dl_raw_site_id;
  this.source.dl_raw_loc_txt = src.dl_raw_loc_txt !== null && src.dl_raw_loc_txt !== '' ? src.dl_raw_loc_txt : this.defaultValues.src_raw_zone_loction;
  this.source.dl_raw_obj_type_nm = src.dl_raw_obj_type_nm !== null && src.dl_raw_obj_type_nm !== '' ? src.dl_raw_obj_type_nm : this.defaultValues.src_dl_raw_obj_type_nm;
  this.source.prflg_zn_site_id = src.dl_raw_site_id !== null && src.dl_raw_site_id !== '' ? src.dl_raw_site_id : this.defaultValues.src_prflg_zn_site_id;
  this.source.prflg_zn_loc_txt = src.prflg_zn_loc_txt !== null && src.prflg_zn_loc_txt !== '' ? src.prflg_zn_loc_txt : this.defaultValues.src_profiling_location;
  this.source.dl_raw_fmt_type_nm = src.dl_raw_fmt_type_nm !== null && src.dl_raw_fmt_type_nm !== '' ? src.dl_raw_fmt_type_nm : this.defaultValues.src_dl_raw_fmt_type_nm;



  // this.source.lnd_file_path_txt = this.defaultValues.src_landing_location; // src.lnd_file_path_txt;
  // this.source.dl_raw_site_id = this.defaultValues.src_dl_raw_site_id; // src.dl_raw_site_id;
  // this.source.dl_raw_loc_txt = this.defaultValues.src_raw_zone_loction ;  // src.dl_raw_loc_txt;
  // this.source.dl_raw_obj_type_nm = this.defaultValues.src_dl_raw_obj_type_nm;
  // this.source.prflg_zn_site_id = this.defaultValues.src_prflg_zn_site_id; // src.dl_raw_site_id;
  // this.source.prflg_zn_loc_txt = this.defaultValues.src_profiling_location ;   // src.prflg_zn_loc_txt;
  // this.source.dl_raw_fmt_type_nm = this.defaultValues.src_dl_raw_fmt_type_nm;

  if (this.source.org_id == null || this.source.org_id == '') {
    this.source.org_id = this.org_id;
  }

  this.organizationChange();

  // check lob
  if (src.ln_of_bsn_nm === null || src.ln_of_bsn_nm === '' || src.ln_of_bsn_id === '-1') {
    this.editLobs = true;
    this.source.ln_of_bsn_id = src.ln_of_bsn_id
  } else { this.editLobs = false; this.source.ln_of_bsn_id = src.ln_of_bsn_id };

  this.lobSelectChng();

  // check application
  if (src.apn_nm === null || src.apn_nm === '' || src.apn_id === '-1') {
    this.editAplications = true;
    this.source.ln_of_bsn_id = src.ln_of_bsn_id
  } else { this.editAplications = false; this.source.apn_id = src.apn_id };

  // filter subject areas based on lob and applic
  this.filterSubjectAreas();
}

// filtering subject areas
filterSubjectAreas() {
  this.subjectAreas = [];
  this.subjectAreas = this.actualSubjectAreas.filter(i => i.org_id == this.source.org_id);
}

getCalenderNames() {
  this.uniqueCalenderNames = [];
  this.calenderNames = [];
  const params = {};
  this.service.post(this.service.calenderNames_ep, params).subscribe(res => {
    this.allCalenderNames = res;

    for (let i = 0; i < this.allCalenderNames.length; i++) {
      if (this.allCalenderNames[i].clndr_nm && this.allCalenderNames[i].clndr_nm !== null &&
        this.uniqueCalenderNames.indexOf(this.allCalenderNames[i].clndr_nm.toLowerCase()) === -1) {
        this.uniqueCalenderNames.push(this.allCalenderNames[i].clndr_nm)
        if (this.allCalenderNames[i].clndr_nm !== undefined && this.allCalenderNames[i].clndr_nm != null) {
          this.calenderNames.push({
            'clndr_nm': this.allCalenderNames[i].clndr_nm
          });
        }
      }
    }
  }, err => {
  })

}

getScheduleNames() {
  this.uniqueScheduleNames = [];
  this.scheduleNames = [];
  const params = {};
  this.service.post(this.service.scheduleNames_ep, params).subscribe(res => {
    this.allScheduleNames = res;

    for (let i = 0; i < this.allScheduleNames.length; i++) {
      if (this.allScheduleNames[i].sch_nm && this.allScheduleNames[i].sch_nm !== null &&
        this.uniqueScheduleNames.indexOf(this.allScheduleNames[i].sch_nm.toLowerCase()) === -1) {
        this.uniqueScheduleNames.push(this.allScheduleNames[i].sch_nm)
        if (this.allScheduleNames[i].sch_nm !== undefined && this.allScheduleNames[i].sch_nm != null) {
          this.scheduleNames.push({
            'sch_nm': this.allScheduleNames[i].sch_nm,
            'clndr_nm': this.allScheduleNames[i].clndr_nm
          });
        }
      }
    }
    this.job.calenderName = '';
  }, err => {
    //this.toast.showerror('Error Getting Data.Please Try Again.')
  })

}
// Fill drop downs end

// on select drodown events start
onSelectedSchedule() {
  this.allScheduleNames.forEach(element => {
    if (this.job.scheduleName === element.sch_nm) {
      this.job.scheduleStartTime = element.sch_strt_tm
      this.schffectiveStartDate = element.sch_eff_strt_dt
      // this.job.predccondition = element.sch_pred_cond_txt
      // this.job.scheduleCalenderName = element.clndr_nm
    }
  });
}

onSelectedCalender() {
  this.filterScheduleNames = [];
  this.allCalenderNames.forEach(element => {
    if (this.job.calenderName === element.clndr_nm) {
      this.job.nextBsndayIndicator = element.next_bsn_day_ind
    }
  });

  //filter schedule names based on selected calendar
  this.scheduleNames.forEach(element => {
    if (this.job.calenderName == element.clndr_nm) {
      this.filterScheduleNames.push({
        'sch_nm': element.sch_nm
      })
    }

    //this.job.scheduleName="0";
  });
}

selectedEffectiveStartDt(seleffstartdt) {
  this.job.effectiveStartDate = seleffstartdt
}

selectedScheduleEffStartDt(selscheffdt) {
  this.job.scheduleeffectiveStartDate = selscheffdt
}

organizationChange() {
  this.getLOBList();
  //this.finalLob = this.lobs.filter(i => i.org_id === this.source.org_id);
  console.log(this.finalLob)
  //this.finalApplications = this.applications.filter(i => i.org_id === this.source.org_id);
  this.filterSubjectAreas();
}

lobSelectChng() {
  const lob: any = this.lobs.filter(i => i.ln_of_bsn_id === this.source.ln_of_bsn_id);
  if (lob.length !== 0) {
    this.source.ln_of_bsn_nm = lob[0].ln_of_bsn_nm;
    this.source.apn_id = '-1';
    // this.source.apn_nm = '';
    this.finalApplications = this.applications.filter(x => x.ln_of_bsn_id === this.source.ln_of_bsn_id);
  }
  this.getAppsList(this.source.ln_of_bsn_id)
}
isCronExpChange(eve) {
  this.job.isCronExpression = eve.target.value;
}

  // update source and target
  sendDetails() {
    this.isSchedule=true;
    this.isSource = false;
    this.isTarget = false;

    // if (!this.viewstatus) {
    //   if (this.target.sub_area_nm === null || this.target.sub_area_nm === undefined || this.target.sub_area_nm === '') {
    //    // this.toaster.showwarning('Please Select Subject Area.');
    //     return;
    //   }

    //   if (this.target.obj_desc_txt.trim() === '') {
    //     //this.toaster.showwarning('Please enter the description.');
    //     return;
    //   }
    // }
    this.loader.show();

    if (this.deliveryMode === 'pull' && this.source.obj_type_nm.toLowerCase() !== 'file') {
      this.source.lnd_file_nm = 'NA';
      this.source.lnd_file_path_txt = 'NA';
    }
    const src_data = {
      obj_id: this.source.obj_id,
      obj_type_nm: this.source.obj_type_nm,
      site_id: this.source.site_id,
      dat_src_nm: this.source.dat_src_nm,
      apn_id: this.source.apn_id,
      apn_nm: this.source.apn_nm,
      ln_of_bsn_id: this.source.ln_of_bsn_id,
      ln_of_bsn_nm: this.source.ln_of_bsn_nm,
      dl_raw_site_id: this.source.dl_raw_site_id,
      dl_raw_loc_txt: this.source.dl_raw_loc_txt,
      dl_raw_obj_type_nm: this.source.dl_raw_obj_type_nm,
      prflg_zn_site_id: this.source.prflg_zn_site_id,
      prflg_zn_loc_txt: this.source.prflg_zn_loc_txt,
      lnd_file_path_txt: this.source.lnd_file_path_txt,
      lnd_file_nm: this.source.lnd_file_nm,
      rec_lst_updt_by_id: this.userId,
      sub_area_nm: this.source.sub_area_nm,
      obj_db_pltfm_nm: this.source.obj_db_pltfm_nm,
      dl_raw_fmt_type_nm: this.source.dl_raw_fmt_type_nm,
      obj_dlvr_mode_ind: this.deliveryMode,
      org_id: this.source.org_id,
      rmv_hdr_rec_ind: this.source.removeHeaderIndicator,
      obj_fmt_type_nm: this.source.obj_fmt_type_nm,
      file_dlmt_cd: this.source.file_dlmt_cd.trim()
    }

    const tar_data = {
      obj_phy_nm: this.target.obj_phy_nm,
      obj_type_nm: this.target.obj_type_nm,
      obj_db_pltfm_nm: this.target.obj_db_pltfm_nm,
      obj_schm_nm: this.target.obj_schm_nm,
      obj_loc_path_txt: this.target.obj_loc_path_txt,
      obj_lyr_nm: this.target.obj_lyr_nm,
      ln_of_bsn_nm: this.target.ln_of_bsn_nm,
      ln_of_bsn_id: this.target.ln_of_bsn_id,
      site_id: this.target.site_id,
      dat_src_nm: this.target.dat_src_nm,
      apn_id: this.target.apn_id,
      apn_nm: this.target.apn_nm,
      crtd_by_id: this.userId,
      sub_area_nm: this.source.sub_area_nm,
      obj_ownr_id: this.userId,
      org_id: this.source.org_id,
      obj_desc_txt: this.target.obj_desc_txt,
      is_public: this.target.is_public
    }

    // for job fill dropdowns start
    // this.getJobTemplates();
    // this.getCalenderNames();
    // this.getScheduleNames();

    const data = {
      source: src_data,
      target: tar_data,
      target_prop: this.targetAttributes
    }

    this.service.post(this.service.update_Source_target_details_ep, data).subscribe(result => {
      const res = result.target;
      //this.logMsg('sendDetails', data, res);
      this.target.obj_id = res.obj_id;
      this.target.prgm_id = res.prgm_id;
      this.target.prj_id = res.prj_id;
      this.target.apn_id = res.apn_id;
      this.target.sub_apn_id = res.sub_apn_id;
      this.target.ln_of_bsn_id = res.ln_of_bsn_id;

      // bind input,output objects
      this.job.inputObj = this.source.obj_id
      this.job.outputObj = this.target.obj_id


      this.loader.hide();
      //this.goToView('SCH');
      //this.toaster.showsuccess('Records Updated Successfully.');
    }, err => {
      this.loader.hide();
      //this.toaster.showerror('Please Try Again.');
    });
  }

  // final json
  submitInjectionData() {
    if (this.job.jobName === undefined || this.job.jobName === '') {
      // this.toast.showwarning('Please enter job name.')
      return;
    }

    // if (this.job.calenderName === undefined || this.job.calenderName === '') {
    //   // this.toast.showwarning('Please select calendar name.')
    //   return;
    // }

    // if (this.job.scheduleName === undefined || this.job.scheduleName === '') {
    //   // this.toast.showwarning('Please select schedule name.')
    //   return;
    // }

    // if ((this.job.selectedTempltId === undefined || this.job.selectedTempltId === '') && !this.newTemplateProcess.length) {
    //   // this.toast.showwarning('Please select job template or add atleast one process.')
    //   return;
    // }
    // if (this.job.effectiveStartDate === undefined || this.job.effectiveStartDate === '') {
    const jobeffdt: HTMLInputElement = <HTMLInputElement>document.getElementById('jobeffectiveStartdate');
    this.job.effectiveStartDate = jobeffdt.value
    // }
    // if (this.job.scheduleeffectiveStartDate === undefined || this.job.scheduleeffectiveStartDate === '') {
    const scheffdt: HTMLInputElement = <HTMLInputElement>document.getElementById('scheffectivestartdate');
    this.job.scheduleeffectiveStartDate = scheffdt.value
    // }
    let d1 = new Date(this.job.scheduleeffectiveStartDate); let d2 = new Date(this.job.effectiveStartDate);
    if (d1 > d2) {
      //this.toast.showwarning('Job effective start date must be greater than or equal to schedule effective start date.')
      return;
    }



    if (this.job.scheduleStartTime === '00:00:00') {
      this.job.scheduleStartTime = '00:00'
    }
    if (this.job.slaStartTime === '00:00:00') {
      this.job.slaStartTime = '00:00'
    }

    if (this.job.slaEndTime === undefined || this.job.slaEndTime === '00:00:00') {
      this.job.slaEndTime = '00:00'
    }
    if (Number(this.job.slaOffsetDays) <= 0) {
      if (this.job.slaStartTime >= this.job.slaEndTime) {
       // this.toast.showwarning('sla end time should be after sla start time.')
        return;
      }
    }


    // get process input values
    // if (this.selectedProcess.length !== 0) {
    //   for (let i = 0; i < this.selectedProcess.length; i++) {
    //     const pcsId = this.selectedProcess[i].processId
    //     const process_type_id: HTMLInputElement = <HTMLInputElement>document.getElementById(pcsId);
    //     const process_value = process_type_id.value
    //     this.overideProcessParmText[pcsId] = process_value
    //   }
    // }
    let process = []
    for (var i = 0; i < this.newTemplateProcess.length; i++) {
      let obj = this.newTemplateProcess[i];
      let pArr = [];
      pArr = this.formatProcess(obj);
      for (var j = 0; j < pArr.length; j++) {
        pArr[j].pcs_ord_nbr = i + 1;
        if (!pArr[j].isOverriden)
          pArr[j]['isOverriden'] = false;
      }

      process = process.concat(pArr);
    }

    if (process.length === 0) {
      //this.toast.showwarning('Add Process.')
      return;
    }

    if (this.job.nextBsndayIndicator === null) {
      this.job.nextBsndayIndicator = '';
    }

   // this.showAirflow = false;
    this.loader.show();
    let finalJsonData: any;

    if (this.previous == 'objectDetails') {
      finalJsonData = {
        'job_id': this.clone.job_id,
        'tmpl_id': this.job.selectedTempltId,
        'tmpl_nm': this.job.selectedTempltName,
        'src_ast_type_id': '',
        'job_nm': this.job.jobName,
        'schedule': {
          'sch_nm': this.job.scheduleName,
          'sch_eff_strt_dt': this.job.scheduleeffectiveStartDate,
          'sch_strt_tm': this.job.scheduleStartTime,
          'sch_clndr_nm': '', // this.job.scheduleCalenderName
          'tm_zone_txt': ''// remove in UI
        },
        'clndr_nm': this.job.calenderName,
        'job_frq_txt': this.job.frequency,
        'job_eff_strt_dt': this.job.effectiveStartDate,
        'job_sla_strt_tm': this.job.slaStartTime,
        'job_sla_end_tm': this.job.slaEndTime,
        'sla_offset_days_cnt': this.job.slaOffsetDays,
        'next_bsn_day_ind': '',
        'ovrd_pcs_parm_val_txt': this.overideProcessParmText,
        'job_pred_cond_txt': this.job.predccondition,
        'pred_cond_type_txt': this.job.predccondtype,
        'crtcl_job_ind': this.job.criticaljobindicator,
        'fin_pnlty_ind': this.job.finanpenalityindicator,
        'job_prt_nbr': this.job.jobprioritynumber,
        'crt_dag_ind': this.job.createDagIndicator,
        'max_run_alarm_seconds_cnt': this.job.maxrunalaramsec,
        'min_run_alarm_seconds_cnt': this.job.minrunalaramsec,
        'support_grp_email_id': this.job.suppgroupemail,
        'org_id': this.org_id,
        'previous_sch_nm': this.job.scheduleName,
        'user_id': this.userId,
        'is_free_cron_expre': this.job.isCronExpression,
        'cron_expression': this.job.cronExpression,
        'impact' : this.job.impact,
        'support_group' : this.job.supportGroup,
        'process': process,
        'ticketing_system_type' : this.job.ticketing_system_type,
        'job_type': 'Ingestion'
      };
    } else {
      finalJsonData = [{
        'tmpl_id': this.job.selectedTempltId,
        'tmpl_nm': this.job.selectedTempltName,
        'src_ast_type_id': '',
        'job_nm': this.job.jobName,
        'schedule': {
          'sch_nm': this.job.scheduleName,
          'sch_eff_strt_dt': this.job.scheduleeffectiveStartDate,
          'sch_strt_tm': this.job.scheduleStartTime,
          'sch_clndr_nm': '', // this.job.scheduleCalenderName
          'tm_zone_txt': ''// remove in UI
        },
        'ln_of_bsn_id': this.target.ln_of_bsn_id,
        'prgm_id': this.target.prgm_id,
        'prj_id': this.target.prj_id,
        'apn_id': this.target.apn_id,
        'sub_apn_id': this.target.sub_apn_id,
        'clndr_nm': this.job.calenderName,
        'job_frq_txt': this.job.frequency,
        'job_eff_strt_dt': this.job.effectiveStartDate,
        'job_sla_strt_tm': this.job.slaStartTime,
        'job_sla_end_tm': this.job.slaEndTime,
        'sla_offset_days_cnt': this.job.slaOffsetDays,
        'next_bsn_day_ind': '',
        'ovrd_pcs_parm_val_txt': this.overideProcessParmText,
        'opt_objects': [{
          'ip_opt_obj_ind': 'in',
          'obj_id': this.source.obj_id,
          'ip_opt_ord_nbr': 1
        },
        {
          'ip_opt_obj_ind': 'out',
          'obj_id': this.target.obj_id,
          'ip_opt_ord_nbr': 1
        }
        ],
        'job_pred_cond_txt': this.job.predccondition,
        'pred_cond_type_txt': this.job.predccondtype,
        'job_out_cond_txt': '', // remove in UI
        'crtcl_job_ind': this.job.criticaljobindicator,
        'fin_pnlty_ind': this.job.finanpenalityindicator,
        'job_prt_nbr': this.job.jobprioritynumber,
        'job_parse_lng_txt': '', // removed it
        'crt_dag_ind': this.job.createDagIndicator,
        'job_ownr_id': this.userId,
        'max_run_alarm_seconds_cnt': this.job.maxrunalaramsec,
        'min_run_alarm_seconds_cnt': this.job.minrunalaramsec,
        'support_grp_email_id': this.job.suppgroupemail,
        'job_crtd_by_id': this.defaultValues.job_crtd_by_id,
        'org_id': this.org_id,
        'process': process,
        'job_type': 'Ingestion',
        'is_free_cron_expre': this.job.isCronExpression,
        'cron_expression': this.job.cronExpression,
        'impact' : this.job.impact,
        'support_group' : this.job.supportGroup,
        'ticketing_system_type' : this.job.ticketing_system_type
      }]
    }

    let endpoint = this.service.injectionUrl;
    if (this.previous == 'objectDetails') {
      endpoint = this.service.updateJobDetails_ep;
    }

    this.service.post(endpoint, finalJsonData).subscribe(res => {
      //this.logMsg('JOb RES', finalJsonData, res);

      let dag = res[0];
      if (this.previous == 'objectDetails') {
        dag = res.dag_id
      }
      console.log('*_____*')
      console.log(dag)

      //this.toast.showsuccess('Submitted Successfully.');
      const message = 'Creating Job...';
      setTimeout(() => {
        //this.toast.showsuccess(message);
        //this.dag_redirect(dag);
      }, 5000);

    }, err => {
      this.loader.hide();
      // this.logMsg('JOb RES', finalJsonData, err);
      const err_text = err.error.text
      if (err_text != undefined && err_text != null && err_text != '') {
        if (err_text.indexOf('unique constraint "job_pkey1') > -1) {
          //this.toast.showerror('Job already exists.Please change the job name.');
        } else {
          //this.toast.showerror('Got Error.Please Try Again.');
        }
      } else {
        //this.toast.showerror('Got Error.Please Try Again.');
      }


    })
  }

   //convert default,mandatory and overriden params as flat process
   formatProcess(process) {
    let optionalObjects = [];
    let mandatoryObjects = [];
    let newPcsObj = process;
    let pcs: any = [];
    _.each(newPcsObj.mandatory, function (obj, index) {
      mandatoryObjects.push(_.extend(obj, _.omit(newPcsObj, 'optional', 'mandatory', 'overriden')))
    })
    _.each(newPcsObj.optional, function (obj) {
      optionalObjects.push(_.extend(obj, _.omit(newPcsObj, 'optional', 'mandatory', 'overriden')))
    })
    pcs = _.flatten([mandatoryObjects, optionalObjects]);
    return pcs;
  }

  siteChange() {
    const site_id = this.source.site_id;
    if (site_id !== null || site_id !== undefined) {
      const ele = this.sites.filter(i => i.conn_id === site_id);
      this.source.dat_src_nm = ele[0].conn_nm;
    }
  }

  applicationSelectChng() {
    // if(this.source.apn_id !== '' && this.source.apn_id !== '0'){
    const apn: any = this.applications.filter(i => i.apn_id === this.source.apn_id);
    this.source.apn_nm = apn[0].apn_nm;
    this.searchObj = '';
    // this.source.lnd_file_path_txt = '/home/hduser/dropbox/' + apn[0].apn_nm + '/';
    // }
  }

  rawZoneSiteChange() {
    const dl_raw_site_id = this.source.dl_raw_site_id;
    if (dl_raw_site_id !== null || dl_raw_site_id !== undefined) {
      const ele = this.sites.filter(i => i.site_id === dl_raw_site_id);
      this.source.dat_src_nm = ele[0].dat_src_nm;
    }
  }
  profilingSiteChange() {
    const prflg_zn_site_id = this.source.prflg_zn_site_id;
    if (prflg_zn_site_id !== null || prflg_zn_site_id !== undefined) {
      const ele = this.sites.filter(i => i.site_id === prflg_zn_site_id);
      this.source.dat_src_nm = ele[0].dat_src_nm;
    }
  }

  target_siteChange() {

  }

  target_lobSelectChng() {
    // this.target.apn_id = '-1';
    this.getAppsList(this.target.ln_of_bsn_id);
    this.finalTarApplications = this.applications.filter(x => x.ln_of_bsn_id === this.target.ln_of_bsn_id)
  }

  target_applicationSelectChng() {

  }

  target_dbPlatformChange() {
    this.getConvertedDataTypes();
  }

  getConvertedDataTypes() {
    const data = {
      target: {
        sitte_id: this.target.site_id,
        obj_schm_nm: this.target.obj_schm_nm,
        obj_phy_nm: this.target.obj_phy_nm
      },
      src_obj_id: this.source.obj_id,
      src_obj_pltfm_nm: this.source.obj_db_pltfm_nm,
      tar_obj_pltfm_nm: this.target.obj_db_pltfm_nm
    }
    this.loader.show();
    this.service.post(this.service.convertDataTypes_ing_ep, data).subscribe(
      res => {
        //this.logMsg('getConvertedDataTypes', data, res)
        this.convertedDataTypes = res;
        this.setTargetAttributes();
        this.loader.hide();
      },
      err => {
        this.loader.hide();
        //.goToView('SRC');

        const err_text = err.error.text;
        if (err_text != undefined && err_text != null && err_text != '') {
          if (err_text.indexOf('No Mapping') > -1) {
            //this.toast.showerror(err_text);
          } else {
            //this.toast.showerror('Got Error.Please Try Again.');
          }
        } else {
          //this.toast.showerror('Got Error.Please Try Again.');
        }
      }
    );
  }
  target_subjAreaChng() {
    let sub_area = this.source.sub_area_nm = this.target.sub_area_nm;
    sub_area = this.source.sub_area_nm.replace(/ /g, "_");
    this.target.obj_loc_path_txt = this.defaultValues.target_location + sub_area;
  }
  setTargetAttributes() {
    this.targetAttributes = [];
    this.targetAttributes = this.convertedDataTypes.slice(0);

    const auditClms = this.targetAuditClmns;

    const checkAuditClms = this.targetAttributes.filter(i => {
      if (i.assetName.toLowerCase() === 'rec_id') {
        return true;
      } else {
        return false;
      }
    })

    if (checkAuditClms.length !== 0) {

    } else {
      for (let i = 0; i < auditClms.length; i++) {
        const ele = auditClms[i];
        this.targetAttributes.push(ele);
      }
    }
    console.log(this.targetAttributes);
  }

  closeSchedule(){
    this.isSchedule = false;
    this.isGraph=true;
    $("#tree-container").empty();
    console.log(JSON.stringify(this.finalTreeJSON))
    setTimeout(() => {
      this.treeBoxes('',this.finalTreeJSON);
    }, 1000);

  }
  scheduleJob(){
    if(!this.isSourceAdded() || this.newTemplateProcess.length<1)
        {
          alert("Please add source and atlease one Process");
          return;
        }
    if (this.deliveryMode === 'pull' && this.source.obj_type_nm.toLowerCase() !== 'file') {
      this.source.lnd_file_nm = 'NA';
      this.source.lnd_file_path_txt = 'NA';
    }
    const src_data = {
      obj_id: this.source.obj_id,
      obj_type_nm: this.source.obj_type_nm,
      site_id: this.source.site_id,
      dat_src_nm: this.source.dat_src_nm,
      apn_id: this.source.apn_id,
      apn_nm: this.source.apn_nm,
      ln_of_bsn_id: this.source.ln_of_bsn_id,
      ln_of_bsn_nm: this.source.ln_of_bsn_nm,
      dl_raw_site_id: this.source.dl_raw_site_id,
      dl_raw_loc_txt: this.source.dl_raw_loc_txt,
      dl_raw_obj_type_nm: this.source.dl_raw_obj_type_nm,
      prflg_zn_site_id: this.source.prflg_zn_site_id,
      prflg_zn_loc_txt: this.source.prflg_zn_loc_txt,
      lnd_file_path_txt: this.source.lnd_file_path_txt,
      lnd_file_nm: this.source.lnd_file_nm,
      rec_lst_updt_by_id: this.userId,
      sub_area_nm: this.source.sub_area_nm,
      obj_db_pltfm_nm: this.source.obj_db_pltfm_nm,
      dl_raw_fmt_type_nm: this.source.dl_raw_fmt_type_nm,
      obj_dlvr_mode_ind: this.deliveryMode,
      org_id: this.source.org_id,
      rmv_hdr_rec_ind: this.source.removeHeaderIndicator,
      obj_fmt_type_nm: this.source.obj_fmt_type_nm,
      file_dlmt_cd: this.source.file_dlmt_cd.trim()
    }

    const tar_data = {
      obj_phy_nm: this.target.obj_phy_nm,
      obj_type_nm: this.target.obj_type_nm,
      obj_db_pltfm_nm: this.target.obj_db_pltfm_nm,
      obj_schm_nm: this.target.obj_schm_nm,
      obj_loc_path_txt: this.target.obj_loc_path_txt,
      obj_lyr_nm: this.target.obj_lyr_nm,
      ln_of_bsn_nm: this.target.ln_of_bsn_nm,
      ln_of_bsn_id: this.target.ln_of_bsn_id,
      site_id: this.target.site_id,
      dat_src_nm: this.target.dat_src_nm,
      apn_id: this.target.apn_id,
      apn_nm: this.target.apn_nm,
      crtd_by_id: this.userId,
      sub_area_nm: this.source.sub_area_nm,
      obj_ownr_id: this.userId,
      org_id: this.source.org_id,
      obj_desc_txt: this.target.obj_desc_txt,
      is_public: this.target.is_public
    }

    // for job fill dropdowns start
    // this.getJobTemplates();
    // this.getCalenderNames();
    // this.getScheduleNames();

    const data = {
      source: src_data,
      target: tar_data,
      target_prop: this.targetAttributes
    }
    let popupData ={
      source : JSON.parse(JSON.stringify(this.source)),
      target : JSON.parse(JSON.stringify(this.target)),
      deliveryMode : this.deliveryMode,
      targetAttributes : this.targetAttributes,
      newTemplateProcess : this.newTemplateProcess,
      defaultValues : this.defaultValues
    }
    const dialogRef = this.dialog.open(CurateScheduleComponent, {
      width: '70%',
      data: popupData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)

      this.loader.show();
      setTimeout(() => {
        this.isSource = false;
        this.isTarget = false;
        this.isProcess = false;
        this.isAirflow = true;
        this.sourceAdded = false;
        this.targetAdded = false;
        this.loader.hide();
      },3000);

      console.log('The dialog was closed');

    });
  }

  saveAsTemplate(el: HTMLElement) {

    const dialogRef = this.dialog.open(InputModalComponent, {
      width: '35%',
      data: {name:"", title:"Run Job"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    this.tmplName = result.name;


    if (this.tmplName && this.tmplName != '' && this.newTemplateProcess.length) {

      // this.getJobTemplates();
      let params = {};
      let process = []
      // prepare the process array by modifying order number
      for (var i = 0; i < this.newTemplateProcess.length; i++) {
        let obj = this.newTemplateProcess[i];
        let pArr = [];
        pArr = this.formatProcess(obj);
        for (var j = 0; j < pArr.length; j++) {
          pArr[j].pcs_ord_nbr = i + 1;
          if (!pArr[j].isOverriden)
            pArr[j]['isOverriden'] = false;
        }

        process = process.concat(pArr);
      }
      params['tmpl_nm'] = this.tmplName;
      params['userId'] = this.userId;
      params['process'] = process;
      console.log(params);

      this.service.post(this.service.saveTemplate, params).subscribe(result => {
        console.log(result);
        if (result && result.template_id && result.template_id != '') {
          //this.getJobTemplates();
          //  this.jobTemplates.push({
          // 'templateId': result.template_id,
          // 'templateName': this.tmplName,
          //   });
          //setTimeout(() => {
          //this.isNewTemplate = false;
          // Swal.fire({
          //   text : 'Template Created Succesffully!',
          //   icon : 'success',
          //   timer: 1500
          // })
          this.job.selectedTempltId = result.template_id;
          //this.isSaveTemplate = false;
          this.tmplName = '';
          //},1000);
          //this.toast.showsuccess(result.msg)
        }
        //else
          //this.toast.showerror(result.msg)

      }, err => {
        //this.toast.showerror("Error in save template process, please try agian")
      })

    }
    else {
      //if (!this.newTemplateProcess.length)
        //this.toast.showwarning("Please Add atleast one Process to the template");
      //else {
        //this.isSaveTemplate = true;
        //this.toast.showwarning("Please enter Template Name");
     // }
    }
  })
  }

  // Fill drop downs start
  getJobTemplates() {
    this.jobTemplates = [];
    const params = {};
    this.service.post(this.service.jobTemplates_ep, params).subscribe(res => {
      this.alljobTemplates = res;

      for (let i = 0; i < this.alljobTemplates.length; i++) {
        if (this.alljobTemplates[i].tmpl_id && this.alljobTemplates[i].tmpl_id !== null &&
          this.uniqueJobTemplates.indexOf(this.alljobTemplates[i].tmpl_id) === -1) {
          this.uniqueJobTemplates.push(this.alljobTemplates[i].tmpl_id)
          if (this.alljobTemplates[i].tmpl_id !== undefined && this.alljobTemplates[i].tmpl_id != null) {
            this.jobTemplates.push({
              'templateId': this.alljobTemplates[i].tmpl_id,
              'templateName': this.alljobTemplates[i].tmpl_nm.toLowerCase(),
            });
          }
      }
      }
    }, err => {
    })
  }


  selectTempletEvent() {
    // this.job.selectedTempltId = tempid
    // this.job.selectedTempltName = t.templateName

    this.selectedProcess = [];

    // adding src
    this.addProcess('source','list','table');

  //  if(this.isSourceAdded()){
  //   this.job.selectedTempltId = '';
  //   alert("Please Configure Source Object")
  //   return;
  //  }
    const selTempltId = this.job.selectedTempltId;
    if (selTempltId !== null && selTempltId !== undefined && selTempltId != 'new') {
      this.isNewTemplate = false;
      const ele = this.jobTemplates.filter(i => i.templateId === selTempltId);
      let req = { template_id: this.job.selectedTempltId }
      if(ele && ele[0])
      this.job.selectedTempltName = ele[0].templateName;
      this.loader.show();
      this.service.post(this.service.getProcessByTemplate, req).subscribe(result => {
        this.loader.hide();

        this.newTemplateProcess = this.setProcessByParamType(result, false);
        this.refreshTree();

        setTimeout(() => {
          this.refreshTree();
          this.targetAdded = false;
          this.addProcess('target','list','loadtable');
        }, 0);
        //this.isNewTemplate = true;
        console.log(this.newTemplateProcess);
      }, err => {
        this.loader.hide();
      })
    }
    else if (selTempltId.toLowerCase() == 'new') {
      this.isNewTemplate = true;
    }

    this.selectedProcess = [];
    this.alljobTemplates.forEach(element => {
      if (this.job.selectedTempltId === element.tmpl_id) {
        this.selectedProcess.push({
          'processId': element.pcs_id,
          'processName': element.pcs_nm
        });
      }
    });
  }
  emptySource(){
    this.isSource = false;
    this.source = {
      cloneObject: '',
      obj_id: '',
      obj_phy_nm: '',
      obj_type_nm: '',
      obj_db_pltfm_nm: '',
      obj_schm_nm: '',
      ln_of_bsn_id: '',
      ln_of_bsn_nm: '',
      apn_id: '',
      apn_nm: '',
      site_id: '',
      dat_src_nm: '',
      sourceLocation: '',
      lnd_file_path_txt: '',
      lnd_file_nm: '',
      sub_area_nm: '',
      dl_raw_site_id: '',
      dl_raw_loc_txt: '',
      dl_raw_obj_type_nm: '',
      prflg_zn_site_id: '',
      prflg_zn_loc_txt: '',
      delimitterCode: '',
      rec_lst_updt_by_id: '',
      dl_raw_fmt_type_nm: '',
      org_id: '',
      obj_dlvr_mode_ind: '',
      removeHeaderIndicator: '',
      obj_fmt_type_nm: '',
      file_dlmt_cd: '',
      isCdc:false,
      is_public : false
    }
    console.log(this.jobdata.process)
    console.log(this.finalTreeJSON)


  }
  emptyTarget(){
    this.isTarget = false;
    this.target = {
      obj_id: '',
      obj_phy_nm: '',
      obj_type_nm: '',
      obj_db_pltfm_nm: '',
      obj_schm_nm: '',
      obj_loc_path_txt: '',
      obj_lyr_nm: '',
      ln_of_bsn_nm: '',
      ln_of_bsn_id: '',
      site_id: '',
      dat_src_nm: '',
      apn_id: '',
      apn_nm: '',
      crtd_by_id: '',
      obj_ownr_id: '',
      prgm_id: '',
      prj_id: '',
      sub_apn_id: '',
      sub_area_nm: '',
      org_id: '',
      obj_desc_txt: '',
      is_public: 'N'
    }
    console.log(this.newTemplateProcess)
    console.log(this.finalTreeJSON)
    this.newTemplateProcess.splice(this.newTemplateProcess.length-1,1)
    this.refreshTree();
    this.targetAdded = false;

  }
  removeSelectedProcess(event){
    console.log(event);
    console.log(this.jobdata.process)
    console.log(this.finalTreeJSON)
    console.log(this.selectedProcess);

    this.isProcess = false;
    this.newTemplateProcess = this.newTemplateProcess.filter(i => i.pcs_id !== this.selectedProcess[0].pcs_id);
    this.selectedProcess = [];
    this.refreshTree();
    if(this.targetAdded)
    {
      this.targetAdded = false;
      this.addProcess('target','list','loadtable');
    }
  }

  refreshTree(){
    if(this.finalTreeJSON == undefined){
      this.finalTreeJSON = [];
    }
    this.finalTreeJSON.children = [];

    //this.removeSelectedProcess();
    for(let i=0;i<this.newTemplateProcess.length;i++){
      let pcs = this.newTemplateProcess[i];
      if(!pcs.nodeId)
          {
            pcs.nodeId= pcs.pcs_nm + Math.floor((Math.random() * 100000) + 1);
            pcs.type = "process"
          }
      if(!_.isArray(pcs))
        {
          let obj : any = {
            dim_type : "process",
            componentDetails : [],
            type : "process"
          }
          this.jobdata.process.push(obj)
          this.finalTreeJSON = this.prepareTree(this.jobdata.process,pcs)
        }

    }
    $("#tree-container").empty();
    this.isGraph = true;
    console.log(JSON.stringify(this.finalTreeJSON))
    this.treeBoxes('',this.finalTreeJSON);
  }

  // push - pull
  deliveryModeChng(flag: string) {
    this.deliveryMode = flag;
    if (this.deliveryMode === 'push') {
      if (this.source.lnd_file_path_txt === 'NA' || this.source.lnd_file_path_txt === '') {
        this.source.lnd_file_path_txt = this.defaultValues.src_landing_location;
      }

      if (this.source.lnd_file_nm === 'NA') {
        this.source.lnd_file_nm = ''
      }
    }
  }

  //Run Job without scheduling
  runJob(){

    const dialogRef = this.dialog.open(InputModalComponent, {
      width: '35%',
      data: {name:"", title:"Run Job"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    this.jobName = result.name;

    let process = []
    for (var i = 0; i < this.newTemplateProcess.length; i++) {
      let obj = this.newTemplateProcess[i];
      let pArr = [];
      pArr = this.formatProcess(obj);
      for (var j = 0; j < pArr.length; j++) {
        pArr[j].pcs_ord_nbr = i + 1;
        if (!pArr[j].isOverriden)
          pArr[j]['isOverriden'] = false;
      }

      process = process.concat(pArr);
    }

    if (process.length === 0) {
      //this.toast.showwarning('Add Process.')
      return;
    }
    if (this.jobName.length === 0) {
      //this.toast.showwarning('Add Process.')
      return;
    }

    let reqObj = {
      "source": {
        "isRegisterd": true,
        "obj_id": this.source.obj_id,
        "obj_nm": this.source.obj_phy_nm,
        "OUT_PATH": "",
        "pltfrm": this.source.obj_db_pltfm_nm,
        "dat_src": this.source.dat_src_nm,
        "database": this.source.obj_schm_nm,
        "app": this.source.apn_nm,
        "lob": this.source.ln_of_bsn_nm
    },
    "services": process,
    "target": {
      "isRegisterd": false,
      "obj_id": this.target.obj_id,
      "obj_nm": this.target.obj_phy_nm,
      "OUT_PATH": "",
      "pltfrm": this.target.obj_db_pltfm_nm,
      "dat_src": this.target.dat_src_nm,
      "database": this.target.obj_schm_nm
    },
    "job_nm": "testcurate_v23"

  }
  let finalRunJobObj  : any;
  if (this.previous == 'objectDetails') {
    finalRunJobObj = {
      'job_id': this.clone.job_id,
      'tmpl_id': this.job.selectedTempltId,
      'tmpl_nm': this.job.selectedTempltName,
      'src_ast_type_id': '',
      'job_nm': this.job.jobName,
      "schedule": {
        "sch_nm": "SCH_Daily",
        "sch_eff_strt_dt": "2020-04-01",
        "sch_strt_tm": "00:00",
        "sch_clndr_nm": "",
        "tm_zone_txt": ""
      },
      'clndr_nm': "daily_clndr",
      'job_frq_txt':"",
      "job_eff_strt_dt": "2020-04-01",
      "job_sla_strt_tm": "00:00",
      "job_sla_end_tm": "13:00:00",
      "sla_offset_days_cnt": 10,
      'next_bsn_day_ind': '',
      'ovrd_pcs_parm_val_txt': this.overideProcessParmText,
      "job_pred_cond_txt": "",
      "pred_cond_type_txt": "",
      "job_out_cond_txt": "",
      "crtcl_job_ind": "N",
      "fin_pnlty_ind": "N",
      "job_prt_nbr": "",
      "job_parse_lng_txt": "",
      "crt_dag_ind": "Y",
      "job_ownr_id": this.userId,
      "max_run_alarm_seconds_cnt": "",
      "min_run_alarm_seconds_cnt": "",
      "support_grp_email_id": "",
      'org_id': this.org_id,
      'previous_sch_nm': this.job.scheduleName,
      'user_id': this.userId,
      'is_free_cron_expre': this.job.isCronExpression,
      'cron_expression': this.job.cronExpression,
      'impact' : this.job.impact,
      'support_group' : this.job.supportGroup,
      'process': process,
      'ticketing_system_type' : this.job.ticketing_system_type,
      'job_type': 'Ingestion'
    };
  } else {
    finalRunJobObj = [{
      'tmpl_id': this.job.selectedTempltId,
      'tmpl_nm': this.job.selectedTempltName,
      'src_ast_type_id': '',
      'job_nm': this.job.jobName,
      "schedule": {
        "sch_nm": "SCH_Daily",
        "sch_eff_strt_dt": "2020-04-01",
        "sch_strt_tm": "00:00",
        "sch_clndr_nm": "",
        "tm_zone_txt": ""
      },
      'ln_of_bsn_id': this.target.ln_of_bsn_id,
      'prgm_id': this.target.prgm_id,
      'prj_id': this.target.prj_id,
      'apn_id': this.target.apn_id,
      'sub_apn_id': this.target.sub_apn_id,
      'clndr_nm': "daily_clndr",
      'job_frq_txt':"",
      "job_eff_strt_dt": "2020-04-01",
      "job_sla_strt_tm": "00:00",
      "job_sla_end_tm": "13:00:00",
      "sla_offset_days_cnt": 10,
      'next_bsn_day_ind': '',
      'ovrd_pcs_parm_val_txt': this.overideProcessParmText,
      'opt_objects': [{
        'ip_opt_obj_ind': 'in',
        'obj_id': this.source.obj_id,
        'ip_opt_ord_nbr': 1
      },
      {
        'ip_opt_obj_ind': 'out',
        'obj_id': this.target.obj_id,
        'ip_opt_ord_nbr': 1
      }
      ],
      "job_pred_cond_txt": "",
      "pred_cond_type_txt": "",
      "job_out_cond_txt": "",
      "crtcl_job_ind": "N",
      "fin_pnlty_ind": "N",
      "job_prt_nbr": "",
      "job_parse_lng_txt": "",
      "crt_dag_ind": "Y",
      "job_ownr_id": this.userId,
      "max_run_alarm_seconds_cnt": "",
      "min_run_alarm_seconds_cnt": "",
      "support_grp_email_id": "",
      'org_id': this.org_id,
      'process': process,
      'job_type': 'Ingestion',
      'is_free_cron_expre': "N",
      'cron_expression': "",
      'impact' : "medium",
      'support_group' : "",
      'ticketing_system_type' : "gathi"
    }]
  }

  console.log(JSON.stringify(finalRunJobObj))
  this.service.post(this.service.curateJob,finalRunJobObj).subscribe(res=>{
    console.log(res);
    if(res.statuscode)
      {
        alert("Job executed successfully.");
        this.isJobLog = true;
      }
    else
      alert("Job failed.")
    this.loader.hide();
  },
  err=>{
    console.log(err);
    alert("Oops! Something went wrong please try again.");
    this.loader.hide();
  })
});
}

isValidProcess(pcs,type){
  let isValidEle = false;
  let preProcessingList = ["Json-Parser","XML-Parser","S3-Copy","Datapull"]
  let processingList = ["DQ","DELTA","CDC","PARTITION"]
  let validation = ["File-watcher","Send Mail"]
  let houseKeeping = ["Archieve","Purge"]

  if(type == 'preprocessing')
    isValidEle = _.find(preProcessingList, function(p){ return p.toLowerCase() == pcs.pcs_nm.toLowerCase()})
  if(type == 'processing')
    isValidEle = _.find(processingList, function(p){ return p.toLowerCase() == pcs.pcs_nm.toLowerCase()})
  if(type == 'validation')
    isValidEle = _.find(validation, function(p){ return p.toLowerCase() == pcs.pcs_nm.toLowerCase()})
  if(type == 'housekeeping')
    isValidEle = _.find(houseKeeping, function(p){ return p.toLowerCase() == pcs.pcs_nm.toLowerCase()})


  return isValidEle;
}

navTabs(nav){
  this.activeNavBlock = nav;
}

getOrgs() {
  this.service.post(this.service.get_orgs, {}).subscribe(res => {
    console.log(res);
    this.organizations = res;
    //this.selectedOrg = this.org_id;
  }, (err) => {
    alert('err');
  });

}

}