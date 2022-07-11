import { Component, OnInit, ɵConsole } from '@angular/core';
import Stepper from 'bs-stepper';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/services/api.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import * as _ from 'underscore';

import * as $$ from 'jquery';
declare var $:any;

@Component({
  selector: 'app-form-based-ingestion',
  templateUrl: './form-based-ingestion.component.html',
  styleUrls: ['./form-based-ingestion.component.scss']
})
export class FormBasedIngestionComponent implements OnInit {
  private stepper: Stepper;
  isAirflow: boolean;
  dagUrl: any;
  airflow_url: any;
  airflowurl: SafeResourceUrl;
  showDQRules : boolean = false;
  configDqRules = false;
  dqSource: any;
  columnDetails: any;
  constructor(private service: ApiService, private loader: NgxSpinnerService, private route: ActivatedRoute, private storage: LocalStorageService) { }


  searchText: any = "";
  mainSearchData = [];
  selected: string = '';
  register = {
    mode: ''
  }
  option = {
    mode: ''
  }
  cronjb = {
    mode: ''
  }
  public = {
    mode: ''
  }
  clone = {
    job_id: '',
    source_obj_id: '',
    target_obj_id: ''
  };
  sourceAttributes = [];
  orgId: any;
  roleId: any;
  userId: any;
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
    conn_id: '',
    conn_nm: '',
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
    file_dlmt_cd: ''
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
    conn_id: '',
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
  srcsubmit = {
    object_nm: '',
    object_type: '',
    data_platform: '',

  }

  viewSource = true;
  viewTarget = false;
  viewJob = false;
  viewstatus = false;

  isSourceCompleted = false;
  isTargetCompleted = false;
  isJobCompleted = false;
  isAirflowCompleted = false;

  finalSourceAttributes = [];

  job = {
    jobName: '',
    supportMail: '',
    description: '',
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
    impact: 'medium',
    supportGroup: '',
    ticketing_system_type: 'gathi'
  }
  previou: any;
  sourceDetails: any = [];
  // deliveryMode = 'push';
  defaultValues: any = [];
  editLobs: boolean;
  editAplications: boolean;
  isLoading = false;
  subjectAreas = [];
  actualSubjectAreas = [];
  lob = [];
  finalLob = [];
  applications = [];
  finalApplications = [];
  finalTarApplications = [];
  sites = [];
  jobs = [];
  uniqueJobs = [];
  finalJobs = [];
  organizations = [];
  targetAuditClmns = [];
  targetAttributes = [];
  uniqueTargetDbPlatforms = [];
  organs = [];
  convertedDataTypes: any;
  overideProcessParmText = {}

  showAirflow = false;
  selectedSuggJob: any;
  filterScheduleNames = []

  selectedTemplate = '';
  effectiveStartDate: any = ''
  schffectiveStartDate: any;
  selectedProcess: any = [];
  dagiframempath: any;

  // job tab start
  jobTemplates = [];
  alljobTemplates = [];
  uniqueJobTemplates = [];

  dagindicators = [];
  criticalindicators = [];
  financialpenaltyindicators = [];
  allCalenderNames = []
  uniqueCalenderNames = []
  calenderNames = []

  allScheduleNames = []
  uniqueScheduleNames = []
  scheduleNames = []
  isNewTemplate: Boolean = false;
  listofprocess:any;
  process: any = {};
  listprocess = [];
  locdata = {};
  newTemplateProcess = [];
  isNewProcess = false;
  isSaveTemplate = false;
  isEditMode = false;
  pcsObj: any = {
    pcs_nm: "",
    pcs_exe_cmd_txt: "",
    pcs_id: "",
    mandatory: [
      {
        parameter_name: "",
        parameter_value: "",
        required: true,
        type: "mandatory"
      }
    ],
    optional: [
      {
        parameter_name: "",
        parameter_value: "",
        required: true,
        type: "optional"
      }
    ],
    // overriden:[
    // {
    //   parameter_name:"",
    //   parameter_value:"",
    //   required:true,
    //   type:"overriden"
    // ]

  };

  newPcsObj = JSON.parse(JSON.stringify(this.pcsObj));

