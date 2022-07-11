import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-lob',
  templateUrl: './lob.component.html',
  styleUrls: ['./lob.component.scss']
})
export class LobComponent implements OnInit {
  LOBName:string;
  LOBDesc:string;
  LOBListdetails:any;
  OrgListdetails:any;
  organisation:string;
  userid:string;
  OrgName;

  constructor(private service:ApiService,private storage:LocalStorageService) { }
  ngOnInit() {
    this.organisation=this.storage.retrieve("orgid")
    this.loblist();
  }
  loblist(){
    this.service.get(this.service.loblist).subscribe((res) => {
      console.log(res);
      this.LOBListdetails=res;
      // this.orgdetails=res;
    })
  }
  orglist(){
    this.service.get(this.service.orglist).subscribe((res) => {
      console.log(res);
      this.OrgListdetails=res;
      console.log(this.OrgListdetails)
      // this.orgdetails=res;
    })
  }
  createLob(){
    let lobcreationdata = {
      organisation: this.organisation,
      lineofbusinessname: this.LOBName,
      lineofbusinessdescriptiontext: this.LOBDesc,
      userid: this.storage.retrieve('userid')
    }
    const params={params: lobcreationdata}

    this.service.post(this.service.lobcreation,params).subscribe((res) => {
      console.log(res)
      this.loblist();
  })
  }

}
