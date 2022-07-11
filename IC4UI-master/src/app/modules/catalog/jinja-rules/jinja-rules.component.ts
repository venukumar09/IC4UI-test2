import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';

import {NouisliderModule} from "ng2-nouislider";
import Stepper from 'bs-stepper';

import * as $$ from 'jquery';
declare var $:any;
import 'datatables.net';
import 'datatables.net-bs4';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: "app-jinja-rules",
  templateUrl: "./jinja-rules.component.html",
  styleUrls: ["./jinja-rules.component.scss"],
})
export class JinjaRulesComponent implements OnInit {
  stepper: Stepper;
  userId = "";
  roleId = "";
  orgId = "";

  objId = "";
  tableDetails: any;
  columnDetails: any;

  cron = {
    seconds: "",
    minutes: "",
    hours: "",
    dayOfMonth: "",
    month: "",
    dayOfWeek: "",
    year: "",
  };

  rule_str = {
    Dimension: "",
    RuleName: "",
    ruleDef: "",
    CDEName: "",
    SRCFORMATE: "",
    DATATYPE: "",
    values: "",
  };

  job = {
    JobName: "",
    JobDesc: "",
    CronExpr: "",
    Engine: "",
    Owner: "",
    App: "",
    Database: "",
    Schema: "",
    Table: "", // todo
    Location: "",
    ObjId: "",
    ObjName: "",
    Dialect: "",
    PKClms: [],
    SourceType: "",
    Rules: [],
    RunJobNow: false,
    PKClmsStr: "", // ??
    Cohort: "",
    PKIds: []
  };

  processTypes = ["Python", "Spark"];

  configDqRules = false;

  constructor(
    private service: ApiService,
    private loader: NgxSpinnerService,
    private route: ActivatedRoute,
    private locStorage: LocalStorageService,
    private toastr: ToastrService,
    private chRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = this.locStorage.retrieve("userId");
    this.roleId = this.locStorage.retrieve("roleId");
    this.orgId = this.locStorage.retrieve("orgId");

    this.route.params.subscribe((params: ParamMap) => {
      this.objId = params["id"];
      this.getObjDetails(this.objId);
      this.route.queryParams.subscribe((qparams) => {});
    });


  }

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
            this.tableDetails = result.table[0];
            this.columnDetails = result.columns;
            // this.showDetails = true;
            console.log(this.tableDetails);
            this.stepper = new Stepper(document.querySelector("#stepper1"), {
              linear: true,
              animation: true,
            });

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
        objId: this.objId,
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
            // this.toastr.info("No Data Found!");
          }
          this.loader.hide();
          const table: any = $$(".tableviewColms");
          this.dataTable = table.DataTable({
            bAutoWidth: false,
            bSort: false,
          });
        },
        (err) => {
          this.loader.hide();
          this.toastr.error("Got error!. While getting rules.");
        }
      );
  }

  jobJson: any;
  processType = "Spark";
  processTypeChange(eve) {
    this.processType = eve;
  }

  dataTable: any = {};
  goToRules() {
    // this.chRef.detectChanges();
    // const table: any = $(".tableviewColms");
    // this.dataTable = table.DataTable({
    //   bAutoWidth: false,
    //   bSort: false,
    // });
    this.stepper.next();
  }

  goToScheduleJob() {
    this.constructJobJson();
    this.stepper.next();
  }

  constructJobJson() {
    this.job.Dialect = this.processType;
    this.job.Engine = this.processType;
    this.job.App = this.tableDetails.applicationName;
    this.job.Owner = "Gaurav"; // todo
    this.job.ObjId = this.tableDetails.id;
    this.job.ObjName = this.tableDetails.assetName;
    this.job.SourceType = this.tableDetails.assetType;
    this.job.Database = this.tableDetails.dbName;
    this.job.Schema = this.tableDetails.schema;
    this.job.Table = this.tableDetails.assetName;
    this.job.Location = `${this.tableDetails.lnd_file_path_txt}${this.tableDetails.lnd_file_nm}`;
    this.job.PKClmsStr = "";
    this.job.PKClms = [];
    this.job.PKIds = [];
    this.columnDetails.forEach((ele) => {
      if (ele.isPK == "Y") {
        this.job.PKClms.push(ele.assetName);
        this.job.PKIds.push(ele.id)
      }
    });
    this.job.PKClmsStr = this.job.PKClms.toString();

    let rules = [];
    for (let index = 0; index < this.columnDetails.length; index++) {
      const clm = this.columnDetails[index];
      const clmRules = clm.rules;

      if (clmRules.length > 0) {
        for (let index = 0; index < clmRules.length; index++) {
          let rule_str = {
            Dimension: "",
            RuleId: "",
            RuleName: "",
            Rule: "",
            ObjPrprtId: clm.obj_prpt_id,
            CDEName: clm.assetName,
            DataType: clm.dataType,
            Arguments: "",
          };
          const rul = clmRules[index];
          rule_str.Dimension = rul.dq_type;
          rule_str.RuleId = rul.rul_id;
          rule_str.RuleName = rul.rul_nm;
          rule_str.Rule = rul.rule_def;
          rule_str.Arguments = rul.tfm_rul_txt;
          rules.push(rule_str);
        }
      } else {
        // rules.push(rule_str);
      }
    }
    this.job.Rules = rules;
    console.log(this.job);
  }

  goBack(stepId) {
    this.stepper.to(stepId);
  }

  showDqRules($event) {
    this.configDqRules = $event;
  }

  dqSource: any;
  dqRulesEdit(itm) {
    this.dqSource = {
      obj_id: this.tableDetails.id,
      obj_prpt_id: itm.id,
      obj_prpt: itm,
      rul_type: "CDE",
    };
    this.configDqRules = true;
  }

  finalRules(eve) {
    this.getStreamingRulesForObj();
  }

  getStreamingRulesForObj() {
    this.loader.show();
    this.service
      .post(this.service.getStreamingDqRulesByObj_ep, {
        objId: this.objId,
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

          this.toastr.error("Got error!. While getting rules.");
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

  submitJob() {
    this.job.CronExpr = `${this.cron.seconds} ${this.cron.minutes} ${this.cron.hours} ${this.cron.dayOfMonth} ${this.cron.month} ${this.cron.dayOfWeek} ${this.cron.year}`;
    let url = "http://localhost:8005/api/dq/cde/job/trigger/";
    const snoflake_ep = `https://demoapi.gathi.in/api/dq/cde/job/trigger/`; // Catalog Server
    const spark_ep ="https://qaapi.gathi.in/api/dq/cde/job/trigger/"; // "http://18.225.20.207:8000/api/dq/cde/job/trigger/"; // COD Server
    url = spark_ep;
    // if (this.job.Engine == "Spark") {
    //   url = spark_ep;
    // } else {
    //   url = spark_ep;
    // }

    this.loader.show();
    this.service.post(url, this.job).subscribe(
      (res) => {
        this.loader.hide();
        this.toastr.success("Job Submitted Successfully");
        this.router.navigate(["/home"]);
        setTimeout(() => {
          var url = 'http://af.gathi.in/admin/';
          window.open(url);
        }, 10);
      },
      (err) => {
        this.loader.hide();
        this.toastr.success("Job Submitted Successfully.");
        this.router.navigate(["/home"]);
        // this.toastr.error(
        //   "Got Error While Triggering The Job.Please Try Again."
        // );
        console.log(err);
      }
    );
  }
}