  public investmentClasses: MenuItem[] = [
    {
      icon: "euro_symbol",
      text: "currencies",
      value: "currency",
      subMenu: [
       { 
         text: 'CAD',  
         value: 'https://ca.finance.yahoo.com/quote/CADUSD=X/' 
       },
       { 
         text: 'USD', 
         value: 'https://ca.finance.yahoo.com/quote/CAD%3DX?p=CAD%3DX' 
       },
       { 
         text: 'BTC', 
         value: 'https://ca.finance.yahoo.com/quote/BTC-CAD/chart?p=BTC-CAD' 
       }
     ]
    },
    {
      icon: "local_florist",
      text: "commodities",
      value: "commodity",
      subMenu: [
        { 
          text: 'Coffee', 
          value: 'https://ca.finance.yahoo.com/quote/KC%3DF/chart?p=KC%3DF' 
        },
        { 
          text: 'Oil', 
          value: 'https://ca.finance.yahoo.com/quote/CL%3DF/chart?p=CL%3DF' 
        },
        { 
          text: 'Natural Gas', 
          value: 'https://ca.finance.yahoo.com/quote/NG%3DF/chart?p=NG%3DF' 
        }
      ]
    },
    {
      icon: "insert_chart",
      text: "indices",
      value: "index",
      subMenu: [
        { 
          text: 'S&P500', 
          value: 'https://ca.finance.yahoo.com/quote/%5EGSPC/chart?p=%5EGSPC' 
        },
        { 
          text: 'TSX', 
          value: 'https://ca.finance.yahoo.com/quote/XIU.TO/chart?p=XIU.TO' 
        },
        { 
          text: 'DOW', 
          value: 'https://ca.finance.yahoo.com/quote/%5EDJI/chart?p=%5EDJI' 
        }
      ]
   },
   {
      icon: "business",
      text: "stocks",
      value: "stock",
      subMenu: [
        { 
          text: 'APPL', 
          value: 'https://ca.finance.yahoo.com/quote/AAPL/chart?p=AAPL' 
        },
        { 
          text: 'TSLA', 
          value: 'https://ca.finance.yahoo.com/quote/TSLA/chart?p=TSLA' 
        },
        { 
          text: 'MSFT', 
          value: 'https://ca.finance.yahoo.com/quote/MSFT/chart?p=MSFT' 
        }
      ]
   }
 ];

  onItemChange(event: any) {
    this.selected = event.target.value;
    console.log(this.selected)
  }

  previous() {
    this.stepper.previous();
  }
  target_subjAreaChng() {

  }
  deliveryModeChng(val) {
    console.log(val);
    this.register.mode = val;
  }
  onSelectionpublic(val) {
    console.log(val);
    this.public.mode = val;
  }

