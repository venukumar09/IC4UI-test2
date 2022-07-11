import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import * as _ from 'underscore';
import { SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2/dist/sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-curate-schedule',
  templateUrl: './curate-schedule.component.html',
  styleUrls: ['./curate-schedule.component.scss']
})
export class CurateScheduleComponent implements OnInit {

  allCalenderNames = []
  uniqueCalenderNames = []
  calenderNames = []

  allScheduleNames = []
  uniqueScheduleNames = []
  scheduleNames = []

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
    rec_lst_updt_by_id: '',
    is_public: 'N'
  }
  dagindicators = [];
  criticalindicators = [];
  financialpenaltyindicators = [];
  effectiveStartDate: any = ''
  schffectiveStartDate: any;
  selectedProcess: any = [];
  dagiframempath: any;
  airflowurl: SafeResourceUrl;
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
  org_id: any;
  org_nm: any;
  roleId: any;
  userId: any;
  newTemplateProcess: any;
  //loader: any;
  previous: string;
  clone: any;
  overideProcessParmText: any;
  defaultValues: any;
  filterScheduleNames: any[];
  deliveryMode: any;
  targetAttributes: any;
  constructor(private route: ActivatedRoute,private router: Router, private service : ApiService,private storage : LocalStorageService, private loader : NgxSpinnerService, @Inject(MAT_DIALOG_DATA) public data,public dialogRef: MatDialogRef<CurateScheduleComponent>,
    ) {
      this.org_id = this.storage.retrieve('orgid');
      this.org_nm = this.storage.retrieve('orgName');
      this.roleId = this.storage.retrieve('roleId');
      this.userId = this.storage.retrieve('userId') || this.storage.retrieve('userid');
      console.log(this.userId)
     }

  ngOnInit() {
    console.log(this.data);
    if(this.data){
      this.source = this.data.source;
      this.target = this.data.target;
      this.deliveryMode = this.data.deliveryMode;
      this.targetAttributes = this.data.targetAttributes;
      this.newTemplateProcess = this.data.newTemplateProcess;
      this.defaultValues = this.data.defaultValues;
    }
    this.getTrgObj();




    this.getCalenderNames();
    this.getScheduleNames();

  }

  getTrgObj(){
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
      rec_lst_updt_by_id : this.userId,
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
     // this.job.inputObj = this.source.obj_id
     // this.job.outputObj = this.target.obj_id


      //this.loader.hide();
      //this.goToView('SCH');
      //this.toaster.showsuccess('Records Updated Successfully.');
    }, err => {
      //this.loader.hide();
      //this.toaster.showerror('Please Try Again.');
    });
  }
 // final json
 submitInjectionData1(){
  Swal.fire({
    text: 'Job Scheduled Successfully!',
    icon: 'success',
    showConfirmButton: false,
    timer: 3500,
    width:400
  });
 }
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
  //this.loader.show();
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

  // let endpoint = this.service.injectionUrl;
  let endpoint = `http://18.225.20.207:8000/api/auto/job_template`; // COD Server
  if (this.previous == 'objectDetails') {
    endpoint = this.service.updateJobDetails_ep;
  }
this.loader.show();
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
    this.loader.hide();
    //setTimeout(() => {
      //this.toast.showsuccess(message);
      //this.dag_redirect(dag);
      this.dialogRef.close();
    //}, 5000);

  }, err => {

    this.loader.hide();
    this.dialogRef.close();
    //this.loader.hide();
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
// job start
loadInitialJobDetails() {

  this.effectiveStartDate = Date.now()
  this.schffectiveStartDate = Date.now()
  this.dagindicators = [{ isdragindicator: 'Y' }, { isdragindicator: 'N' }]
  this.criticalindicators = [{ iscriticalindicator: 'Y' }, { iscriticalindicator: 'N' }]
  this.financialpenaltyindicators = [{ isfinapenaltyindicator: 'Y' }, { isfinapenaltyindicator: 'N' }]
}
isCronExpChange(eve) {
  this.job.isCronExpression = eve.value;
}
closeSchedule(){
  this.dialogRef.close();
}
}
