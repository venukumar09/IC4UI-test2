import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  ApnDesc:string;
  ApnName:string;
  apndetails: any;
  lobdetails:any;
  lobid:any;
  OrgName:any;
  constructor(private service:ApiService,private storage:LocalStorageService) { }
  ngOnInit() {
    this.getApnDtls();
  }
  getApnDtls(){
    this.service.post(this.service.applicationlist,{"params":""}).subscribe((res) => {
      console.log(res);
      this.apndetails=res;
    })
  }
  getlobDtls(){
    this.service.get(this.service.loblist).subscribe((res) => {
      console.log(res);
      this.lobdetails=res;
    })
  }
  createApplication(){
    let applicationcreationdata = {
      apn_cntct_grp_email_addr_txt: "",
      apn_dat_stwd_id: "",
      apn_ownr_id: "",
      lobidentifier: "",
      apn_pltfm_nm: "",
      prog_nm: "12345",
      userid: this.storage.retrieve("userid"),
      apn_desc_txt: this.ApnDesc,
      apn_nm: this.ApnName,
      apn_id: "MDR",
      internal_external_ind: "",
      apn_ownr_nm: "Prasanth",
      confidential: "Y"
    }
    console.log(this.lobid)
    const params={params:applicationcreationdata}
    this.service.post(this.service.appcreation,params).subscribe((res)=>{
      console.log(res);
      this.getApnDtls();
    });
  }
}