  onSelectionChange(val) {
    console.log(val);
    this.option.mode = val;
  }
  onSelectionCron(val, val1){
    console.log(val);
    this.cronjb.mode = val;
    this.job.cronExpression = val1;
  }
  getSourceDetails() {
    const values = {
      "assetId": this.searchText,
      "userId": this.storage.retrieve("userid"),
      "orgId": this.storage.retrieve("orgid"),
    }
    console.log(values)
    this.service.post(this.service.getsourcedetails, values).subscribe((res) => {
      console.log(res)
      this.sourceAttributes = res.source_attributes;  // obj properties
      this.columnDetails = res.source_attributes;
      this.sourceDetails = res.source_details[0]; // obj details
      this.actualSubjectAreas = res.subject_areas; // subject areas
      this.lob = res.lob;    // lobs
      this.applications = res.applications;   // applications
      this.sites = res.sites; // sites
      this.jobs = res.jobs; // success jobs for clone
      this.defaultValues = res.default_data; // default values
      this.targetAuditClmns = res.default_data.audit_clms // audit clmns for target
      this.organizations = res.organizations; // organizations
      this.uniqueTargetDbPlatforms = res.unique_db_platforms;
      this.columnDetails.forEach(x =>{
        if(x.isNull == 'Y'){
          x.isNull1 = true
        }else{
          x.isNull1 = false
        }

        if(x.isPK == 'Y'){
          x.isPK1 = true
        }else{
          x.isPK1 = false
        }

        if(x.isCDC == 'Y'){
          x.isCDC1 = true
        }else{
          x.isCDC1 = false
        }
      })

      this.fillSourceDetails();
      this.filterSubjectAreas();
      // this.source.org_id = seletn;
      this.finalLob = this.lob.filter(i => i.org_id === this.source.org_id);
      console.log(this.finalLob )
      this.finalApplications = this.applications.filter(i => i.org_id === this.source.org_id);

      this.finalSourceAttributes = res.source_attributes;
console.log('**************')
console.log(this.source);
this.getCDERulesForObj();
this.getStreamingRulesForObj();
// this.getObjDetails(this.searchText);


    }, err => {
    });
  }
  getJobTemplates() {
    this.uniqueJobTemplates = [];
    this.jobTemplates = [];
    const params = {};
    this.service.post(this.service.form_jobTemplates, params).subscribe(res => {
      this.alljobTemplates = res;
      console.log(res)

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
  newTemplateSelection(flag) {
    this.newTemplateProcess = [];
    this.selectedProcess = [];
    this.job.selectedTempltId = this.job.selectedTempltId;

    this.jobTemplates.forEach(element => {
      if (this.job.selectedTempltId === element.templateId) {
        this.job.selectedTempltName = element.templateName
      }
    });
    this.selectTempletEvent();
    this.isNewTemplate = flag;
    // console.log(slectn)
    console.log(this.job.selectedTempltName)

  }
  getCalenderNames() {
    this.uniqueCalenderNames = [];
    this.calenderNames = [];
    const params = {};
    this.service.post(this.service.form_getCalenderNames, params).subscribe(res => {
      this.allCalenderNames = res;
      console.log(res)

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
    this.service.post(this.service.form_getScheduleNames, params).subscribe(res => {
      this.allScheduleNames = res;
      console.log(res)

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
      console.log('schedulename', this.scheduleNames);
      this.job.calenderName = '';
    }, err => {
    })

  }
  sendDetails() {
    // if (!this.viewstatus) {
    //   if (this.target.sub_area_nm === null || this.target.sub_area_nm === undefined || this.target.sub_area_nm === '') {
    //     // this.toaster.showwarning('Please Select Subject Area.');
    //     return;
    //   }

    //   if (this.target.obj_desc_txt.trim() === '') {
    //     // this.toaster.showwarning('Please enter the description.');
    //     return;
    //   }
    // }
    // this.loader.show();

    if (this.register.mode === 'pull' && this.source.obj_type_nm.toLowerCase() !== 'file') {
      this.source.lnd_file_nm = 'NA';
      this.source.lnd_file_path_txt = 'NA';
    }
    const src_data = {
      obj_id: this.source.obj_id,
      obj_type_nm: this.source.obj_type_nm,
      site_id: this.source.conn_id,
      dat_src_nm: this.source.conn_nm,
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
      obj_dlvr_mode_ind: this.register.mode,
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
      site_id: this.target.conn_id,
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
    // console.log(params)
    const params = {
      source: src_data,
      target: tar_data,
      target_prop: this.targetAttributes,
      source_prop: this.columnDetails
    }
    this.target.obj_id = this.source.obj_id
    this.job.inputObj = this.source.obj_id
    this.job.outputObj = this.target.obj_id
    console.log(params)
    this.stepper.next();
    this.loadInitialJobDetails();
    this.service.post(this.service.form_update_Source_target_details_ep, params).subscribe(res => {
      console.log(res)
      this.target.obj_id = res.obj_id;
      this.target.prgm_id = res.prgm_id;
      this.target.prj_id = res.prj_id;
      this.target.apn_id = res.apn_id;
      this.target.sub_apn_id = res.sub_apn_id;
      this.target.ln_of_bsn_id = res.ln_of_bsn_id;

      // bind input,output objects
      this.job.inputObj = this.source.obj_id
      this.job.outputObj = this.target.obj_id
      // this.stepper.next();
    }, err => {
    })
  }


  private fillSourceDetails() {
    const src = this.sourceDetails;
    this.source.obj_id = src.id;
    // this.source.obj_phy_nm = src.dat_src_nm;
    this.source.obj_type_nm = src.obj_type_nm;
    this.source.obj_db_pltfm_nm = src.obj_db_pltfm_nm;
    this.source.obj_schm_nm = src.obj_schm_nm;
    this.source.ln_of_bsn_nm = src.ln_of_bsn_nm;
    this.source.apn_nm = src.apn_nm;
    this.source.conn_nm = src.conn_nm;
    this.source.conn_id = src.conn_id;
    this.source.sourceLocation = src.obj_loc_path_txt;
    this.source.obj_fmt_type_nm = this.defaultValues.src_dl_raw_obj_type_nm;

    this.register.mode = src.obj_dlvr_mode_ind !== null && src.obj_dlvr_mode_ind !== '' ? src.obj_dlvr_mode_ind : 'push';
    this.source.lnd_file_nm = src.lnd_file_nm;
    this.source.sub_area_nm = ''; // src.sub_area_nm;

    if (this.source.obj_type_nm.toLowerCase() === 'file') {
      this.source.file_dlmt_cd = src.file_dlmt_cd === null || src.file_dlmt_cd === '' ? ',' : src.file_dlmt_cd.trim();
    }
    // if (src.rmv_hdr_rec_ind !== null) {
    //   this.source.removeHeaderIndicator = src.rmv_hdr_rec_ind;
    // }
    // else {
    //   this.source.removeHeaderIndicator = 'N';
    // }

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
      this.source.org_id = this.orgId;
    }


    // check lob
    if (src.ln_of_bsn_nm === null || src.ln_of_bsn_nm === '' || src.ln_of_bsn_id === '-1') {
      this.editLobs = true;
      this.source.ln_of_bsn_id = src.ln_of_bsn_id
    } else { this.editLobs = false; this.source.ln_of_bsn_id = src.ln_of_bsn_id };

    // this.lobSelectChng();

    // check application
    if (src.apn_nm === null || src.apn_nm === '' || src.apn_id === '-1') {
      this.editAplications = true;
      this.source.ln_of_bsn_id = src.ln_of_bsn_id
    } else { this.editAplications = false; this.source.apn_id = src.apn_id };

    // filter subject areas based on lob and applic
    // this.filterSubjectAreas();
  }

  filterSubjectAreas() {
    this.subjectAreas = [];
    this.subjectAreas = this.actualSubjectAreas.filter(i => i.org_id == this.source.org_id);
  }
  // drop box change events start

  organizationChange(seletn) {
    this.source.org_id = seletn;
    this.finalLob = this.lob.filter(i => i.org_id === this.source.org_id);
    console.log(this.finalLob )
    this.finalApplications = this.applications.filter(i => i.org_id === this.source.org_id);
    console.log(this.finalApplications )
    this.filterSubjectAreas();
  }
  lobSelectChng() {
    console.log(this.source.ln_of_bsn_id)
    const lob: any = this.lob.filter(i => i.ln_of_bsn_id === this.source.ln_of_bsn_id);
    if (lob.length !== 0) {
      this.source.ln_of_bsn_nm = lob[0].ln_of_bsn_nm;
      this.source.apn_id = '-1';
      // this.source.apn_nm = '';
      this.finalApplications = this.applications.filter(x => x.ln_of_bsn_id === this.source.ln_of_bsn_id);
    }
  }
  siteChange() {
    const site_id = this.source.conn_id;
    console.log(this.source.conn_id)
    if (site_id !== null || site_id !== undefined) {
      const ele = this.sites.filter(i => i.conn_id === site_id);
      this.source.conn_nm = ele[0].conn_nm;
      // console.log(this.source.conn_nm)
    }
  }

  applicationSelectChng() {

    if (this.source.apn_id !== '' && this.source.apn_id !== '0') {
      const apn: any = this.applications.filter(i => i.apn_id === this.source.apn_id);
      this.source.apn_nm = apn[0].apn_nm;
      this.source.lnd_file_path_txt = '/home/hduser/dropbox/' + apn[0].apn_nm + '/';
    }
  }
  rawZoneSiteChange() {
    this.source.dl_raw_site_id
    console.log(this.source.dl_raw_site_id)
    const dl_raw_site_id = this.source.dl_raw_site_id;
    if (dl_raw_site_id !== null || dl_raw_site_id !== undefined) {
      const ele = this.sites.filter(i => i.conn_id === dl_raw_site_id);
      this.source.conn_nm = ele[0].conn_nm;
    }
  }

  profilingSiteChange() {
    this.source.prflg_zn_site_id
    console.log(this.source.prflg_zn_site_id)
    const prflg_zn_site_id = this.source.prflg_zn_site_id;
    if (prflg_zn_site_id !== null || prflg_zn_site_id !== undefined) {
      const ele = this.sites.filter(i => i.conn_id === prflg_zn_site_id);
      this.source.conn_nm = ele[0].conn_nm;
    }
  }

  onSelectedSchedule() {
    this.allScheduleNames.forEach(element => {
      if (this.job.scheduleName === element.sch_nm) {
        // this.job.scheduleStartTime = element.sch_strt_tm
        // this.schffectiveStartDate = element.sch_eff_strt_dt
       
       
        // this.job.predccondition = element.sch_pred_cond_txt
        // this.job.scheduleCalenderName = element.clndr_nm
      }
    });
  }

  onSelectedCalender() {
    this.filterScheduleNames = [];
    this.allCalenderNames.forEach(element => {
      if (this.job.calenderName === element.clndr_nm) {
        console.log(this.job.calenderName, element.clndr_nm)
        this.job.nextBsndayIndicator = element.next_bsn_day_ind
        console.log(this.job.nextBsndayIndicator)
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
  srcnext() {
    this.srcsubmit.object_nm = this.srcsubmit.object_nm
    this.srcsubmit.object_type = this.srcsubmit.object_type
    this.srcsubmit.data_platform = this.srcsubmit.data_platform
    console.log(this.srcsubmit.object_nm)
  }

  selectedEffectiveStartDt(seleffstartdt) {
    this.job.effectiveStartDate = seleffstartdt
    console.log(this.job.effectiveStartDate )
  }

  selectTempletEvent() {
    const selTempltId = this.job.selectedTempltId;
    if (selTempltId !== null && selTempltId !== undefined && selTempltId != 'new') {
      this.isNewTemplate = false;
      const ele = this.jobTemplates.filter(i => i.templateId === selTempltId);
      let req = { template_id: this.job.selectedTempltId }
      if (ele && ele[0])
        this.job.selectedTempltName = ele[0].templateName;
      // this.service.post(this.service.getProcessList, req).subscribe(result => {
      //   this.process = result
      //   console.log(this.process)
      //   console.log(this.process.length)
      //   for(let i = 0; i< this.process.length;i++){
      //     // console.log(this.process[i].parm_type,this.process[i].parm_nm_txt,this.process[i].parm_val_txt,this.process[i].pcs_parm_id);
      //     this.locdata={
      //       "pcs_nm": this.process[i].pcs_nm,
      //       "parm_nm_txt" : this.process[i].parm_nm_txt,
      //       "parm_val_txt" : this.process[i].parm_val_txt,
      //       "parm_type" : this.process[i].parm_type,
      //       "pcs_id" : this.process[i].pcs_id,
      //       "pcs_parm_id" : this.process[i].pcs_parm_id,
      //       "pcs_ord_nbr" : 1,
      //       "isOverriden" : false
      //     }
      //     this.listprocess.push(this.locdata)
      //   }
      //   console.log(this.listprocess);
      // }, err => {
      //   this.loader.hide();
      // })

      this.service.post(this.service.getProcessByTemplate, req).subscribe(result => {
        this.loader.hide();
        this.newTemplateProcess = this.setProcessByParamType(result, false);
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

  goToView(type: string) {
    // this.stepper.next();
    switch (type) {
      case 'SRC':
        this.viewSource = true;
        this.viewTarget = false;
        this.viewJob = false;
        this.viewstatus = false;
        this.isSourceCompleted = false;
        this.finalSourceAttributes = [];
        this.finalSourceAttributes = this.sourceAttributes.slice(0);
        // this.stepper.next();
        this.stepper.previous();

        break;
      case 'TRG':
        if (this.register.mode === 'push') {
          if (this.source.lnd_file_nm === null || this.source.lnd_file_nm === '') {
            // return;
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

          return;
        } else if (this.source.apn_id === null || this.source.apn_id === ''
          || this.source.apn_id === undefined || this.source.apn_id === '-1') {
          return;
        }

        // if (!this.viewJob) {

          // this.filterSubjectAreas(this.source.apn_id, this.source.ln_of_bsn_id);
          // this.filterSubjectAreas();

          // init target defaults
          // if (this.previous !== 'objectDetails') {
          //   this.target.obj_phy_nm = this.source.obj_phy_nm + '_v';
          // }
          this.target.obj_type_nm = this.defaultValues.trg_obj_type_nm;
          this.target.obj_schm_nm = this.defaultValues.trg_schema_nm;
          this.target.obj_db_pltfm_nm = this.defaultValues.trg_obj_db_pltfm_nm;
          this.target.conn_id = this.defaultValues.trg_site_id;
          this.target.obj_lyr_nm = this.defaultValues.trg_obj_lyr_nm;
          this.target.dat_src_nm = this.defaultValues.trg_dat_src_nm;

          // this.source.sub_area_nm = '';

          // this.setTargetAttributes();
          // get converted dataTypes
          this.updateSourceColumns();
          // setTimeout(() => {
          //   this.getConvertedDataTypes();
          // }, 1000);
          

          if (this.clone.job_id === undefined || this.clone.job_id === null || this.clone.job_id === '') {
            this.target.obj_loc_path_txt = this.defaultValues.target_location + this.source.sub_area_nm;
            this.target.ln_of_bsn_id = this.source.ln_of_bsn_id;
            this.target.ln_of_bsn_nm = this.source.ln_of_bsn_nm;
            this.target.apn_id = this.source.apn_id;
            this.target.apn_nm = this.source.apn_nm;
          }
          this.target_lobSelectChng();
        // }
        this.viewSource = false;
        this.viewTarget = true;
        this.viewJob = false;
        this.viewstatus = false;
        this.isSourceCompleted = true;
        this.isTargetCompleted = false;
        
        this.stepper.next();
        break;
      case 'SCH':

        // for job fill dropdowns end
        this.viewTarget = false;
        this.viewSource = false;
        this.viewJob = true;
        this.viewstatus = false;
        this.isTargetCompleted = true;
        this.isJobCompleted = false;
        this.isAirflowCompleted = false;

        this.loadInitialJobDetails();
        this.stepper.previous();
        // this.submitInjectionData();

        break;
      case 'AIR':
        document.getElementById('airflowFrame').onload = () => {
          this.viewTarget = false;
          this.viewSource = false;
          this.viewJob = false;
          this.viewstatus = true;
          this.isJobCompleted = true;
          this.isAirflowCompleted = false;
          this.showAirflow = true;
        };
        break;
      default:
        break;
    }
  }
  loadInitialJobDetails() {

    this.effectiveStartDate = Date.now()
    this.schffectiveStartDate = Date.now()
    this.dagindicators = [{ isdragindicator: 'Y' }, { isdragindicator: 'N' }]
    this.criticalindicators = [{ iscriticalindicator: 'Y' }, { iscriticalindicator: 'N' }]
    this.financialpenaltyindicators = [{ isfinapenaltyindicator: 'Y' }, { isfinapenaltyindicator: 'N' }]
  }
  getConvertedDataTypes() {
    this.target.obj_db_pltfm_nm = this.defaultValues.trg_obj_db_pltfm_nm
    this.target.conn_id = this.defaultValues.trg_site_id
    this.target.obj_schm_nm = this.defaultValues.trg_schema_nm
    this.target.obj_phy_nm = this.defaultValues.trg_obj_type_nm
    const data = {
      target: {
        sitte_id: this.target.conn_id,
        obj_schm_nm: this.target.obj_schm_nm,
        obj_phy_nm: this.target.obj_phy_nm
      },
      src_obj_id: this.source.obj_id,
      src_obj_pltfm_nm: this.source.obj_db_pltfm_nm,
      tar_obj_pltfm_nm: this.target.obj_db_pltfm_nm
    }
    console.log(data)
    this.service.post(this.service.form_convertDataTypes_ing, data).subscribe(
      res => {
        this.convertedDataTypes = res;
        console.log(this.convertedDataTypes)
        this.setTargetAttributes();
      },
      err => {
        // this.next();

        const err_text = err.error.text;
        if (err_text != undefined && err_text != null && err_text != '') {
          if (err_text.indexOf('No Mapping') > -1) {
          } else {
          }
        } else {
        }
      }
    );
  }
  setTargetAttributes() {
    this.loader.show();
    this.targetAttributes = [];
    this.targetAttributes = this.convertedDataTypes;
    console.log(this.targetAttributes)
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

    this.loader.hide();
  }
  target_lobSelectChng() {
    // this.target.apn_id = '-1';
    this.finalTarApplications = this.applications.filter(x => x.ln_of_bsn_id === this.target.ln_of_bsn_id)
  }

  submitInjectionData(){

    // console.log('hi')
    const jobeffdt: HTMLInputElement = <HTMLInputElement>document.getElementById('jobeffectiveStartdate');
    this.job.effectiveStartDate = jobeffdt.value
    // console.log(this.job.effectiveStartDate)
    console.log(this.listprocess)
    const scheffdt: HTMLInputElement = <HTMLInputElement>document.getElementById('scheffectivestartdate');
    this.job.scheduleeffectiveStartDate = scheffdt.value

    let d1 = new Date(this.job.scheduleeffectiveStartDate); 
    let d2 = new Date(this.job.effectiveStartDate);
    if (d1 > d2) {
      console.log('Job effective start date must be greater than or equal to schedule effective start date.')
      return;
    }
    if (this.job.jobName === undefined || this.job.jobName === '') {
      console.log("empty job name")
      return;
    }

    if (this.job.calenderName === undefined || this.job.calenderName === '') {
      console.log("empty calender name")
      return;
    }

    if (this.job.scheduleName === undefined || this.job.scheduleName === '') {
      console.log("empty Schedule name")
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
    // console.log(this.job)
    let finalJsonData: any;
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
      'ovrd_pcs_parm_txt': this.overideProcessParmText,
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
      'org_id': this.orgId,
      'process': this.listprocess,
      'job_type': 'Ingestion',
      'is_free_cron_expre': this.job.isCronExpression,
      'cron_expression': this.job.cronExpression,
      'impact' : this.job.impact,
      'support_group' : 'this.job.supportGroup',
      'ticketing_system_type' : this.job.ticketing_system_type
    }]
    console.log(finalJsonData)
    this.isAirflow = true;
    this.stepper.next();
    this.service.post(this.service.form_injectionUrl, finalJsonData).subscribe(res => {
      console.log(res)
      let dag = res[0];
      // if (this.previous == 'objectDetails') {
      //   dag = res.dag_id
      // }
      dag = res.dag_id
      console.log('*_____*')
      console.log(dag)
      this.isAirflow =true
      this.stepper.next();
      // const message = 'Creating Job...';
      // setTimeout(() => {
      //   this.toast.showsuccess(message);
      //   this.dag_redirect(dag);
      // }, 5000);

    }, err => {

    })
  }

  ngOnInit() {

    this.userId = this.storage.retrieve('userId');
    this.roleId = this.storage.retrieve('roleId');
    this.orgId = this.storage.retrieve('orgId');
    const data: any = this.storage.retrieve('urls');
    this.dagUrl = data.airflow_dag;
    this.airflow_url = data.airflow;
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: true,
      animation: true
    });
    this.route.paramMap.subscribe(params => {
      this.searchText = params.get('id')
      this.source.obj_id = params.get('id');

      this.route.queryParams.subscribe(qparams => {
        this.previou = qparams.pre;
        this.source.obj_phy_nm = qparams.name;
        if (this.previou == 'objectDetails') {
          this.clone.job_id = qparams.jobid
          console.log(this.clone.job_id)
        }
      });
    });
    console.log(this.searchText)
    console.log(this.clone)
    this.getSourceDetails();
    this.getJobTemplates();
    this.getCalenderNames();
    // this.getupdatetarget();
    this.getScheduleNames();
    this.getProcessList();

  }
 
  gotoDQRules(){
    this.dqSource = {
      // obj_id: this.tableDetails.id,
      // obj_prpt_id: itm.id,
      // obj_prpt: itm,
      obj_id: this.columnDetails[0],
      obj_prpt_id:this.columnDetails[0],
      obj_prpt: this.columnDetails[0],
       rul_type: "CDE",
    };
     this.showDQRules = true;
  }

  showDqRules($event) {
    this.showDQRules = false;
    this.configDqRules = $event;
  }
  finalRules(eve) {
    this.getStreamingRulesForObj();
  }

  backFromDq(){
    this.showDQRules = false;
  }

  getStreamingRulesForObj() {
    this.loader.show();
    this.service
      .post(this.service.getStreamingDqRulesByObj_ep, {
        objId: this.searchText,
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
            // this.toastr.info("No Data Found!");
          }
          this.loader.hide();
        },
        (err) => {
          this.loader.hide();

          // this.toastr.error("Got error!. While getting rules.");
        }
      );
  }

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

  editProcess(p, index) {
    this.isEditMode = true;
    console.log(p);
    console.log(this.newTemplateProcess);
    //this.process = p;
    this.isNewProcess = true;
    this.newPcsObj = JSON.parse(JSON.stringify(p));
  }

  saveProcess() {

    let finalObj = [];
    finalObj.push(this.newPcsObj.mandatory);
    finalObj.push(this.newPcsObj.optional);
   
    // if (!this.isPcsValid(this.newPcsObj)) {
    //   this.toast.showerror('Please enter parameter details');
    //   return;
    // }
    this.cancelProcess();

  }

  cancelProcess() {
    this.newPcsObj = JSON.parse(JSON.stringify(this.process));
    this.isNewProcess = false;
    this.isEditMode = false;
  }

  submitData(type){

    console.log(this.source)

    if(this.job.jobName == ''){
      alert('Please Enter Job Name');
      return;
    }

    if(this.job.supportMail == ''){
      alert('Please Enter Support Group Mail');
      return;
    }

    if(this.job.selectedTempltId == '' || this.job.selectedTempltId == null || this.job.selectedTempltId == undefined){
      alert('Please Select Template');
      return;
    }

    // for run now
    if(type == 'r'){
      this.job.effectiveStartDate = new Date().getFullYear()+'-'+ new Date().getMonth()+'-'+new Date().getDate() ;
      this.job.scheduleeffectiveStartDate = new Date().getFullYear()+'-'+ new Date().getMonth()+'-'+new Date().getDate() ;
      this.job.calenderName = 'run now';
      this.job.scheduleName = 'run now' ;
      this.job.scheduleStartTime = new Date().getHours()+':'+new Date().getMinutes();
      this.job.slaStartTime = new Date().getHours()+':'+new Date().getMinutes();
      this.submitInjestionDataApi();
    }else if(type == 'sc'){   // for schedule

      if(this.job.calenderName == '' || this.job.calenderName == null || this.job.calenderName == undefined){
        alert('select calendar name');
        return;
      }

      if(this.job.scheduleName == '' || this.job.scheduleName == null || this.job.scheduleName == undefined){
        alert('select schedule name');
        return;
      }

      const jobeffdt: HTMLInputElement = <HTMLInputElement>document.getElementById('jobeffectiveStartdate');
      this.job.effectiveStartDate = jobeffdt.value
      // console.log(this.job.effectiveStartDate)
      console.log(this.listprocess)
      const scheffdt: HTMLInputElement = <HTMLInputElement>document.getElementById('scheffectivestartdate');
      this.job.scheduleeffectiveStartDate = scheffdt.value
  
      let d1 = new Date(this.job.scheduleeffectiveStartDate); 
      let d2 = new Date(this.job.effectiveStartDate);
      if (d1 > d2) {
        console.log('Job effective start date must be greater than or equal to schedule effective start date.');
        alert("Job effective start date must be greater than or equal to schedule effective start date.");
        return;
      }
      this.submitInjestionDataApi();
    }else{  // for save
      this.submitInjestionDataApi();
    }



    


  }

  submitInjestionDataApi(){

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

    var finalJsonData = [{
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
      'ln_of_bsn_id': this.source.ln_of_bsn_id, //this.target.ln_of_bsn_id,
      'prgm_id': this.target.prgm_id,
      'prj_id': this.target.prj_id,
      'apn_id': this.source.apn_id, //this.target.apn_id,
      'sub_apn_id': this.target.sub_apn_id,
      'clndr_nm': this.job.calenderName,
      'job_frq_txt': this.job.frequency,
      'job_eff_strt_dt': this.job.effectiveStartDate,
      'job_sla_strt_tm': this.job.slaStartTime,
      'job_sla_end_tm': this.job.slaEndTime,
      'sla_offset_days_cnt': this.job.slaOffsetDays,
      'next_bsn_day_ind': '',
      'ovrd_pcs_parm_txt': this.overideProcessParmText,
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
      'org_id': this.orgId,
      'process': process, //this.newTemplateProcess, // this.listprocess,
      'job_type': 'Ingestion',
      'is_free_cron_expre': this.job.isCronExpression,
      'cron_expression': this.job.cronExpression,
      'impact' : this.job.impact,
      'support_group' : this.job.supportMail,
      'ticketing_system_type' : this.job.ticketing_system_type
    }]
    console.log(JSON.stringify(finalJsonData))


    this.service.post(this.service.form_injectionUrlNew, finalJsonData).subscribe(res => {
      console.log(res);
      if(res[0].status == 'success'){
        alert('Success');
        $('#myModal').modal('hide');

      }
    }, err =>{
      console.log(err);
    });
  }

  parmChange(obj, index, type) {
    obj['isOverriden'] = true;
    let i = _.findIndex(this.newTemplateProcess, { pcs_id: obj.pcs_id });
    this.newTemplateProcess[i][type][index] = obj;
    console.log(this.newTemplateProcess[i][type][index]);
    console.log(obj);
  }

  removeProcess(p, i) {
    
    if (this.isEditMode)
      this.cancelProcess();
    this.newTemplateProcess.splice(i, 1);
   

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

  schedule(){
    if(this.job.jobName == ''){
      alert('Please Enter Job Name');
      return;
    }

    if(this.job.supportMail == ''){
      alert('Please Enter Support Group Mail');
      return;
    }

    if(this.job.selectedTempltId == '' || this.job.selectedTempltId == null || this.job.selectedTempltId == undefined){
      alert('Please Select Template');
      return;
    }

    $('#myModal').modal('show')
  }

  // columnDetails: any;
  
  // getObjDetails = (objId) => {
  //   this.loader.show();
  //   this.service
  //     .post(this.service.cdeDqAssetDetails, {
  //       type: "T",
  //       assetId: objId,
  //       userId: this.userId,
  //     })
  //     .subscribe(
  //       (result) => {
  //         this.loader.hide();
  //         if (result.table.length > 0) {
            
  //           this.columnDetails = result.columns;
  //           this.columnDetails.forEach(x =>{
  //             if(x.isNull == 'Y'){
  //               x.isNull1 = true
  //             }else{
  //               x.isNull1 = false
  //             }

  //             if(x.isPK == 'Y'){
  //               x.isPK1 = true
  //             }else{
  //               x.isPK1 = false
  //             }
  //           })
         
  //           setTimeout(() => this.getCDERulesForObj(), 0);
  //         } else {
            
  //         }
  //       },
  //       (err) => {
  //         this.loader.hide();
          
  //       }
  //     );
  // };

  getCDERulesForObj() {
    this.loader.show();
    this.service
      .post(this.service.getCDEDqRulesByObj, {
        objId: this.searchText , //this.objId,
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
            //  this.toastr.info("No Data Found!");
          }
          this.loader.hide();

      
        },
        (err) => {
          this.loader.hide();
          //  this.toastr.error("Got error!. While getting rules.");
        }
      );
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
  // dqSource: any;
  // configDqRules = false;
  dqRulesEdit(itm) {
    this.dqSource = {
      obj_id: this.searchText,
      obj_prpt_id: itm.id,
      obj_prpt: itm,
      rul_type: "CDE",
    };
    this.configDqRules = true;
   
  }

  changeSelection(value, index, type){
    if (type == 'null' ){
      this.columnDetails[index].isNull = (value == true? 'Y':'N')
    }

    if (type == 'pk' ){
      this.columnDetails[index].isPK = (value == true? 'Y':'N')
    }

    if (type == 'cdc' ){
      this.columnDetails[index].isCDC = (value == true? 'Y':'N')
    }
  }

  updateSourceColumns(){
    this.loader.show();
    var obj = {
      source_prop: this.columnDetails
    }
    this.service.post(this.service.updateSourceColumns,obj)
      .subscribe(res =>{
        console.log(res);
        this.getConvertedDataTypes();
      }, err =>{
        alert('Got error while updating.')
      })
  }
  pcs_list = [];
  processByType = [];
  getProcessList() {
    const req = {
      userId: this.userId,
      orgId: this.orgId
    }
    this.service.post(this.service.getProcessList, req).subscribe(res => {
      console.log(res);
      this.pcs_list = res;
      var data = _.uniq(_.pluck(this.pcs_list, 'param_grp_nm'));
      console.log(data);
      var parr = [];
      for (let i = 0; i < data.length; i++) {
        var obj = { param_grp_nm: data[i], types: [] };
        var listByType = _.where(this.pcs_list, { param_grp_nm: data[i] })
        var dataBytype = _.uniq(_.pluck(listByType, 'pcs_type_nm'));
        console.log(dataBytype);
        //var parr = [];
        for (let i = 0; i < dataBytype.length; i++) {
          var obj1 = { pcs_type_nm: dataBytype[i], process: _.where(this.pcs_list, { pcs_type_nm: dataBytype[i] }) };
          obj.types.push(obj1);
        }
        parr.push(obj);
      }

      console.log(parr);
      for (let j = 0; j < parr.length; j++) {
        for (let k = 0; k < parr[j].types.length; k++) {
          parr[j].types[k].process = this.setProcessByParamType(parr[j].types[k].process, false);

        }
      }
      console.log(parr);
      this.processByType = parr;
    }, err => {
      this.loader.hide();
      console.log('Unable to get the existing process.Please Try Again.')
    })
    

  }

  addProcess(e, type) {
    let pcs = JSON.parse(JSON.stringify(this.process));
    if (type && type == 'list') {
      console.log(e);

      pcs = JSON.parse(JSON.stringify(e));
    }
    else {
      // if (pcs.pcs_nm === '') {
      //   this.toaster.showwarning('Please enter process name.');
      //   return;
      // }
      // if (pcs.pcs_exe_cmd_txt === '') {
      //   this.toaster.showwarning('Please provide process command.');
      //   return;
      // }
      // if (pcs.pcs_parm_txt === '') {
      //   this.toaster.showwarning('Please enter valid parameters.');
      //   return;
      // }
    }
    pcs["pcs_ord"] = this.newTemplateProcess.length + 1;
    this.newTemplateProcess.push(pcs);
    console.log(this.newTemplateProcess);

  }
}

export interface MenuItem {
  icon: string;
  text: string;
  value: string;
  subMenu: Array<{
    text: string;
    value: string;
  }>
}

