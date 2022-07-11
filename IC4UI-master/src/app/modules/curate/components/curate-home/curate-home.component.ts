import { Component, OnInit } from '@angular/core';
import { CdkDragDrop,moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import * as _ from "underscore";
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-curate-home',
  templateUrl: './curate-home.component.html',
  styleUrls: ['./curate-home.component.scss']
})
export class CurateHomeComponent implements OnInit {

  process = [];
  job = [];
  jobName = "";
  pcs_list = [];
  platforms = [];
  processByType = [];
  datasourceList = [];
  objList= [];
  dblist = [];
  lobs = [];
  apps = [];
  lob = "";
  app = "";
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
  constructor(private service : ApiService,private storage : LocalStorageService, private loader : NgxSpinnerService) {
    this.org_id = this.storage.retrieve('orgid');
    this.org_nm = this.storage.retrieve('orgName');

   }
 
  ngOnInit() {
    
    this.process = [];
    this.getPcsList();
    this.getLOBList();
    this.getPlatforms();
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
        parm_nm : 'IN_PATH',
        parm_txt :  '',
        parm_type: "Mandatory"

    }
    let outParm = {
      pcs_nm : pcs.pcs_nm,
      pcs_id:pcs.pcs_id,
      parm_nm : 'OUT_PATH',
      parm_txt :  this.basePath + "/" + pcs.pcs_nm.toLowerCase() +'/$BUS_DT',
      parm_type: "Mandatory"

  }
      if(this.process.length){
        
        let pcs  = _.findWhere(obj.params, {
          parm_nm: 'IN_PATH'
        })
        if(pcs){
          
          pcs.parm_txt = this.process[this.process.length-1].OUT_PATH;
          parm = pcs;
        }
        else
          {
            parm.parm_txt =  this.process[this.process.length-1].OUT_PATH;
            obj.params.push(parm)
          }
      
        //obj.params[obj.params.length-1].IN_PATH = this.process[this.process.length-1].OUT_PATH || '';
      }
      else{
        console.log(_.findWhere(obj.params, {
          parm_nm: 'IN_PATH'
        }))
        let pcs  = _.findWhere(obj.params, {
          parm_nm: 'IN_PATH'
        })
        if(pcs){
          
          pcs.parm_txt = this.cur_components.source.OUT_PATH;
          parm = pcs;
        }
        else
          {
            parm.parm_txt =  this.cur_components.source.OUT_PATH;
            obj.params.push(parm)
            
          }
        //parm.parm_txt =  this.cur_components.source.OUT_PATH;
      }
      console.log(parm)

      let outPathIndex = _.findIndex(obj.params,{parm_nm:'OUT_PATH'});
      if(outPathIndex == -1){
        
        obj.params.push(outParm)
      }
      else{
        obj.params[outPathIndex].parm_txt = this.basePath + '/' + pcs.pcs_nm.toLowerCase() + '/$BUS_DT';
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
      this.pcs_list = res;
      // var data = _.uniq(_.pluck(this.pcs_list, 'param_grp_nm'));
      // console.log(data);
      // var parr = [];
      // for (let i = 0; i < data.length; i++) {
      //   var obj = { param_grp_nm: data[i], types: [] };
      //   var listByType = _.where(this.pcs_list, { param_grp_nm: data[i] })
      //   var dataBytype = _.uniq(_.pluck(listByType, 'pcs_type_nm'));
      //   console.log(dataBytype);
      //   //var parr = [];
      //   for (let i = 0; i < dataBytype.length; i++) {
      //     var obj1 = { pcs_type_nm: dataBytype[i], process: _.where(this.pcs_list, { pcs_type_nm: dataBytype[i] }) };
      //     obj.types.push(obj1);
      //   }
      //   parr.push(obj);
      // }

      // console.log(parr);
      // for (let j = 0; j < parr.length; j++) {
      //   for (let k = 0; k < parr[j].types.length; k++) {
      //     parr[j].types[k].process = this.setProcessByParamType(parr[j].types[k].process, false);

      //   }
      // }

      let parr = _.uniq(this.pcs_list,function(p){return p.pcs_nm;})
      console.log(parr);
      this.processByType = parr;
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
      org_id : this.org_id
    }
    this.service.post(this.service.get_lobs,req).subscribe(res=>{

    this.lobs = res;
    this.loader.hide();
    },err=>{
    this.loader.hide();
    })
  }

// on Lob selection change
onLOBChange(type,query){
  //this.cur_components.source.lob = lob.ln_of_bsn_nm;

  this.getAppsList();
}
//Get Application list based on selected lob and organization.
  getAppsList(){
    this.loader.show();
    let req={
      org_id : this.org_id,
      lob_id : this.lob
    }
    this.service.post(this.service.get_applications,req).subscribe(res=>{

    this.apps = res;
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

  // set Inpath/outpath for a selected services
  setInpathOutpath(){
    this.process.forEach((ele,i) => {
      console.log(ele)
      console.log(i)
      let inPathIndex = _.findIndex(this.process[i].params,{
        parm_nm: 'IN_PATH'
      })
      
      if(i==0){
        
        
        this.process[i].params[inPathIndex].parm_txt = this.cur_components.source.OUT_PATH;
      }
      else{
        let outPathIndex = _.findIndex(this.process[i-1].params,{
          parm_nm: 'OUT_PATH'
        })
        this.process[i].params[inPathIndex].parm_txt = this.process[i-1].params[outPathIndex].parm_txt;
      }

    });
  }
  getModifiedPcs(pcs:any){
    console.log(pcs)
  }
  
}