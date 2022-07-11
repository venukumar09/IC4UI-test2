import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OrgCreationComponent } from '../org-creation/org-creation.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { ConsumeRoutingModule } from 'src/app/modules/consume/consume-routing.module';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  OrgName:string;
  OrgDesc:string;
  userid:string;
  userorgid:string;
  orgdetails=[];
  showModal: boolean;
  dtOption:any={};
  dataTable: any={};
  constructor(public dialog : MatDialog,private service:ApiService,private chRef: ChangeDetectorRef,private storage:LocalStorageService) { 
    
  }

  ngOnInit(){
    this.dtOption={
      // "paging":false,
      // "ordering":false,
      // "info":false,
      "responsive":true
    }    
    // this.userorgid=localStorage.getItem('userorgid');
    this.getOrgDtls()
  }

  getOrgDtls(){
    let data={};
    // this.userid=this.storage.retrieve('userid');
    this.service.get(this.service.orglist).subscribe((res) => {
      console.log(res);
      this.orgdetails=res;
      // this.hide()
      this.chRef.detectChanges();
      const table: any = $('table');
      this.dataTable = table.DataTable(this.dtOption);
    })
  }

  createNewOrg(){
    let data={
      "orgname":this.OrgName,
      "orgdescriptiontext":this.OrgDesc,
      "userid":this.userid
    }
    const params = { params: {
      orgname: this.OrgName,
      orgdescriptiontext: this.OrgDesc,
      userid: this.storage.retrieve('userid')
    } };
    
    this.service.post(this.service.orgcreation,params).subscribe((res) => {
      console.log(res)
      this.getOrgDtls();
      this.OrgName="";
      this.OrgDesc="";
    },(err)=>{
      console.log(err);
    })
    
  }
  // show(){
  //   this.showModal=true;
  // }
  // hide(){
  //   this.showModal = false;
  // }
}
