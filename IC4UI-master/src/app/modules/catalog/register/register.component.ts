import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isColumns: boolean;
  register = {
    mode: ''
  }
  isvisible:Boolean=true;
  org_id = '7248518a1808eae38650458ce81ba05a';
  lobs = [];
  applicatons = [];
  orgs = [];
  
  selectedLOB;
  selectedApp;
  selectedOrg;
  sendtoconcomp;
  selectedApp1: any;
  selectedLOB1: any;
  viewSchledJobsdata: any;
  
  constructor(private service: ApiService) { }

  ngOnInit() {
    this.isColumns=true;
    this.register.mode = 'template';
    // this.getOrgs();
    // this.getLobs();
    this.loadInitialData();
    
  }
  viewSchledJobs(){
    this.viewSchledJobsdata=[]
    this.service.post(this.service.ViewSchedulingMDMJobs, {"params":{}}).subscribe(res => {
      console.log(res)
      this.viewSchledJobsdata=res
    });
  }
  hide(status){
    this.isColumns=status;
    console.log(this.isColumns);
  }
  loadInitialData() {
    this.getOrgs();
    this.getLobs();

  }

  onSelectionChange(val) {
    console.log(val);
    this.register.mode = val;
    this.initializinglobApp();
  }
  initializinglobApp(){
    var lob,lob_nm
    var app,app_nm
    console.log(this.selectedApp)
    console.log(this.selectedLOB)
    if(this.selectedLOB1){
      lob=this.selectedLOB1.ln_of_bsn_id
      lob_nm=this.selectedLOB1.ln_of_bsn_nm
    }
    if(this.selectedApp1){
      app=this.selectedApp1.apn_id
      app_nm=this.selectedApp1.apn_nm
    }
    this.sendtoconcomp={
      "org":this.selectedOrg,
      "lob":lob,
      "apn":app,
      "lob_nm":lob_nm,
      "apn_nm":app_nm
    }
    console.log(this.sendtoconcomp)
  }

  getOrgs() {
    this.service.post(this.service.get_orgs, {}).subscribe(res => {
      console.log(res);
      this.orgs = res;
      this.selectedOrg = this.org_id;
    }, (err) => {
      alert('err');
    });

  }

  getLobs() {
    const params = {
      org_id: this.org_id
    }
    this.service.post(this.service.get_lobs, params).subscribe(res => {
      console.log(res);
      this.lobs = res;
    }, (err) => alert('err'));

  }
  selectedApplications(){
    this.selectedApp1=this.applicatons.filter((val,i)=>{ return val.apn_id == this.selectedApp})[0]
    this.initializinglobApp()
  }
  getApplications() {
    const params = {
      lob_id: this.selectedLOB
    }

    this.service.post(this.service.get_applications, params).subscribe(res => {
      console.log(res);
      this.applicatons = res;
      this.selectedLOB1=this.lobs.filter((val,i)=>{ return val.ln_of_bsn_id == this.selectedLOB})[0]
      this.initializinglobApp()
    }, (err) => { alert('err'); console.log(err) });

  }

}
