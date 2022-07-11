import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  usrdtls:any;
  org_id:any;
  emailid:any;
  mobile:string;
  empid:any;
  username:any;
  password:any;
  rolename:any;
  LOBListdetails: any;
  apndetails: any;
  orgDetails: any;
  orgname: any;
  lobdtl: any;
  appDtl: any;
  Lob: any;

  constructor(private service:ApiService,private storage:LocalStorageService) { }
  userDetails:any;
  LobName:string;
  ApnName:string; 
  addlobappdtls=[]
  ngOnInit() {

    this.org_id=this.storage.retrieve("orgid")
    this.rolename=this.storage.retrieve('roleid')
    this.usrlist();
    // this.loblist();
    // this.getApnDtls();
  }
  getapnlobdtls(){
    if(this.LobName!="" && this.ApnName!=""){
    var lobfil=this.lobdtl.filter((val,i)=>{ return val.ln_of_bsn_id == this.LobName})[0]
    console.log(this.ApnName)
    var appfill=this.appDtl.filter((val,i)=>{ return val.apn_id==this.ApnName})[0]
    // this.addlobappdtls.forEach(element => {
    //   if(element.Lob.ln_of_bsn_id==lobfil.ln_of_bsn_id && element.Ap)
    // });
    let data={
      "Lob":lobfil,
      "App":appfill
    }

    console.log(data)
    this.addlobappdtls.push(data)
    this.LobName="";
    this.ApnName="";
  }else{
    alert("LOBs and Apps are not provided");
  }
}
  usrlist(){
    this.service.post(this.service.usrlist,{}).subscribe((res) => {
      console.log(res);
      this.userDetails=res;
    });
    }
    getorgnames(){
      var params={

      }
      this.service.get(this.service.orglist).subscribe((res) => {
        console.log(res)
        this.orgDetails=res;

      })
    }
  createuserlob(){
    console.log("User Login")
    let usr={
      "orgName": this.storage.retrieve('orgid'),
      "empIdentifier":this.empid,
      "userName": this.username,
      "deptName": "Junior data engineer",
      "hireDate": "2019-11-18",
      "jobTitle": "org_user",
      "funTitle": "engineer",
      "emailId": this.emailid,
      "contactNo": this.mobile,
      "loginUserId": this.storage.retrieve('userid'),
      "password": this.password,
      "org_lob_app_data":this.addlobappdtls,
      "roleid":this.rolename
  }
  const params={params:usr}
  console.log(params)
  this.service.post(this.service.usrcreation,params).subscribe((res) => {
    console.log(res);
    // this.userDetails=res;
    this.usrlist();
  },
  (err)=>{
    console.log(err)
    console.log(err.error)
  });
  
  }
  getLobAppUser(){
    const params = {
      org_id: this.storage.retrieve('orgid')
    }
    this.service.post(this.service.get_lobs,params).subscribe((res) => {
      console.log(res)
      this.lobdtl=res;
    });
  }
  LobChange(){
    this.appDtl=[]
    console.log("params")
    const params = {
      "lob_id": this.LobName
    }
    this.service.post(this.service.get_applications,params).subscribe((res) => {
      console.log(res)
      this.appDtl=res;
    });
  }
  userOrgADMcreation(){
    let usr={
      "orgid": this.orgname,
      "empIdentifier":this.empid,
      "userName": this.username,
      "deptName": "Junior data engineer",
      "hireDate": "2019-11-18",
      "jobTitle": "org_user",
      "funTitle": "engineer",
      "emailId": this.emailid,
      "contactNo": this.mobile,
      "loginuserid": this.storage.retrieve('userid'),
       "password": this.password,
      //  "org_lob_app_data":[]
  }
  const params={params:usr}
    this.service.post(this.service.usrorgadmincreation,params).subscribe((res) => {
      console.log(res);
      alert("Org User Created successfully")
      // this.userDetails=res;
    },
    (err)=>{
      console.log(err)
      console.log(err.error)
    });
    this.usrlist();
  }
    usercreation(){
      console.log("User Login")
      let usr={
        "orgName": this.org_id,
        "empIdentifier":this.empid,
        "userName": this.username,
        "deptName": "Junior data engineer",
        "hireDate": "2019-11-18",
        "jobTitle": "org_user",
        "funTitle": "engineer",
        "emailId": this.emailid,
        "contactNo": this.mobile,
        "loginuserid": this.storage.retrieve('userid'),
         "password": this.password,
         "org_lob_app_data":[]
    }
    const params={params:usr}
    this.service.post(this.service.usrcreation,params).subscribe((res) => {
      console.log(res);
      // this.userDetails=res;
    },
    (err)=>{
      console.log(err)
      console.log(err.error)
    });
    this.usrlist();
    }
    loblist(){
      this.service.get(this.service.loblist).subscribe((res) => {
        console.log(res);
        this.LOBListdetails=res;
        // this.orgdetails=res;
      })
    }
    getApnDtls(){
      this.service.post(this.service.applicationlist,{"params":""}).subscribe((res) => {
        console.log(res);
        this.apndetails=res;
      })
    }
}
