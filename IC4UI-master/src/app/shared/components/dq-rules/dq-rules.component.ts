import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, Validators, FormControl,ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dq-rules',
  templateUrl: './dq-rules.component.html',
  styleUrls: ['./dq-rules.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DqRulesComponent implements OnInit {
  userId: any;
  roleId: any;
  orgId: any;
  dqRules = [];
  alReadyAppliedDqRules: any = [];
  finalObjDqRules: any = [];
  selected_src_for_dq: any;
  searchTextPort = '';
  searchDqRule = '';

  // sourceAttributes = [];

  @Input('source') source: any;
  showDqEdit = false;
  @Input('sourceAttributes') sourceAttributes : any;
  @Output() dqEdit = new EventEmitter<boolean>();


  dqRules_by_type = [];
  ruleTypes = [{ 'rul_type_nm': 'tdq' }, { 'rul_type_nm': 'bdq' }, { 'rul_type_nm': 'custom' }];
  ruleCategory = [{ 'rul_catg_nm': 'Consistency' },
  { 'rul_catg_nm': 'Completeness' }, { 'rul_catg_nm': 'Accuracy' },
  { 'rul_catg_nm': 'Conformity' }, { 'rul_catg_nm': 'Uniqueness' }];
  customRule = false;
  customRuleData = {
    "datatype_length": "",
    "is_pk": "",
    "datatype": "",
    "input_column": "",
    "nullable": "",
    "obj_prpt_id": "",
    "data_format": "",
    "err_typ": "W",
    "expr_datatype": "",
    "expr": "",
    "expr_description": "",
    "rule_category": [{
      "exprEval": "Valid Businesss rule"
    },
    { "CUST_TRNSFM_DEF": "STD-TRNSFM" }],
    "rule_name": [
      [{
        "TDQ": "exprEval"
      }],
      [{ "TRNSFM": "CUST_TRNSFM_DEF" }]
    ]

  }

  selectedRuleType = 'tdq'
  filterDataIngestion : string = '';


  selectedNewRuleType: any;
  showAddNewRule = false;
  selectedCategory: any;

  newRuleForm = this.fb.group({
    'rul_nm': [null, [Validators.required]],
    'rul_desc_txt': [null, [Validators.required]],
    'rul_catg_nm': [null, Validators.required],
  });


  newCustomRuleForm = this.fb.group({
    'rul_nm': [null, [Validators.required]],
    'rul_desc_txt': [null, [Validators.required]],
    'rul_expr_dat_type': [null, [Validators.required]],
    'rul_expr_logic': [null, [Validators.required,]],
    'rul_catg_nm': [null, Validators.required],
  });

  constructor(
    private service: ApiService,
    private router: Router,
    private locStorage: LocalStorageService,
    private loader: NgxSpinnerService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.userId = this.locStorage.retrieve('userId');;
    this.roleId = this.locStorage.retrieve('roleId');
    this.orgId = this.locStorage.retrieve('orgId');
    this.setDqRules();

    // this.newRuleForm.get('rul_type_nm').valueChanges.subscribe(val => {
    //   console.log(val)
    //   const validators = [null, Validators.required];
    //   this.newRuleForm.addControl('rul_expr_dat_type', this.fb.control('', validators));
    // });
    // this.newRuleForm.updateValueAndValidity();

    // this.fb.control['rul_type_nm'].valueChanges.subscribe(checked => {
    //   console.log(checked)
    //   if (checked) {
    //     this.newCustomRuleForm.controls['rul_type_nm'].setValue(this.selectedRuleType);
    //     const validators = [null, Validators.minLength(5)];
    //     this.newRuleForm.addControl('rul_expr_dat_type', this.fb.control('', validators));
    //   } else {
    //     this.newRuleForm.controls['rul_type_nm'].setValue(this.selectedRuleType);
    //   }
    //   this.newRuleForm.updateValueAndValidity();
    // });
  }

  emitt() {
    this.dqEdit.emit(this.showDqEdit);
  }

  addNewRule() {
    this.showAddNewRule = true;
    this.selectedNewRuleType = this.selectedRuleType;
    if (this.selectedNewRuleType.toLowerCase() === 'custom') {
      // this.newCustomRuleForm.controls['rul_type_nm'].setValue(this.selectedRuleType);
    } else {
      // this.newRuleForm.controls['rul_type_nm'].setValue(this.selectedRuleType);
    }
  }

  cancelAddingNewRule() {
    this.showAddNewRule = false;
  }

  saveNewRule(val) {
    this.loader.show();
    let data = val;
    data.userId = this.userId;
    data.roleId = this.roleId;
    data.rul_type_nm = this.selectedNewRuleType.toUpperCase();
    console.log(data)
    this.service.post(this.service.addNewDqRule, data).subscribe(res => {
      this.loader.hide();
      this.dqRules.push(res[0])
      this.dqRules_by_type.push(res[0]);
      this.newRuleForm.reset();
      this.newCustomRuleForm.reset();
    }, err => {
      this.loader.hide();
      const err_text = err.error.text;
      if (err_text != undefined && err_text != null && err_text != '') {
        if (err_text.indexOf('unique constraint') > -1) {
          console.log('Rule already exists.Please change the rule name.');
        } else {
          console.log('Got Error.Please Try Again.');
        }
      } else {
        console.log('Got Error.Please Try Again.');
      }
    })
  }

  ruleTypeChange_new(type) {
    this.selectedNewRuleType = type;
  }


  // DQ Rules Start
  openDqRules() {
    this.setDqRules();
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
    if (this.dqRules.length === 0) {
      const parms = {
        userId: this.userId,
        roleId: this.roleId,
        rule_type : 'DQ'
      }
      this.service.post(this.service.getRulesByType_ep, parms)
        .subscribe(res => {
          this.dqRules = res.rules;
          this.dqRules_by_type = this.getDqRulesByType('');
          this.loadDefaultDqRule();
          this.getDqRulesByObj();

          // setTimeout(() => {
          //   this.getDqRulesByObj();
          // }, 0);


          // this.loadCustomDqRule();
        }, err => {
          this.loader.hide();
          console.log('Got Error. Please Try Again.');
        });
    }
  }

  getDqRulesByType(selectedRuleType: string) {
    if (selectedRuleType === '') {
      this.selectedRuleType = selectedRuleType = 'tdq';
    }

    let rules = this.dqRules.filter((x) => x.rul_type_nm.toLowerCase() === selectedRuleType.toLowerCase());
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
        type: 'DQ'
      }
      this.loader.show();
      this.service.post(this.service.getDqRulesByObj_ep, parms)
        .subscribe(res => {
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
                  is_actv_flg: 'Y'
                }

                if (this.finalObjDqRules.length !== 0) {
                  this.finalObjDqRules = this.finalObjDqRules.filter(x => x.obj_prpt_id !== data.obj_prpt_id)
                }
                this.finalObjDqRules.push(data);

                //loading first attribute initially
                if (this.source.obj_prpt_id != undefined && this.source.obj_prpt_id != '') {
                  this.selectedSrcAttrToAddDq(this.source.obj_prpt);
                } else {
                  this.selectedSrcAttrToAddDq(this.sourceAttributes[0]);
                }

                this.showDqEdit = true;
                this.loader.hide();
              } else {
                  //loading first attribute initially
                  if (this.source.obj_prpt_id != undefined && this.source.obj_prpt_id != '') {
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
            if (this.source.obj_prpt_id != undefined && this.source.obj_prpt_id != '') {
              this.selectedSrcAttrToAddDq(this.source.obj_prpt);
            } else {
              this.selectedSrcAttrToAddDq(this.sourceAttributes[0]);
            }

            this.showDqEdit = true;
            this.loader.hide();
          }

        }, err => {
          this.loader.hide();
          console.log('Got Error. Please Try Again.');
        })

    } catch (error) {
      console.log(error)
    }

  }

  loadDefaultDqRule() {
    for (let i = 0; i < this.dqRules.length; i++) {
      // this.dqRules[i].selected = false;
      if (this.dqRules[i].rul_nm.toLowerCase() === 'statistical data profiling') {
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

    const check = this.alReadyAppliedDqRules.filter(x => x.obj_prpt_id === this.selected_src_for_dq.obj_id);
    console.log('check')
    console.log(check)
    if (check.length > 0) {
      const rules = check[0].array_to_json;
      for (let i = 0; i < rules.length; i++) {
        const ele = rules[i];
        for (let i = 0; i < this.dqRules.length; i++) {
          if (this.dqRules[i].rul_id === ele.rul_id) {
            this.dqRules[i].selected = true;
            console.log(this.dqRules[i])
          }
        }
      }
    } else {
      this.loadDefaultDqRule();
    }
  }

  saveDqRules() {
    let finalDqRules = [];

    if (this.finalObjDqRules.length === 0) {
      // alert('Applying default Dq Rules');
      let defaultDqRule = [];

      for (let i = 0; i < this.dqRules.length; i++) {

        if (this.dqRules[i].rul_nm.toLowerCase() === 'statistical data profiling') {
          this.dqRules[i].selected = true;
          defaultDqRule.push(this.dqRules[i]);
        } else {
          this.dqRules[i].selected = false;
        }
      }

      for (let i = 0; i < this.sourceAttributes.length; i++) {
        const ele = this.sourceAttributes[i];
        const res = {
          obj_id: this.source.obj_id,
          obj_prpt_id: ele.id,
          assetName: ele.assetName,
          rules: defaultDqRule,
          is_actv_flg: 'Y'
        }
        this.finalObjDqRules.push(res);
      }
      finalDqRules = this.finalObjDqRules;
    } else {

      let _srcAttributes = [];

      for (let i = 0; i < this.sourceAttributes.length; i++) {
        const ele = this.sourceAttributes[i];
        _srcAttributes.push(ele)
      }

      for (let i = 0; i < this.finalObjDqRules.length; i++) {
        debugger;
        const ele = this.finalObjDqRules[i];
        _srcAttributes = _srcAttributes.filter(x => x.id != ele.obj_prpt_id);
      }
      let defaultDqRule = [];

      for (let i = 0; i < this.dqRules.length; i++) {
        if (this.dqRules[i].rul_nm.toLowerCase() === 'statistical data profiling') {
          defaultDqRule.push(this.dqRules[i]);
        }
      }

      for (let i = 0; i < _srcAttributes.length; i++) {
        const ele = _srcAttributes[i];
        const res = {
          obj_id: this.source.obj_id,
          obj_prpt_id: ele.id,
          assetName: ele.assetName,
          rules: defaultDqRule,
          is_actv_flg: 'Y'
        }
        this.finalObjDqRules.push(res);
      }
      finalDqRules = this.finalObjDqRules;
    }

    const params = {
      userId: this.userId,
      roleId: this.roleId,
      objId: this.source.obj_id,
      dqRules: finalDqRules
    }

    this.loader.show();

    this.service.post(this.service.saveDqRules_ep, params)
      .subscribe(res => {
        this.showDqEdit = false;
        this.dqEdit.emit(this.showDqEdit);
        this.loader.hide();
        this.removeTextFromInput();
        console.log('Dq Rules Saved Successfully.');
      }, err => {
        this.loader.hide();
        console.log('Got Error. Please Try Again.');
      })
  }

  closeDqRules() {
    this.showDqEdit = false;
    this.removeTextFromInput();
    this.selected_src_for_dq = null;
    this.emitt();

  }

  selectedDqRuleEvent(eve, rule) {
    const selected_rules = [];

    if (rule.rul_nm.toLowerCase() === 'custom rule_test') {
      this.selectedCustomRuleEvent(eve, rule);
    } else {
      this.dqRules.filter(x => {
        if (x.rul_id === rule.rul_id) {
          x.selected = eve.checked;
        }

        if (x.selected) {
          selected_rules.push(x);
        }
      });

      const res = {
        obj_id: this.source.obj_id,
        obj_prpt_id: this.selected_src_for_dq.id,
        assetName: this.selected_src_for_dq.assetName,
        rules: selected_rules,
        is_actv_flg: 'Y'
      }

      if (rule.rul_nm.toLowerCase() === 'custom rule') {
        this.customRule = eve.checked;
      }

      if (this.finalObjDqRules.length !== 0) {
        this.finalObjDqRules = this.finalObjDqRules.filter(x => x.obj_prpt_id !== res.obj_prpt_id)
      }
      this.finalObjDqRules.push(res);
    }

  }


  selectedSrcAttrToAddDq(itm) {
    const check: boolean = this.checkCustomRule();
    if (check) {
      this.applyCustomRule(itm);

      this.removeTextFromInput();
      this.showDqEdit = true;
      this.customRule = false;
      this.selected_src_for_dq = itm;
      for (let i = 0; i < this.dqRules.length; i++) {
        this.dqRules[i].selected = false;
      }

      // console.log('this.DqRules')
      // console.log(this.dqRules)
      // console.log('this.finalObjDqRules')
      // console.log(this.finalObjDqRules)

      if (this.finalObjDqRules.length !== 0) {
        const res = this.finalObjDqRules.filter(x => x.obj_prpt_id === itm.id);

        console.log('res')
        console.log(res)

        if (res.length !== 0) {
          // console.log('11111111111111')
          const rules = res[0].rules;
          for (let i = 0; i < rules.length; i++) {
            // console.log('22222222222')

            const selected_rule = rules[i];
            for (let j = 0; j < this.dqRules.length; j++) {
              const ele = this.dqRules[j];
              console.log('3333333')
              console.log(selected_rule.rul_id + ' ' + ele.rul_id)
              if (selected_rule.rul_id === ele.rul_id) {
                this.dqRules[j].selected = true;
                if (ele.rul_nm.toLowerCase() === 'custom rule') {
                  this.customRule = true;
                }
              }
            }
            const ele = this.finalObjDqRules[i];
          }
        } else {
          this.loadAlreadyAppliedDqRule();
        }
      } else {
        this.loadAlreadyAppliedDqRule();
      }
    }

  }

  customRulesAppliedData = []

  checkCustomRule() {
    if (this.customRule) {
      if (this.customRuleData.expr_datatype.trim() === '') {
        console.log('Enter data type.');
        return false;
      }
      if (this.customRuleData.expr.trim() === '') {
        console.log('Enter expression.');
        return false;
      }
      if (this.customRuleData.expr_description.trim() === '') {
        console.log('Enter description.');
        return false;
      }

      this.customRuleData.obj_prpt_id = this.selected_src_for_dq.id;
      this.customRuleData.datatype_length = this.selected_src_for_dq.id;
      this.customRuleData.is_pk = this.selected_src_for_dq.id;
      this.customRuleData.datatype = this.selected_src_for_dq.id;
      this.customRuleData.nullable = this.selected_src_for_dq.id;



      if (this.customRulesAppliedData.length != 0) {
        this.customRulesAppliedData = this.customRulesAppliedData.filter(x => x.obj_prpt_id !== this.selected_src_for_dq.id);
        this.customRulesAppliedData.push({ customData: this.customRuleData, obj_prpt_id: this.selected_src_for_dq.id });
      } else {
        this.customRulesAppliedData.push({ customData: this.customRuleData, obj_prpt_id: this.selected_src_for_dq.id });
      }

      this.customRuleData = {
        "datatype_length": "",
        "is_pk": "",
        "datatype": "",
        "input_column": "",
        "nullable": "",
        "obj_prpt_id": "",
        "data_format": "",
        "err_typ": "W",
        "expr_datatype": "",
        "expr": "",
        "expr_description": "",
        "rule_category": [{
          "exprEval": "Valid Businesss rule"
        },
        { "CUST_TRNSFM_DEF": "STD-TRNSFM" }],
        "rule_name": [
          [{
            "TDQ": "exprEval"
          }],
          [{ "TRNSFM": "CUST_TRNSFM_DEF" }]
        ]

      }
      return true;
    } else {
      return true;
    }

  }

  applyCustomRule(itm) {
  
    if (this.customRulesAppliedData.length !== 0) {
      const data: any = this.customRulesAppliedData.filter(x => x.obj_prpt_id === itm.id);
      if (data.length !== 0) {
        this.customRuleData = data[0].customData;
      }
    }

  }

  removeTextFromInput() {
    this.searchDqRule = '';
    this.searchTextPort = '';
  }

  // DQ Rules End

}

// export interface customRule {
//   dataType: '',
//   expression: '',
//   description: ''
// }
