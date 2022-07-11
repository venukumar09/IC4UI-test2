import { Component, OnInit, ViewChildren } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';

import {NouisliderModule} from "ng2-nouislider";
import Stepper from 'bs-stepper';

@Component({
  selector: "app-streaming-dq",
  templateUrl: "./streaming-dq.component.html",
  styleUrls: ["./streaming-dq.component.scss"],
})
export class StreamingDqComponent implements OnInit {
  stepper: Stepper;

  userId = "";
  roleId = "";
  orgId = "";
  showDetails = false;

  objId = "";
  tableDetails: any;
  columnDetails: any;

  configDqRules = false;

  processTypes = ["BATCH", "STREAMING"];
  connectorTypes = ["KAFKA"];
  connectorVersion = "2.1.0";
  srcFilePath = "hdfs:///griffin/streaming/dump/source";
  srcFileType = "json";
  timeInterval = "10s";
  timeDelay = "0";
  timeRange = {
    min: "-5m",
    max: "0",
  };

  someRange = "1";
  jobName ='';

  jobJson: any = {
    name: "",
    "process.type": "",
    "data.sources": [
      {
        name: "src",
        baseline: true,
        connectors: [
          {
            type: "",
            version: "",
            config: {
              "kafka.config": {
                "bootstrap.servers": "kafka:9092",
                "group.id": "griffin",
                "auto.offset.reset": "largest",
                "auto.commit.enable": "false",
              },
              topics: "dq_realtime",
              "key.type": "java.lang.Integer",
              "value.type": "java.lang.String",
            },
            "pre.proc": [
              {
                "dsl.type": "df-opr",
                rule: "from_json",
              },
            ],
          },
        ],
        checkpoint: {
          type: "",
          "file.path": "",
          "info.path": "source",
          "ready.time.interval": "10s",
          "ready.time.delay": "0",
          "time.range": [], // "-5m", "0"
          updatable: true,
        },
      },
    ],
    "evaluate.rule": {
      rules: []
    },
    "sinks": ["CONSOLE","HDFS","ELASTICSEARCH"]
  };

