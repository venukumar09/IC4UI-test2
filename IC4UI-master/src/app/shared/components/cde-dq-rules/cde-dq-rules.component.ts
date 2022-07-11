import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "ngx-webstorage";
import { NgxSpinnerService } from "ngx-spinner";
import {
  FormBuilder,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { EVENT_MANAGER_PLUGINS } from "@angular/platform-browser";
declare var $: any;
import * as cloneDeep from 'lodash/cloneDeep';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import Swal from 'sweetalert2'
@Component({
  selector: "app-cde-dq-rules",
  templateUrl: "./cde-dq-rules.component.html",
  styleUrls: ["./cde-dq-rules.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CdeDqRulesComponent implements OnInit {
  userId: any;
  roleId: any;
  orgId: any;
  dqRules = [];
  alReadyAppliedDqRules: any = [];
  finalObjDqRules: any = [];
  selected_src_for_dq: any;
  searchTextPort = "";
  searchDqRule = "";

  // sourceAttributes = [];

  @Input("source") source: any;
  showDqEdit = false;
  @Input("sourceAttributes") sourceAttributes: any;
  @Output() dqEdit = new EventEmitter<boolean>();
  @Output() finalRules = new EventEmitter<any>();

  dqRules_by_type = [];
  ruleCategory = [{ nm: "TDQ" }, { nm: "BDQ" }];

  ruleTypes = [
    { nm: "CONSISTENCY" },
    { nm: "COMPLETENESS" },
    { nm: "INTEGRITY" },
    { nm: "ACCURACY" },
    { nm: "CONFORMITY" },
    { nm: "UNIQUENESS" },
  ];

  dialectTypes = [
    { nm: "SQL92" },
    { nm: "SQlServer" },
    { nm: "Oracle" },
    { nm: "Snowflake" },
    { nm: "Spark" },
  ];

  filterDataIngestion: string = "";

  selectedNewRuleType: any;
  showAddNewRule = false;
  selectedCategory: any;

  newRuleForm = this.fb.group({
    rul_nm: [null, [Validators.required]],
    rul_desc_txt: [null, [Validators.required]],
    rul_catg_nm: [null, Validators.required],
  });

  newCustomRuleForm = this.fb.group({
    rul_nm: [null, [Validators.required]],
    rul_desc_txt: [null, [Validators.required]],
    rul_expr_dat_type: [null, [Validators.required]],
    rul_expr_logic: [null, [Validators.required]],
    rul_catg_nm: [null, Validators.required],
  });

  tdqRules: any;
  bdqRules: any;

  constructor(
    private service: ApiService,
    private router: Router,
    private locStorage: LocalStorageService,
    private loader: NgxSpinnerService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userId = this.locStorage.retrieve("userId");
    this.roleId = this.locStorage.retrieve("roleId");
    this.orgId = this.locStorage.retrieve("orgId");
    this.getDqRules();
  }

  getDqRules() {
    this.loader.show();
    // if (this.dqRules.length === 0) {
    const parms = {
      userId: this.userId,
      roleId: this.roleId,
      rule_type: this.source.rul_type,
    };
    this.service.post(this.service.getStreamingRules_ep, parms).subscribe(
      (res) => {
        this.dqRules = res.rules;
        this.dqRules = this.dqRules.map((x) => ({
          ...x,
          selected: false,
          values: "",
        }));

        // this.tdqRules = this.dqRules.filter((x) => x.rul_catg_nm == "TDQ");
        // this.bdqRules = this.dqRules.filter((x) => x.rul_catg_nm == "BDQ");

        // var groups = new Set(this.dqRules.map((item) => item.rul_catg_nm));
        var groups = new Set(this.dqRules.map((item) => item.dq_type));

        this.dqRules_by_type = [];
        groups.forEach((g) =>
          this.dqRules_by_type.push({
            name: g,
            values: this.dqRules.filter((i) => i.dq_type === g),
          })
        );

        //loading first attribute initially
        if (
          this.source.obj_prpt_id != undefined &&
          this.source.obj_prpt_id != ""
        ) {
          this.selected_src_for_dq = this.source.obj_prpt;
        } else {
          this.selected_src_for_dq = this.sourceAttributes[0];
        }
        this._finalRules = this.sourceAttributes;
        this.selectedSrcAttrToAddDq(this.selected_src_for_dq);
        this.loader.hide();
      },
      (err) => {
        this.loader.hide();
        console.log("Got Error. Please Try Again.");
      }
    );
    // }
  }

  emitt() {
    this.dqEdit.emit(this.showDqEdit);
    this.finalRules.emit(this._finalRules);
  }

  closeValuesModal() {
    this._finalRules.filter((x) => {
      if (x.obj_prpt_id === this.selected_src_for_dq.id) {
        const rules = x["rules"].filter(
          (r) => r.rul_id != this.current_rule.rul_id
        );
        x["rules"] = rules;
      }
    });

    $("#modalValues").modal("hide");
    console.log(this.finalRules);

    this.dqRules_by_type.forEach((x) => {
      x.values.forEach((r) => {
        if (r.rul_id == this.current_rule.rul_id) {
          r.selected = false;
        }
      });
    });
  }

  closeNewRulemodal() {
    $("#modalAddRule").modal("hide");
  }

  getRule() {
    // this.selectedRule.rule_def.split('$attr1').join(this.attr1);
    // this.selectedRule.rule_def.split('$attr2').join(this.attr2);
  }

  _finalRules = [];
  selectedRule: any;
  attr1 = "";
  attr2 = "";
  val1 = "";
  cond1 = "";

  showCond = false;
  showVal = false;
  showAttr2 = false;

  current_env: any;
  current_rule: any;

  ruleDefValues: any;
  ruleDefValuesLabel: string;
  ruleDefValueslength: any;

  selectedDqRuleEvent(eve, rule) {
    this.current_env = eve;
    this.current_rule = rule;
    this.selectedRule = cloneDeep(rule);
    this.selectedRule.values = this.selected_src_for_dq.assetName;
    const defVla = this.selectedRule.rule_def.match(/{{\S+/g);
    if (defVla.length > 0) {
      this.ruleDefValuesLabel = defVla
        .join(" | ")
        .replace(/[^a-zA-Z 0-9|.]+/g, "");
      // .replace(/{{/g, "")
      // .replace(/}}/g, "");
    } else {
      this.ruleDefValuesLabel = defVla;
    }
    if (eve.target.checked && this.ruleDefValuesLabel != null) {
      this.ruleDefValueslength = this.ruleDefValuesLabel.length;
      $("#modalValues").modal({
        show: true,
        backdrop: "static",
        keyboard: false,
      });
    } else {
      this.newMethod(rule, eve);
    }
  }

  newMethod1() {
    const eve = this.current_env;
    const rule = this.current_rule;
    if (eve.target.checked) {
      const uservalueslen = this.selectedRule.values.trim().split(",").length;
      if (
        this.selectedRule.values.trim() !== "" &&
        this.ruleDefValueslength === uservalueslen
      ) {
        // this.dqRules.forEach((x) => {
        //   x.values.forEach((r) => {
        //     if (r.rul_id == this.current_rule.rul_id) {
        //       r.values = this.selectedRule.values;
        //     }
        //   });
        // });
      } else {
        this.toastr.warning(
          `Given values not matched with length of required values(${this.ruleDefValueslength}).`
        );
        return;
      }
    } else {
      this.dqRules_by_type.forEach((x) => {
        x.values.forEach((r) => {
          if (r.rul_id == this.current_rule.rul_id) {
            r.selected = false;
            r.values = "";
          }
        });
      });
    }

    $("#modalValues").modal("hide");
    this.ruleDefValueslength = "";
    this.ruleDefValuesLabel = "";
    this.ruleDefValues = "";
    console.log(this.dqRules_by_type);

    let previous_applied_rules = [];
    let selected_rules = [];
    let _rul_def = cloneDeep(this.selectedRule.rule_def);
    previous_applied_rules = this._finalRules.filter(
      (x) => x.obj_prpt_id === this.selected_src_for_dq.id
    );
    this.dqRules.filter((x) => {
      if (x.rul_id === rule.rul_id) {
        x.selected = eve.target.checked;
        if (x.selected) {
          const data = cloneDeep(x);
          // data.rule_def = _rul_def;
          selected_rules.push(data);
        }
      }
    });

    if (
      previous_applied_rules !== undefined &&
      previous_applied_rules !== null &&
      previous_applied_rules.length > 0
    ) {
      for (let i = 0; i < previous_applied_rules.length; i++) {
        const element = previous_applied_rules[i];
        selected_rules.push(element);
      }
    }

    for (let i = 0; i < selected_rules.length; i++) {
      const ele = selected_rules[i];

      if (ele.rul_id == rule.rul_id) {
        selected_rules[i].rule_def = _rul_def;
        selected_rules[i].changed = true;
      }
    }
    const res = {
      obj_id: this.source.obj_id,
      obj_prpt_id: this.selected_src_for_dq.id,
      assetName: this.selected_src_for_dq.assetName,
      rules: selected_rules,
      is_actv_flg: "Y",
    };

    // this._finalRules = this._finalRules.push();
  }

  newMethod(rule: any, eve: any) {
    if (eve.target.checked) {

      // const _pkAttr = this.sourceAttributes.filter(x => x.isPK == 'Y')
      const data = cloneDeep(rule);
      let selected_rules = [];
      let previous_applied_rules = [];
      // this.attr1 = this.selected_src_for_dq.assetName;

      previous_applied_rules = this._finalRules.filter(
        (x) => x.obj_prpt_id === this.selected_src_for_dq.id
      );

      // previous_applied_rules = this._finalRules.filter(x => {
      //   if (x.obj_prpt_id === this.selected_src_for_dq.id) {
      //     return x;
      //   } else {
      //     return [];
      //   }
      // });

      if (previous_applied_rules.length > 0) {
        previous_applied_rules = previous_applied_rules[0]["rules"];
      }

      this._finalRules = this._finalRules.filter(
        (x) => x.obj_prpt_id !== this.selected_src_for_dq.id
      );

      let _rul_def = cloneDeep(this.selectedRule.rule_def);

      this.dqRules.filter((x) => {
        if (x.rul_id === rule.rul_id) {
          x.selected = eve.target.checked;
          if (x.selected) {
            const data = cloneDeep(x);
            // data.rule_def = _rul_def;
            selected_rules.push(data);
          }
        }
      });

      if (
        previous_applied_rules !== undefined &&
        previous_applied_rules !== null &&
        previous_applied_rules.length > 0
      ) {
        for (let i = 0; i < previous_applied_rules.length; i++) {
          const element = previous_applied_rules[i];
          selected_rules.push(element);
        }
      }

      for (let i = 0; i < selected_rules.length; i++) {
        const ele = selected_rules[i];

        if (ele.rul_id == rule.rul_id) {
          selected_rules[i].rule_def = this.selectedRule.values;
          selected_rules[i].values = this.selectedRule.values;
          selected_rules[i].changed = true;
        }
      }

      const res = {
        obj_id: this.source.obj_id,
        obj_prpt_id: this.selected_src_for_dq.id,
        assetName: this.selected_src_for_dq.assetName,
        rules: selected_rules,
        is_actv_flg: "Y",
      };

      this.tdqRules = this.dqRules.filter((x) => x.rul_catg_nm == "TDQ");
      this.bdqRules = this.dqRules.filter((x) => x.rul_catg_nm == "BDQ");

      console.log(res);

      this._finalRules.push(res);
      console.log(this._finalRules);
      this.attr1 = "";
      this.attr2 = "";
    } else {
      this._finalRules.filter((x) => {
        if (x.obj_prpt_id === this.selected_src_for_dq.id) {
          const rules = x["rules"].filter((r) => r.rul_id != rule.rul_id);
          x["rules"] = rules;
        }
      });
    }

    if (this.selectedRule.values.trim() !== "") {
      $("#modalValues").modal("hide");
    }

    this.selectedRule = [];
  }

  selectedSrcAttrToAddDq(itm) {
    // alert()
    const check = true;
    if (check) {
      this.showDqEdit = true;
      // this.customRule = false;
      this.selected_src_for_dq = itm;

      for (let i = 0; i < this.dqRules.length; i++) {
        this.dqRules[i].selected = false;
      }

      if (this._finalRules.length !== 0) {
        const res = this._finalRules.filter((x) => x.obj_prpt_id === itm.id);
        if (res.length !== 0) {
          const rules = res[0].rules;
          if (rules != null) {
            for (let i = 0; i < rules.length; i++) {
              const selected_rule = rules[i];
              for (let j = 0; j < this.dqRules.length; j++) {
                const ele = this.dqRules[j];
                if (selected_rule.rul_id === ele.rul_id) {
                  this.dqRules[j].selected = true;
                }
              }
            }
          }
        }
      }
    }
  }

  selectedRuleType = "tdq";
  getDqRulesByType(selectedRuleType: string) {
    if (selectedRuleType === "") {
      this.selectedRuleType = selectedRuleType = "tdq";
    }

    let rules = this.dqRules.filter(
      (x) => x.rul_type_nm.toLowerCase() === selectedRuleType.toLowerCase()
    );
    return rules;
  }

  showRules(type) {
    this.selectedRuleType = type;
    this.dqRules_by_type = this.getDqRulesByType(type);
  }

  getDqRulesByObj() {
    try {
      const parms = {
        objId: this.source.obj_id,
        type: "DQ",
      };
      this.loader.show();
      this.service.post(this.service.getDqRulesByObj_ep, parms).subscribe(
        (res) => {
          if (res !== undefined && res !== null && res.length != 0) {
            this.alReadyAppliedDqRules = res;
            for (let i = 0; i < this.alReadyAppliedDqRules.length; i++) {
              const ele = this.alReadyAppliedDqRules[i];
              const rules = ele.array_to_json;

              if (rules !== null) {
                const data = {
                  obj_id: this.source.obj_id,
                  obj_prpt_id: ele.obj_prpt_id,
                  rules: rules,
                  is_actv_flg: "Y",
                };

                if (this.finalObjDqRules.length !== 0) {
                  this.finalObjDqRules = this.finalObjDqRules.filter(
                    (x) => x.obj_prpt_id !== data.obj_prpt_id
                  );
                }
                this.finalObjDqRules.push(data);

                //loading first attribute initially
                if (
                  this.source.obj_prpt_id != undefined &&
                  this.source.obj_prpt_id != ""
                ) {
                  this.selectedSrcAttrToAddDq(this.source.obj_prpt);
                } else {
                  this.selectedSrcAttrToAddDq(this.sourceAttributes[0]);
                }

                this.showDqEdit = true;
                this.loader.hide();
              } else {
                //loading first attribute initially
                if (
                  this.source.obj_prpt_id != undefined &&
                  this.source.obj_prpt_id != ""
                ) {
                  this.selectedSrcAttrToAddDq(this.source.obj_prpt);
                } else {
                  this.selectedSrcAttrToAddDq(this.sourceAttributes[0]);
                }

                this.showDqEdit = true;
                this.loader.hide();
              }
            }
          } else {
            //loading first attribute initially
            if (
              this.source.obj_prpt_id != undefined &&
              this.source.obj_prpt_id != ""
            ) {
              this.selectedSrcAttrToAddDq(this.source.obj_prpt);
            } else {
              this.selectedSrcAttrToAddDq(this.sourceAttributes[0]);
            }

            this.showDqEdit = true;
            this.loader.hide();
          }
        },
        (err) => {
          this.loader.hide();
          console.log("Got Error. Please Try Again.");
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  loadDefaultDqRule() {
    for (let i = 0; i < this.dqRules.length; i++) {
      // this.dqRules[i].selected = false;
      if (
        this.dqRules[i].rul_nm.toLowerCase() === "statistical data profiling"
      ) {
        this.dqRules[i].selected = true;
      } else {
        // this.dqRules[i].selected = false;
      }
    }
  }

  loadAlreadyAppliedDqRule() {
    const check = this.alReadyAppliedDqRules.filter(
      (x) => x.obj_prpt_id === this.selected_src_for_dq.obj_id
    );
    console.log("check");
    console.log(check);
    if (check.length > 0) {
      const rules = check[0].array_to_json;
      for (let i = 0; i < rules.length; i++) {
        const ele = rules[i];
        for (let i = 0; i < this.dqRules.length; i++) {
          if (this.dqRules[i].rul_id === ele.rul_id) {
            this.dqRules[i].selected = true;
            console.log(this.dqRules[i]);
          }
        }
      }
    } else {
      this.loadDefaultDqRule();
    }
  }

  saveDqRules() {
    const params = {
      userId: this.userId,
      roleId: this.roleId,
      objId: this.source.obj_id,
      dqRules: this._finalRules,
    };

    this.loader.show();

    this.service.post(this.service.saveStreamingDqRules_ep, params).subscribe(
      (res) => {
        this.showDqEdit = false;
        // this.dqEdit.emit(this.showDqEdit);
        this.loader.hide();
        this.removeTextFromInput();
        console.log("Dq Rules Saved Successfully.");
        setTimeout(() => {
          this.closeDqRules();
        }, 0);
      },
      (err) => {
        this.loader.hide();
        console.log("Got Error. Please Try Again.");
      }
    );
  }

  // attr rule mapping start

  // attr rule mapping end

  closeDqRules() {
    this.showDqEdit = false;
    this.removeTextFromInput();
    this.selected_src_for_dq = null;
    this.emitt();
  }

  customRulesAppliedData = [];

  removeTextFromInput() {
    this.searchDqRule = "";
    this.searchTextPort = "";
  }

  // new rule start
  newRule = {
    rul_nm: "",
    rul_catg_nm: "",
    dq_type: "",
    rul_desc_txt: "",
    rul_def: "",
    rul_type_nm: "CDE",
    dialect: "",
  };

  addNewRule() {
    this.newRule = {
      rul_nm: "",
      rul_catg_nm: "",
      dq_type: "",
      rul_desc_txt: "",
      rul_def: "",
      rul_type_nm: "CDE",
      dialect: "",
    };

    $("#modalAddRule").modal({
      show: true,
      backdrop: "static",
      keyboard: false,
    });
  }

  ruleTypeChange(val) {
    this.newRule.rul_catg_nm = val.rul_catg_nm;
  }

  ruleCategoryChange(val) {
    this.newRule.dq_type = val.rul_type_nm;
  }

  saveNewRule() {
    console.log(this.newRule);
    this.loader.show();
    this.newRule["user_id"] = this.userId;
    console.log(this.dqRules_by_type);
    this.service.post(this.service.saveNewDQRule, this.newRule).subscribe(
      (res) => {
        this.loader.hide();
        // this.removeTextFromInput();
        this.toastr.success("Dq Rule Saved Successfully.");
        this.getDqRules();
        setTimeout(() => {
          this.closeNewRulemodal();
        }, 0);
      },
      (err) => {
        this.loader.hide();
        console.log("Got Error. Please Try Again.");
      }
    );
  }

  getDqRules1() {
    const parms = {
      userId: this.userId,
      roleId: this.roleId,
      rule_type: this.source.rul_type,
    };
    this.loader.show();
    this.service.post(this.service.getStreamingRules_ep, parms).subscribe(
      (res) => {
        let rules = res.rules;
        let filter_newRul = rules.filter(
          (x) => x.rul_nm == this.newRule.rul_nm
        );
        let newRule = { ...filter_newRul[0], selected: false, values: "" };
        for (let index = 0; index < this.dqRules_by_type.length; index++) {
          const element = this.dqRules_by_type[index];
          if (element.name == this.newRule.rul_catg_nm) {
            element.values.push(newRule);
          }
        }
        console.log(this.dqRules_by_type);
        this.loader.hide();
      },
      (err) => {
        this.loader.hide();
        console.log("Got Error. Please Try Again.");
      }
    );
  }

  validateRule() {
    const rul_def = this.newRule.rul_def.replace(/{{/g, "").replace(/}}/g, "");
    console.log(rul_def);
    this.loader.show();
    const url = "https://qaapi.gathi.in/api/validateDQRule/";
    this.service
      .post(url, { rul_def: rul_def })
      .subscribe(
        (res) => {
          console.log(res);
          this.loader.hide();

          if(res.status == "success"){
            // this.toastr.success('Rule Definition Is Valid');
            Swal.fire({
              text: "Rule Definition Is Valid",
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {

            })
          }else if(res.status == "failed"){
            // this.toastr.error(res.error);
            Swal.fire({
              text: res.error,
              icon: 'error',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {

            })
          }
        },
        (err) => {
          console.log(err);

          this.loader.hide();
          console.log("Got Error. Please Try Again.");
        }
      );
  }
  // new rule end
}
