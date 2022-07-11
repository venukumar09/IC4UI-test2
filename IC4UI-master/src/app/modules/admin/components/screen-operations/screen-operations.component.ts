import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
// import { ConsoleReporter } from 'jasmine';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-screen-operations',
  templateUrl: './screen-operations.component.html',
  styleUrls: ['./screen-operations.component.scss']
})
export class ScreenOperationsComponent implements OnInit {
  @Input() src: any;
  @Input() aggregator: any;
  listscreenss: any;
  screen_operationstarget: any;
  rolesdata: [];
  selrolesdata: any;
  ScreenOperations = [];
  form: FormGroup;
  user_id = this.storage.retrieve('userid');
  aggregator_data = {
    keys: []
  };


  targetAttributes: any = [];
  saveUsername: any[];
  selectedSourceAttr: any = [];
  selected_mapper_src: any;
  rolesbyopr: [];
  roleid: any="";

  constructor(private service: ApiService, private storage: LocalStorageService,private loader: NgxSpinnerService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  ngOnInit() {
    this.loader.show()
    this.listroles();
    this.listscreens();
    this.listscreenoperations();
    
  }
  listscreens() {
    this.service.get(this.service.scrnlist).subscribe((res) => {
      console.log(res);
      this.listscreenss = res;
      console.log(this.listscreenss)

    });
  }
  listscreenoperations() {
    this.service.get(this.service.scrnoperlist).subscribe((res) => {
      console.log(res);
      // res
      var locallistopJson=[]
      var map=new Map()
      res.forEach(element => {
        if(!map.has(element.scrn_nm)){
          map.set(element.scrn_nm,[element])
        }else{
          var array=map.get(element.scrn_nm)
          array.push(element)
          map.set(element.scrn_nm,array)
        }
        element.checked=false
      });
      console.log("Map")
      console.log(map)
      map.forEach((value: boolean, key: string) => {
        console.log(key, value);
        var loc={
          "key":key,
          "value":value
        }
        locallistopJson.push(loc)
    });
    this.screen_operationstarget=locallistopJson


      // this.screen_operationstarget = res;
      console.log(this.screen_operationstarget)
    });
  }
  listroles() {
    this.service.get(this.service.getroless).subscribe((res) => {
      console.log(res);
      this.rolesdata = res;
      console.log(this.rolesdata)
      this.loader.hide()
    });
  }
  selectrole(selectn) {
    this.loader.show()
    // this.ScreenOperations = [];
    this.roleid = selectn;
    var params = {
      params: {
        roleid: this.roleid,
      }
    };
    console.log(this.roleid);
    this.service.post(this.service.getrolescreenoperatns, params).subscribe((result) => {
      this.rolesbyopr = result;
      console.log(this.rolesbyopr);
      for(let i=0;i<this.screen_operationstarget.length;i++){
        for(let j=0;j<this.screen_operationstarget[i].value.length;j++){
            this.screen_operationstarget[i].value[j].checked=false; 
        }
        
      }
      for(let k=0;k<this.rolesbyopr.length;k++){
        
        for(let i=0;i<this.screen_operationstarget.length;i++){
          for(let j=0;j<this.screen_operationstarget[i].value.length;j++){
            if(this.rolesbyopr[k]["scrn_opr_id"]==this.screen_operationstarget[i].value[j].scrn_opr_id){
              this.screen_operationstarget[i].value[j].checked=true; 
              console.log(this.rolesbyopr[k]["scrn_opr_id"])
            }
          }
          
        }
        
      }
      console.log(this.screen_operationstarget)
      this.loader.hide()
    });
  }
  // listscrnbyrole() {
  //   this.service.get(this.service.getrolescreenoperatns).subscribe((res) => {
  //     console.log(res);
  //     this.rolesbyopr = res;
  //     console.log(this.rolesdata)
  //   });
  // }
  onSrcKeyChange(eve: any, itm) {
    console.log(eve);
    console.log(itm)
    if (eve) {
      this.aggregator_data.keys.push(itm.scrn_opr_id);
    } else {
      this.aggregator_data.keys = this.aggregator_data.keys.filter(x => x != itm.scrn_opr_id);
    }

    console.log(this.aggregator_data)
  }
  createrole() {
    this.loader.show()
    var data = {
      params: {
        screenrole_map: []
      }
    };
    console.log(this.screen_operationstarget)
    this.screen_operationstarget.forEach(element => {
      console.log(element.value)
      for(let i=0;i<element.value.length;i++){
        console.log(element.value[i].checked)
        if(element.value[i].checked==true){
          var locdata={
            "userrole_Id": this.selrolesdata,
            "scrn_opr_id": element.value[i].scrn_opr_id,
            "user_id": this.storage.retrieve('userid')
          }
          data.params.screenrole_map.push(locdata)
        }
      }
    });
    console.log("Save data")
    console.log(data.params.screenrole_map)

    // console.log(this.aggregator_data.keys)
    // var a = this.aggregator_data.keys.length
    // console.log(a)
    // if(a==0)
    // {
    //   params.params.screenrole_map.push({
    //     'userrole_Id': this.selrolesdata,
    //     'user_id': this.user_id
    //   });
    // }
    // else{
    //   for (let i = 0; i < a; i++) {
    //     params.params.screenrole_map.push({
    //       'userrole_Id': this.selrolesdata,
    //       'scrn_opr_id': this.aggregator_data.keys[i],
    //       'user_id': this.user_id
    //     });
    //   }
    // }
    // console.log(params)

    this.service.post(this.service.CreateRoleAccessPrevilage, data).subscribe((res) => {
      console.log(res);
      this.loader.hide()
      alert("Access privilages are Granted")
      this.router.navigate(['admin'])
    },(err) => {
      console.log(err);
      this.loader.hide()
      
    });
  }

  refresh(): void {
    window.location.reload();
  }

  checkBoxScrClk(o){
    console.log("checkBoxScrClk")
    for(let i=0;i<this.screen_operationstarget.length;i++){
        // console.log(this.screen_operationstarget[i].key+"this is 2nd")
        for(let j=0;j<this.screen_operationstarget[i].value.length;j++){
          if(this.screen_operationstarget[i].value[j].scrn_opr_nm==o.scrn_opr_nm &&this.screen_operationstarget[i].value[j].scrn_nm==o.scrn_nm){
          if(this.screen_operationstarget[i].value[j].checked==true){
            this.screen_operationstarget[i].value[j].checked=false;
            // console.log(this.screen_operationstarget[j].checked)
          }else{
            // console.log(this.screen_operationstarget[j].checked)
            this.screen_operationstarget[i].value[j].checked=true;
          }
        }
      }
    // console.log(this.screen_operationstarget)
  }
}
}
