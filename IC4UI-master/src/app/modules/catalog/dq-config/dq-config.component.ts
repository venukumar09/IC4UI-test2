import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'underscore';

@Component({
  selector: 'app-dq-config',
  templateUrl: './dq-config.component.html',
  styleUrls: ['./dq-config.component.scss']
})
export class DqConfigComponent implements OnInit {
  columnDetails: any;
  editabletableDetails: any;
  topUsers: any;
  assetName: any;
  userId: any;
  orgId: any;
  roleId: any;
  assetId: any;
  modelflag: any;
  show: any;
  objId: any;
  previous: any;
  tableDetails: any;
  dqRules: any;
  selectedRuleType: string;
  ruleType : string = 'TDQ';
  ruleNames: any;
  selectedColumn: any;
  currColRules: any;
  dqRulesByColumn: any;
  currRuleIndex: any;
  objRules: any;

  constructor(private service:ApiService, private loader: NgxSpinnerService,private route: ActivatedRoute,private locStorage:LocalStorageService) { }

  ngOnInit() {
    this.userId = this.locStorage.retrieve('userId');
    this.roleId = this.locStorage.retrieve('roleId');
    this.orgId = this.locStorage.retrieve('orgId');
    const data: any = this.locStorage.retrieve('urls');

    // this.screenPermissions = this.security.getscreenpermissions(this.screenName);
    // getting attribute id from route.
    this.route.params.subscribe((params: ParamMap) => {
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
        this.getDqRules();
        this.getDqRulesByObj();
        
      } else {
        
      }
    }, err => {
    });

}
openModel(col,i){
  console.log(col);
  this.selectedColumn = col;
  this.currColRules = JSON.parse(JSON.stringify(col));
  this.currRuleIndex = i;
  this.getDqRules();
  
}
getDqRules() {
  if (!this.dqRules || this.dqRules.length == 0) {
    const parms = {
      userId: this.userId,
      roleId: this.roleId,
      rule_type : 'DQ'
    }
    this.service.post(this.service.getRulesByType_ep, parms)
      .subscribe(res => {
        this.dqRules = res.rules;

        this.ruleNames = _.uniq(_.pluck(this.dqRules,'rul_catg_nm'));
        
        console.log(_.uniq(_.pluck(this.dqRules,'rul_catg_nm')));
        this.initDQRules();
        this.getDqRulesByObj();

      }, err => {
        this.loader.hide();
        console.log('Got Error. Please Try Again.');
      });
  }
  else{
    this.initDQRules();
  }
}

getDqRulesByType(selectedRuleType: string) {
  if (selectedRuleType === '') {
    this.selectedRuleType = selectedRuleType = 'tdq';
  }

  let rules = this.dqRules.filter((x) => x.rul_type_nm.toLowerCase() === selectedRuleType.toLowerCase());
  return rules;
}
onRuleValueChange(rul,evt,i){
  let cur_rule = _.where(this.columnDetails[this.currRuleIndex].rules,{rul_id:rul.rul_id})
  if(evt.target.value && evt.target.value.length)
  cur_rule[0].rul_val = evt.target.value;
  console.log(evt.target.value);
  console.log(this.columnDetails);
  this.objRules = JSON.parse(JSON.stringify(this.columnDetails));
}
onRuleChange(rul,evt){
  console.log(evt.target.checked);
  console.log(rul);
  if(!this.selectedColumn.rules)
  this.selectedColumn['rules'] = [];
  if(!this.currColRules.rules)
      this.currColRules['rules'] = [];


if(evt.target.checked)
{
  //if(this.currColRules.rules){
    this.currColRules.rules.push(rul)
  
}
else{
  //this.selectedColumn['rules'] = [];
  
  this.currColRules.rules = this.currColRules.rules.filter(i => i.rul_id != rul.rul_id);
}


}
saveDqRules(){
  this.loader.show();
  console.log(this.currColRules)
  console.log(this.columnDetails);
  //this.selectedColumn = JSON.parse(JSON.stringify(this.currColRules));
  this.selectedColumn.rules = this.currColRules.rules;
  console.log(this.columnDetails);
  this.loader.hide();
  let ObjPrptyRules : any=[];
  this.columnDetails = JSON.parse(JSON.stringify(this.objRules));
  this.columnDetails.forEach(ele => {
    let tempObj = {
      obj_id : this.assetId,
      obj_prpt_id : ele.id,
      is_actv_flg: 'Y',
      rules : ele.rules || []
    }
    ObjPrptyRules.push(tempObj);
  });


  const params = {
    userId: this.userId,
    roleId: this.roleId,
    objId: this.assetId,
    dqRules: ObjPrptyRules
  }
  console.log(params)

    this.service.post(this.service.saveDqRules_ep, params)
      .subscribe(res => {
        this.loader.hide();
        this.loadInitData();
        alert("DQ Rules Saved Successfully!");
      }, err => {
        this.loader.hide();
      })
  
}

initDQRules(){
  // if(!this.selectedColumn.rules)
  // this.dqRules.forEach(rul => {
  //   if(!rul.selected){
  //     rul['selected'] = false;
  //   }
  // });
  // else{

  

    for(let i=0;i<this.dqRules.length;i++){
      this.dqRules[i]['selected'] = false;
      let rulId = this.dqRules[i].rul_id;
      let rules = this.selectedColumn.rules;
      console.log( _.findWhere(rules,{rul_id : rulId}));
      if(rules && _.isObject(_.findWhere(rules,{rul_id : rulId}))){
        this.dqRules[i].selected = true;
      }
    }


    

  //}
}

getDqRulesByObj() {
  try {
    const parms = {
      objId: this.assetId,
      type: 'DQ'
    }
    this.loader.show();
    this.service.post(this.service.getDqRulesByObj_ep, parms)
      .subscribe(res => {
        console.log(res)
        this.dqRulesByColumn = res;
          this.loader.hide();

        for(let i=0;i<this.columnDetails.length;i++){
          let id = this.columnDetails[i].id;
          console.log(_.findWhere(this.dqRulesByColumn,{obj_prpt_id : id}));
          let obj = _.findWhere(this.dqRulesByColumn,{obj_prpt_id : id});
          if(obj)
          this.columnDetails[i]['rules'] = obj.rules;
        }
          
        

      }, err => {
        this.loader.hide();
      })

  } catch (error) {
    console.log(error)
  }

}

}
