import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { debug } from 'util';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {

  @Input() data: any;
  @Output() sourceStatus = new EventEmitter();

  _job = {
    "job_name": "demo_test_v887",
    "queries_json": [],
    "flow_json": [],
    "calendar_nm": "daily_clndr",
    "schedule_nm": "SCH_Daily",
    "job_template": "",
    "job_eff_strt_dt": "2020-04-01",
    "sch_eff_strt_dt": "2020-04-01",
    "sch_strt_tm": "01:32:00",
    "sla_strt_tm": "01:32:00",
    "sla_end_tm": "01:32:00",
    "sla_offset_day_count": "10",
    "predecessor_cond": "",
    "predecessor_cond_type": "",
    "support_group_email": "",
    "frequency": "Daily",
    "job_priority_num": "",
    "maximum_run_alarm_seconds_count": "",
    "minimum_run_alarm_seconds_count": "",
    "critical_job_ind": "N",
    "financial_penality_ind": "N",
    "create_dag_ind": "N",
    "next_buss_ind": "N",
    "database_name": "gathi_kal",
    "table_name": "test_123",
    "data_mode": "Overwrite",
    "usr_id": "gathi_da1",
    "org_id": "7a19597c1cc07aced7ff58a8002b7fd3",
    "process_id": "ce3497299d72930d2f91dffa3ff0d522",
    "lob_id": "d55dc874a89f7f06bf40a9744312aefd",
    "apn_id": "a903995f5cca450ce5e256fc7487bb3c"

  }

  job = {
    jobId :'',
    jobName: '',
    queries: { output_table_name : '', query : '' },
    flow_json: [],
    slaStartTime: '00:00:00',
    slaEndTime: '13:00:00',
    slaOffsetDays: '0',
    frequency: 'Daily',
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
    scheduleCalenderName: '',
    nextBsndayIndicator: '',
    cronExpression: '',
    isCronExpression: 'N',
    impact: 'medium',
    supportGroup: '',
    ticketing_system_type: 'gathi',
    "financial_penality_ind": "N",
    "create_dag_ind": "N",
    "next_buss_ind": "N",
    "database_name": "",
    "process_id": "ce3497299d72930d2f91dffa3ff0d522",
    "usr_id": '',
    "org_id": '',
    connId: ''
  }

  org_id = ''; org_nm = ''; roleId = ''; userId = '';

  allCalenderNames = []
  uniqueCalenderNames = []
  calenderNames = []

  allScheduleNames = []
  uniqueScheduleNames = []
  scheduleNames = []

  schffectiveStartDate: any;
  filterScheduleNames: any[];
  dagindicators = [];
  criticalindicators = [];
  financialpenaltyindicators = [];
  effectiveStartDate: any = ''


  constructor(private service: ApiService,
    private storage: LocalStorageService,
    private loader: NgxSpinnerService,
    private toastr: ToastrService) {

    this.org_id = this.storage.retrieve('orgid');
    this.org_nm = this.storage.retrieve('orgName');
    this.roleId = this.storage.retrieve('roleId');
    this.userId = this.storage.retrieve('userId');
  }

  ngOnInit() {
    debugger;
    this.job.queries = this.data.queries;
    this.job.flow_json = this.data.flow_json;
    this.job.org_id = this.org_id;
    //this.job.usr_id = this.userId;
    this.job.usr_id = 'hduser'
    this.job.jobName = this.data.job.name;
    this.job.jobId = this.data.job.id;
    this.job.connId = this.data.job.connId;
    this.getCalenderNames();
    this.getScheduleNames();

    //this.job.queries = [
    //  {
    //    "query": "select Account_no as Account_no, Cust_Name as Cust_Name, Address1 as Address1, City as City, State as State, PIN as PIN, rec_id as rec_id, run_id as run_id, eff_strt_ts as eff_strt_ts, eff_end_ts as eff_end_ts from gathi_ins_intgn_v.Account_dtl_v",
    //    "output_table_name": "M1"
    //  },
    //  {
    //    "query": "select C_CUSTKEY as C_CUSTKEY, C_NAME as C_NAME, C_ADDRESS as C_ADDRESS, C_NATIONKEY as C_NATIONKEY, C_PHONE as C_PHONE, C_ACCTBAL as C_ACCTBAL, C_MKTSEGMENT as C_MKTSEGMENT, C_COMMENT as C_COMMENT from TPCH_SF1.CUSTOMER",
    //    "output_table_name": "M0"
    //  },
    //  {
    //    "query": "select M0.C_CUSTKEY as C_CUSTKEY, M1.Account_no as Account_no, M0.C_NAME as C_NAME, M1.Cust_Name as Cust_Name, M0.C_ADDRESS as C_ADDRESS, M1.Address1 as Address1, M0.C_NATIONKEY as C_NATIONKEY, M1.City as City, M0.C_PHONE as C_PHONE, M1.State as State, M0.C_ACCTBAL as C_ACCTBAL, M1.PIN as PIN, M0.C_MKTSEGMENT as C_MKTSEGMENT, M1.rec_id as rec_id, M0.C_COMMENT as C_COMMENT, M1.run_id as run_id, M1.eff_strt_ts as eff_strt_ts, M1.eff_end_ts as eff_end_ts from M0 Full Join M1 on M0.C_CUSTKEY=M1.Account_no",
    //    "output_table_name": "J0"
    //  }
    //]
  }

  getCalenderNames() {
    this.uniqueCalenderNames = [];
    this.calenderNames = [];
    const params = {};
    this.loader.show();
    this.service.post(this.service.calenderNames_ep, params).subscribe(res => {
      this.allCalenderNames = res;
      this.loader.hide();
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
        this.loader.hide();

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
    console.log(seleffstartdt)
    this.job.effectiveStartDate = seleffstartdt
  }

  selectedScheduleEffStartDt(selscheffdt) {
    console.log(selscheffdt)
    this.job.scheduleeffectiveStartDate = selscheffdt
  }

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

  cancel() {
    this.sourceStatus.emit({ data: [], update: false });
  }

  submit() {
    console.log(this.job)
    this.loader.show();
    // const submit_dim_job = "http://18.225.20.207:8001/api/dim_scheduler/"; // COD Server
    const submit_dim_job = "https://qaapi.gathi.in/api/dq/cde/job/trigger/"; // COD Server
    this.service.post(submit_dim_job, this.job).subscribe((res) => {
      console.log(res)
      this.loader.hide();
      // alert('Job submitted successfully!!!');
      this.toastr.success('Job submitted successfully!!!');
      this.cancel();
    }, err => {
      this.loader.hide();
      // alert('Got error while submitting the job!!!');
      this.toastr.error('Got error while submitting the job!!!');
    });
  }

}

//interface data {
//  queries: Array<{}>;
//  flow_json: Array<{}>
//}