  constructor(
    private service: ApiService,
    private loader: NgxSpinnerService,
    private route: ActivatedRoute,
    private locStorage: LocalStorageService,
    private toastr: ToastrService
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

  next() {
    this.stepper.next();
    this.jobJson["data.sources"][0].connectors[0]["version"] = this.connectorVersion;
    this.jobJson["data.sources"][0].connectors[0]["config"]['topics'] = this.tableDetails.assetName;
    this.jobJson["data.sources"][0].checkpoint['type'] = this.srcFileType
    this.jobJson["data.sources"][0].checkpoint['file.path'] = this.srcFilePath
    this.jobJson["data.sources"][0].checkpoint["ready.time.interval"] = this.timeInterval;
    this.jobJson["data.sources"][0].checkpoint["ready.time.delay"] = this.timeDelay;
    this.jobJson["data.sources"][0].checkpoint["time.range"] = [this.timeRange.min,this.timeRange.max];
  }

  getObjDetails = (objId) => {
    this.loader.show();
    this.service
      .post(this.service.streamingDQAssetDetails_ep, {
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
            this.showDetails = true;

            this.stepper = new Stepper(document.querySelector("#stepper1"), {
              linear: false,
              animation: true,
            });

            setTimeout(() => this.getStreamingRulesForObj(),0);
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

  getStreamingRulesForObj(){
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

  modifyJobName(){
    this.jobJson['name']=this.tableDetails.assetName + '-' + this.jobName;
  }

  dqSource: any;

  dqRulesEdit(itm) {
    this.dqSource = {
      obj_id: this.tableDetails.id,
      obj_prpt_id: itm.id,
      obj_prpt: itm,
      rul_type: 'metric'
    };
    this.configDqRules = true;
  }

  showDqRules($event) {
    this.configDqRules = $event;
  }

  connectorTypeChange(eve) {
    this.jobJson["data.sources"][0].connectors[0]["type"] = eve;
    console.log(this.jobJson);
  }

  processTypeChange(eve) {
    this.jobJson["process.type"] = eve;
    console.log(this.jobJson);
  }

  finalRules(eve) {``
    console.log(eve);
     this.getStreamingRulesForObj();
// debugger
//     this.columnDetails.forEach((e) => {
//       e.rules = [];
//       e.obj_prpt_id = e.id;
//     });

//     for (let i = 0; i < this.columnDetails.length; i++) {
//       const ele1 = this.columnDetails[i];
//       for (let j = 0; j < eve.length; j++) {
//         const ele2 = eve[j];
//         if (ele1.id === ele2.obj_prpt_id) {
//           this.columnDetails[i].rules = ele2.rules;
//         }
//       }
//     }
//     console.log(this.columnDetails);

    // for (let i = 0; i < this.columnDetails.length; i++) {
    //   const ele = this.columnDetails[i];

    // }
    //_______________________//
    // this.prepareFinalJson();
  }

   prepareFinalJson() {
    this.jobJson['name']= this.jobName;
  }

   pushRulesToJobJson() {

    this.jobJson["evaluate.rule"]['rules'] = [];

    for (let i = 0; i < this.columnDetails.length; i++) {
      for (let j = 0; j < this.columnDetails[i].rules.length; j++) {
        const rule = this.columnDetails[i].rules[j];
        debugger;
        if (rule.dq_type.toLowerCase() !== "distinct") {
          const data = {
            "dsl.type": "griffin-dsl",
            "dq.type": rule.dq_type,
            "out.dataframe.name": `${this.columnDetails[i].assetName}_${rule.rul_nm}`,
            rule: rule.tfm_rul_txt,
            out: [
              {
                type: "metric",
                name: `${this.columnDetails[i].assetName}_${rule.rul_nm}`,
                "flatten": "array"
              },
            ],
          };

          this.jobJson["evaluate.rule"]["rules"].push(data);
        }
        else {
          const data = {
            "dsl.type": "griffin-dsl",
            "dq.type": rule.dq_type,
            "out.dataframe.name": `${this.columnDetails[i].assetName}_${rule.rul_nm}`,
            rule: rule.tfm_rul_txt,
            details: {
              source: "src",
              target: "src",
              total: "total",
              distinct: "distinct",
              dup: "dup",
              num: "num",
              "duplication.array": "dup",
              accu_dup: "dup_count",
              "with.accumulate": false,
            },
            out: [
              {
                type: "metric",
                name: "distinct",
              },
              {
                type: "metric",
                name: "distinct_hdfs",
              },
            ],
          };
          this.jobJson["evaluate.rule"]["rules"].push(data);
        }
      }
    }

    const static_data =     {
      "dsl.type": "griffin-dsl",
      "dq.type": "PROFILING",
      "out.dataframe.name": "RECORD_COUNT_RECORDCOUNT",
      "rule": "select count(*) as total_record_count from src ",
      "out": [
        {
          "type": "metric",
          "name": "RECORD_COUNT_RECORDCOUNT",
          "flatten": "array"
              }
      ]
    }

    this.jobJson["evaluate.rule"]['rules'].push(static_data);
  }

  saveJob() {
    console.log(this.jobJson);
    //http://18.216.183.15:5000
    let url = '';
    this.service
    .post(this.service.getStreamingJobURL_ep,this.jobJson).subscribe((res)=>{
      url = res.url;
      this.service
      .post(`${url}/api/jobs/trigger`,this.jobJson).subscribe(()=>{
        this.toastr.success('Job Submitted Successfully');
      },
      err => {
        this.toastr.error('Got Error While Triggering The Job.Please Try Again.');
        this.toastr.info(err);
        console.log(err);
      });
    },
    err => {
      this.toastr.error('Got Error.PLease Try Again.');
    });
  }
}
