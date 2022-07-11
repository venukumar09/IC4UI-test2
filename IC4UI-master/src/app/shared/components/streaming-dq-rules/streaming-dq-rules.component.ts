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

@Component({
  selector: "app-streaming-dq-rules",
  templateUrl: "./streaming-dq-rules.component.html",
  styleUrls: ["./streaming-dq-rules.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class StreamingDqRulesComponent implements OnInit {
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
  ruleTypes = [
    { rul_type_nm: "tdq" },
    { rul_type_nm: "bdq" },
    { rul_type_nm: "custom" },
  ];
  ruleCategory = [
    { rul_catg_nm: "Consistency" },
    { rul_catg_nm: "Completeness" },
    { rul_catg_nm: "Accuracy" },
    { rul_catg_nm: "Conformity" },
    { rul_catg_nm: "Uniqueness" },
  ];
  customRule = false;
  customRuleData = {
    datatype_length: "",
    is_pk: "",
    datatype: "",
    input_column: "",
    nullable: "",
    obj_prpt_id: "",
    data_format: "",
    err_typ: "W",
    expr_datatype: "",
    expr: "",
    expr_description: "",
    rule_category: [
      {
        exprEval: "Valid Businesss rule",
      },
      { CUST_TRNSFM_DEF: "STD-TRNSFM" },
    ],
    rule_name: [
      [
        {
          TDQ: "exprEval",
        },
      ],
      [{ TRNSFM: "CUST_TRNSFM_DEF" }],
    ],
  };

  selectedRuleType = "tdq";
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
    this.setDqRules();
  }

  emitt() {
    this.dqEdit.emit(this.showDqEdit);
    this.finalRules.emit(this._finalRules);
  }

  closeModal() {
    this._finalRules.filter(x =>{

      if( x.obj_prpt_id === this.selected_src_for_dq.id ){
       const rules =  x['rules'].filter( r => r.rul_id != this.current_rule.rul_id);
       x['rules'] = rules;
      }
    })

    $("#modalRules").modal("hide");
    console.log(this.finalRules);

    this.dqRules_by_type.forEach(x => {
      x.values.forEach(r => {
        if(r.rul_id ==  this.current_rule.rul_id){
          r.selected = false;
        }
      });
    });
  }

  getRule(){
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

  current_env:any;
  current_rule:any;

  selectedDqRuleEvent(eve, rule) {
    this.current_env = eve;
    this.current_rule = rule;
    this.attr1 = this.selected_src_for_dq.assetName;

    this.showCond = false;
    this.showVal = false;
    this.showAttr2 = false;

    if (rule.parm_type === "multi" && eve.target.checked) {
      this.selectedRule = cloneDeep(rule);

      if(rule.rule_def.indexOf('$attr2') != -1) {
        this.attr2 = '';
        this.showAttr2 = true;

      }

      if(rule.rule_def.indexOf('$cond1') != -1) {
        this.cond1 = '';
        this.showCond = true;

      }

      if(rule.rule_def.indexOf('$val1') != -1) {
        this.val1 = '';
        this.showVal = true;
      }

      $("#modalRules").modal({
        show: true,
        backdrop: "static",
        keyboard: false,
      });
    }  else {
      this.selectedRule = cloneDeep(rule);
      this.newMethod(rule, eve);
    }
  }

  newMethod(rule: any, eve: any) {

    if(eve.target.checked){
      debugger;
      const _pkAttr = this.sourceAttributes.filter(x => x.isPK == 'Y')
      const data = cloneDeep(rule);
      let selected_rules = [];
      let previous_applied_rules = [];
      this.attr1 = this.selected_src_for_dq.assetName;

      previous_applied_rules = this._finalRules.filter(x => x.obj_prpt_id === this.selected_src_for_dq.id);


      // previous_applied_rules = this._finalRules.filter(x => {
      //   if (x.obj_prpt_id === this.selected_src_for_dq.id) {
      //     return x;
      //   } else {
      //     return [];
      //   }
      // });

      if(previous_applied_rules.length > 0){
        previous_applied_rules = previous_applied_rules[0]['rules'];

      }

      this._finalRules = this._finalRules.filter(
        (x) => x.obj_prpt_id !== this.selected_src_for_dq.id
      );

      let _rul_def = cloneDeep(this.selectedRule.rule_def);

      if (rule.parm_type === "multi") {
        _rul_def = _rul_def.split('$attr1').join(this.attr1);
        _rul_def = _rul_def.split('$attr2').join(this.attr2);

        if(rule.rule_def.indexOf('$cond1') != -1) {
          _rul_def =  _rul_def.split('$cond1').join(this.cond1);
        }

        if(rule.rule_def.indexOf('$val1') != -1) {
          _rul_def =  _rul_def.split('$val1').join(this.val1);
        }
      }
      else {
        _rul_def = _rul_def.split('$attr1').join(this.selected_src_for_dq.assetName);
      }



      if(_pkAttr.length > 0){
        _rul_def =  _rul_def.split('$pk_col').join(_pkAttr[0].assetName);
      } else {
        this.toastr.info('Pk Column not found.');
      }

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

      if(previous_applied_rules !== undefined && previous_applied_rules !== null && previous_applied_rules.length > 0){
        for (let i = 0; i < previous_applied_rules.length; i++) {
          const element = previous_applied_rules[i];
          selected_rules.push(element);
        }
      }


      for (let i = 0; i < selected_rules.length; i++) {
        const ele = selected_rules[i];

        if(ele.rul_id == rule.rul_id){
          selected_rules[i].rule_def = _rul_def;
          selected_rules[i].changed = true

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
      this.attr1 = '';
      this.attr2 = '';

    } else {
      this._finalRules.filter(x =>{

        if( x.obj_prpt_id === this.selected_src_for_dq.id ){
         const rules =  x['rules'].filter( r => r.rul_id != rule.rul_id);
         x['rules'] = rules;
        }
      })
    }

    if (rule.parm_type === "multi") {
      $("#modalRules").modal('hide');
    }
  }

  selectedSrcAttrToAddDq(itm) {
    // const check: boolean = this.checkCustomRule();
    const check = true;
    if (check) {
      // this.applyCustomRule(itm);
      // this.removeTextFromInput();

      this.showDqEdit = true;
      this.customRule = false;
      this.selected_src_for_dq = itm;

      for (let i = 0; i < this.dqRules.length; i++) {
        this.dqRules[i].selected = false;
      }

      if (this._finalRules.length !== 0) {
        const res = this._finalRules.filter((x) => x.obj_prpt_id === itm.id);

        if (res.length !== 0) {
          const rules = res[0].rules;
          if(rules != null){
            for (let i = 0; i < rules.length; i++) {
              const selected_rule = rules[i];
              for (let j = 0; j < this.dqRules.length; j++) {
                const ele = this.dqRules[j];
                // console.log(selected_rule.rul_id + " " + ele.rul_id);
                if (selected_rule.rul_id === ele.rul_id) {
                  this.dqRules[j].selected = true;
                }
              }
              // const ele = this.finalObjDqRules[i];
            }
          }

        }
        console.log("***************");

        console.log(this.dqRules);
      }

      // console.log('this.DqRules')
      // console.log(this.dqRules)
      // console.log('this.finalObjDqRules')
      // console.log(this.finalObjDqRules)

      // if (this.finalObjDqRules.length !== 0) {
      //   const res = this.finalObjDqRules.filter(
      //     (x) => x.obj_prpt_id === itm.id
      //   );

      //   console.log("res");
      //   console.log(res);

      //   if (res.length !== 0) {
      //     // console.log('11111111111111')
      //     const rules = res[0].rules;
      //     for (let i = 0; i < rules.length; i++) {
      //       // console.log('22222222222')

      //       const selected_rule = rules[i];
      //       for (let j = 0; j < this.dqRules.length; j++) {
      //         const ele = this.dqRules[j];
      //         console.log("3333333");
      //         console.log(selected_rule.rul_id + " " + ele.rul_id);
      //         if (selected_rule.rul_id === ele.rul_id) {
      //           this.dqRules[j].selected = true;
      //           if (ele.rul_nm.toLowerCase() === "custom rule") {
      //             this.customRule = true;
      //           }
      //         }
      //       }
      //       const ele = this.finalObjDqRules[i];
      //     }
      //   } else {
      //     this.loadAlreadyAppliedDqRule();
      //   }
      // } else {
      //   this.loadAlreadyAppliedDqRule();
      // }
    }
  }

  setDqRules() {
    if (this.dqRules.length === 0) {
      this.getDqRules();
    }
    // setTimeout(() => {
    //   this.getDqRulesByObj();
    // }, 100);
  }

  getDqRules() {
    this.loader.show();
    if (this.dqRules.length === 0) {
      const parms = {
        userId: this.userId,
        roleId: this.roleId,
        rule_type: this.source.rul_type ,
      };
      this.service.post(this.service.getStreamingRules_ep, parms).subscribe(
        (res) => {
          this.dqRules = res.rules;
          this.dqRules = this.dqRules.map((x) => ({ ...x, selected: false }));

          this.tdqRules = this.dqRules.filter((x) => x.rul_catg_nm == "TDQ");
          this.bdqRules = this.dqRules.filter((x) => x.rul_catg_nm == "BDQ");

          var groups = new Set(this.dqRules.map((item) => item.rul_catg_nm));
          this.dqRules_by_type = [];
          groups.forEach((g) =>
            this.dqRules_by_type.push({
              name: g,
              values: this.dqRules.filter((i) => i.rul_catg_nm === g),
            })
          );

          //loading first attribute initially
          if (
            this.source.obj_prpt_id != undefined &&
            this.source.obj_prpt_id != ""
          ) {
            // this.selectedSrcAttrToAddDq(this.source.obj_prpt);
            this.selected_src_for_dq = this.source.obj_prpt;
          } else {
            // this.selectedSrcAttrToAddDq(this.sourceAttributes[0]);
            this.selected_src_for_dq = this.sourceAttributes[0];
          }
          // this.selected_src_for_dq.id  = this.source.obj_prpt_id;

          // this.dqRules_by_type = this.getDqRulesByType('');
          // this.loadDefaultDqRule();
          // this.getDqRulesByObj();

          // setTimeout(() => {
          //   this.getDqRulesByObj();
          // }, 0);
debugger;
          this._finalRules = this.sourceAttributes;
          this.selectedSrcAttrToAddDq(this.selected_src_for_dq);

          this.loader.hide();
        },
        (err) => {
          this.loader.hide();
          console.log("Got Error. Please Try Again.");
        }
      );
    }
  }

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

  loadCustomDqRule() {
    for (let i = 0; i < this.dqRules.length; i++) {
      // this.dqRules[i].customRule = false;
      // if (this.dqRules[i].rul_nm.toLowerCase() === 'statistical data profiling') {
      //   this.dqRules[i].selected = true;
      // } else {
      //   this.dqRules[i].selected = false;
      // }
    }
  }

  selectedCustomRuleEvent(eve, rule) {
    this.customRule = eve.checked;
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
        setTimeout(()=>{
          this.closeDqRules();
        },0);
      },
      (err) => {
        this.loader.hide();
        console.log("Got Error. Please Try Again.");
      }
    );

  }

  // saveDqRules() {
  //   let finalDqRules = [];

  //   if (this.finalObjDqRules.length === 0) {
  //     // alert('Applying default Dq Rules');
  //     let defaultDqRule = [];

  //     for (let i = 0; i < this.dqRules.length; i++) {
  //       if (
  //         this.dqRules[i].rul_nm.toLowerCase() === "statistical data profiling"
  //       ) {
  //         this.dqRules[i].selected = true;
  //         defaultDqRule.push(this.dqRules[i]);
  //       } else {
  //         this.dqRules[i].selected = false;
  //       }
  //     }

  //     for (let i = 0; i < this.sourceAttributes.length; i++) {
  //       const ele = this.sourceAttributes[i];
  //       const res = {
  //         obj_id: this.source.obj_id,
  //         obj_prpt_id: ele.id,
  //         assetName: ele.assetName,
  //         rules: defaultDqRule,
  //         is_actv_flg: "Y",
  //       };
  //       this.finalObjDqRules.push(res);
  //     }
  //     finalDqRules = this.finalObjDqRules;
  //   } else {
  //     let _srcAttributes = [];

  //     for (let i = 0; i < this.sourceAttributes.length; i++) {
  //       const ele = this.sourceAttributes[i];
  //       _srcAttributes.push(ele);
  //     }

  //     for (let i = 0; i < this.finalObjDqRules.length; i++) {
  //       debugger;
  //       const ele = this.finalObjDqRules[i];
  //       _srcAttributes = _srcAttributes.filter((x) => x.id != ele.obj_prpt_id);
  //     }
  //     let defaultDqRule = [];

  //     for (let i = 0; i < this.dqRules.length; i++) {
  //       if (
  //         this.dqRules[i].rul_nm.toLowerCase() === "statistical data profiling"
  //       ) {
  //         defaultDqRule.push(this.dqRules[i]);
  //       }
  //     }

  //     for (let i = 0; i < _srcAttributes.length; i++) {
  //       const ele = _srcAttributes[i];
  //       const res = {
  //         obj_id: this.source.obj_id,
  //         obj_prpt_id: ele.id,
  //         assetName: ele.assetName,
  //         rules: defaultDqRule,
  //         is_actv_flg: "Y",
  //       };
  //       this.finalObjDqRules.push(res);
  //     }
  //     finalDqRules = this.finalObjDqRules;
  //   }

  //   const params = {
  //     userId: this.userId,
  //     roleId: this.roleId,
  //     objId: this.source.obj_id,
  //     dqRules: finalDqRules,
  //   };

  //   this.loader.show();

  //   this.service.post(this.service.saveDqRules_ep, params).subscribe(
  //     (res) => {
  //       this.showDqEdit = false;
  //       this.dqEdit.emit(this.showDqEdit);
  //       this.loader.hide();
  //       this.removeTextFromInput();
  //       console.log("Dq Rules Saved Successfully.");
  //     },
  //     (err) => {
  //       this.loader.hide();
  //       console.log("Got Error. Please Try Again.");
  //     }
  //   );
  // }

  closeDqRules() {
    this.showDqEdit = false;
    this.removeTextFromInput();
    this.selected_src_for_dq = null;
    this.emitt();
  }

  customRulesAppliedData = [];

  checkCustomRule() {
    if (this.customRule) {
      if (this.customRuleData.expr_datatype.trim() === "") {
        console.log("Enter data type.");
        return false;
      }
      if (this.customRuleData.expr.trim() === "") {
        console.log("Enter expression.");
        return false;
      }
      if (this.customRuleData.expr_description.trim() === "") {
        console.log("Enter description.");
        return false;
      }

      this.customRuleData.obj_prpt_id = this.selected_src_for_dq.id;
      this.customRuleData.datatype_length = this.selected_src_for_dq.id;
      this.customRuleData.is_pk = this.selected_src_for_dq.id;
      this.customRuleData.datatype = this.selected_src_for_dq.id;
      this.customRuleData.nullable = this.selected_src_for_dq.id;

      if (this.customRulesAppliedData.length != 0) {
        this.customRulesAppliedData = this.customRulesAppliedData.filter(
          (x) => x.obj_prpt_id !== this.selected_src_for_dq.id
        );
        this.customRulesAppliedData.push({
          customData: this.customRuleData,
          obj_prpt_id: this.selected_src_for_dq.id,
        });
      } else {
        this.customRulesAppliedData.push({
          customData: this.customRuleData,
          obj_prpt_id: this.selected_src_for_dq.id,
        });
      }

      this.customRuleData = {
        datatype_length: "",
        is_pk: "",
        datatype: "",
        input_column: "",
        nullable: "",
        obj_prpt_id: "",
        data_format: "",
        err_typ: "W",
        expr_datatype: "",
        expr: "",
        expr_description: "",
        rule_category: [
          {
            exprEval: "Valid Businesss rule",
          },
          { CUST_TRNSFM_DEF: "STD-TRNSFM" },
        ],
        rule_name: [
          [
            {
              TDQ: "exprEval",
            },
          ],
          [{ TRNSFM: "CUST_TRNSFM_DEF" }],
        ],
      };
      return true;
    } else {
      return true;
    }
  }

  applyCustomRule(itm) {
    debugger;
    if (this.customRulesAppliedData.length !== 0) {
      const data: any = this.customRulesAppliedData.filter(
        (x) => x.obj_prpt_id === itm.id
      );
      if (data.length !== 0) {
        this.customRuleData = data[0].customData;
      }
    }
  }

  removeTextFromInput() {
    this.searchDqRule = "";
    this.searchTextPort = "";
  }

  // DQ Rules End
}

// export interface customRule {
//   dataType: '',
//   expression: '',
//   description: ''
// }
