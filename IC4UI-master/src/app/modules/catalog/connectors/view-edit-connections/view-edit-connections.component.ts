import { Component, OnInit,ChangeDetectorRef , Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/shared/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { LocalStorageService } from 'ngx-webstorage';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
@Component({
  selector: 'app-view-edit-connections',
  templateUrl: './view-edit-connections.component.html',
  styleUrls: ['./view-edit-connections.component.css']
})
export class ViewEditConnectionsComponent implements OnInit {
  @Output() childEvent = new EventEmitter();
  displayedColumns: string[] = ['conn_nm', 'conn_type', 'env', 'db_pltfm_nm', 'db_sub_pltfm_nm' ,'db_nm' ];
  dataSource: any;
  connections: any = [
  ];
  dataTable: any={};
  dataTableViewDB:any={};
  dtOption:any={};
  selectedConDtl={   
    "connector_type": "",
      "host": "",
      "port": "",
      "conn_nm": "",
      "conn_id":"",
      "env": "",
      "platform": "",
      "op_type":"U",
      "usr_id": "",
      "role_id": "",
      "org_id": "",
      "source":{
      "name": "",
      "img_path": ""
    },
    "dbDetails": [
      // {
      //   "dataBaseName": "demo_new_metarepo",
      //   "userName": "gathiads",
      //   "password": "Admin56Gathi9156"
      // }
    ]
  }
  dbdetails: any;
  editable: any={};
  // selectedConDtl={
  //   "conn_id": "",
  //   "env_nm": "",
  //   "db_pltfm_nm": "",
  //   "conn_nm": "",
  //   "conn_type": "",
  //   "host_url_txt": "",
  //   "port_nbr": "",
  //   "rec_lst_updt_ts": "",
  //   "rec_lst_updt_by_id": "",
  //   "org_id": "",
  //   "db_sub_pltfm_nm": "",
  //   "db_nm": "",
  //   "secondary_host": "",
  //   "secondary_usr_id": "",
  //   "secondary_port_nbr": "",
  //   "secondary_pwd": "",
  //   "conn_created_ts": "",
  //   "conn_created_by_id": ""
  // };
  constructor(private service: ApiService,
    private chRef: ChangeDetectorRef,
    private storage:LocalStorageService) { }

  ngOnInit() {
    // this.dataSource = new MatTableDataSource<any[]>(this.connections);
    this.loadInitialData();
    this.dtOption={
      // "paging":false,
      // "ordering":false,
      // "info":false,
      "destroy":true,
      "responsive":true
    }

  }

  loadInitialData() {
    const org_id = '7248518a1808eae38650458ce81ba05a'
    this.service.post(this.service.viewconnections, { 'org_id': org_id }).subscribe((res) => {
      console.log(res);
      this.connections = res;
      this.chRef.detectChanges();
      const table: any = $('.tableviewConn');
      this.dataTable = table.DataTable();

    }, err => {

    });
  }
  backtosources(){
    this.childEvent.emit('this is a test');
  }
  editDb(dbdtl){
    console.log(dbdtl)
  }
  viewConnection(conn) {
    // this.selectedConDtl=conn_id
    console.log(conn)
    
    console.log("Edit Connections")
    this.selectedConDtl={   
        "connector_type": conn.conn_type,
        "host": conn.host_url_txt,
        "port": conn.port_nbr,
        "conn_nm": conn.conn_nm,
        "conn_id":conn.conn_id,
        "env": conn.env_nm,
        "platform": conn.db_pltfm_nm,
        "op_type":"U",
        "usr_id": this.storage.retrieve('userid'),
        "role_id":this.storage.retrieve('roleid'),
        "org_id": conn.org_id,
        "source":{
        "name": "",
        "img_path": ""
      },
      "dbDetails": [
        // {
        //   "dataBaseName": "demo_new_metarepo",
        //   "userName": "gathiads",
        //   "password": "Admin56Gathi9156"
        // }
      ]
    }
    console.log( this.selectedConDtl)
    // this.dataTableViewDB.destroy();
    this.service.post(this.service.databasesbyconnid, { 'conn_id': conn.conn_id }).subscribe((res) => {
      console.log(res);
      // this.dataTable.destroy()
      for(let i=0;i<res.length;i++){
        res[i].editable=false  
        res[i].port=res[i].port_nbr
      }
      console.log(res)
      this.selectedConDtl.dbDetails=res
      this.chRef.detectChanges();
      const table: any = $('.tableviewDB');
      // this.dataTableViewDB= table.DataTable(this.dtOption);
      this.editable.editable=false;
      this.editable.db_usr_id="";
    },
    (err)=>{
      alert("Error in getting details")
    });
  }
  editDBtrue(newdbdtl){
    
    this.editable=newdbdtl;
    this.editable.editable=true;
  }
  editDBfalse(){
    this.editable.editable=false;
    this.editable={}
    this.editable.editable=false;
    this.editable.db_usr_id="";
  }
  Upadatedtl(dbdata){
    console.log(this.editable)
    if(this.editable.db_usr_id==""){
      window.alert("Pls Select The Dbdtl");
    }else{
      var data=this.selectedConDtl
      console.log(this.editable)
        this.editable['dataBaseName']=this.editable.db_nm
        this.editable['userName']=this.editable.db_usr_id
        this.editable['password']=this.editable.db_pwd_txt
      console.log(this.editable)
      data.dbDetails=[this.editable]
      
      console.log(data)
      this.service.post(this.service.insertupdateconndetails, data).subscribe((res) => {
        console.log("SuccessFully Updated");
        console.log(this.selectedConDtl)
        console.log(dbdata)
        this.selectedConDtl.dbDetails.forEach(element => {
            if(element.db_usr_id==dbdata.db_usr_id){
              element.editable=false;
            }
            
        });
      }),(err)=>{
        console.log("Error in updating");
      }
    }

  }
  deleteConnection() {

  }

}
