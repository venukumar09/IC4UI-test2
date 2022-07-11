import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { WrappedNodeExpr } from '@angular/compiler';
declare var $: any;

@Component({
  selector: 'app-create-connections',
  templateUrl: './create-connections.component.html',
  styleUrls: ['./create-connections.component.css']
})
export class CreateConnectionsComponent implements OnInit {

  org_id = '';
  usr_id = '';
  role_id = '';

  dataSources: any = [{ dataBaseName: '', userName: '', password: '' }];
  newDataSource: any = { dataBaseName: '', userName: '', password: '' };
  environments = [];
  dataSourceEdit = false;
  selectedSouceForEdit;
  applications=[];

  @Input() selectedDataSource: any;
  @Input() selectedPlatform: any;
  @Output() childEvent = new EventEmitter();
  connection = {
    platform_nm: '',
    name: '',
    env: 'prod',
    lob: '',
    application:'',
    host: '',
    port: '',
    warehouse:''
  }
  lobnames: any=[];

  constructor(private service: ApiService,private storage:LocalStorageService,private router: Router) { }

  ngOnInit() {
    this.org_id = this.storage.retrieve('orgid');
    this.usr_id = this.storage.retrieve('userid');
    this.role_id = this.storage.retrieve('roleid');
    this.environments = [{ name: 'Dev' }, { name: 'Prod' }];
    console.log(this.org_id,this.usr_id,this.role_id )
    console.log(this.selectedDataSource)
    this.listlobs();
    console.log(this.selectedPlatform)
    // this.listapplications();
  }

backtosources(){
    this.childEvent.emit('this is a test');
}
  getApplications(){
    const params = {
      lob_id: this.connection.lob
    }
    this.service.post(this.service.get_applications, params).subscribe(res => {
      console.log(res);
      this.applications = res;
    }, (err) => { alert('err'); console.log(err) });
  }
  addDataSource() {
    const validated = this.validateDataSource();
    if (validated) {
      // if (!this.dataSourceEdit) {
      //   this.dataSources.push(this.newDataSource);
      // } else {
        const index = this.selectedSouceForEdit;
        this.dataSources[index] = { ...this.newDataSource };
      // }
      console.log(this.dataSources.length)
      this.newDataSource = {};
    } else {
      alert('Fill all the fields');
    }

    this.newDataSource = {};

  }
  listlobs(){
    var data={
      "org_id":this.org_id
    }
    this.service.post(this.service.get_lobs,data).subscribe((res) => {
      console.log(res);
      this.lobnames=res;
    })
  }
  // listapplications(){
  //   this.service.post(this.service.applicationlist,{params:""}).subscribe((res) => {
  //     console.log(res);
  //     this.applications=res;
  //   })
  // }
  validateDataSource() {
    for(let i=0;i<this.dataSources.length;i++){
      const newDataSource = this.dataSources[i];
    if (newDataSource.dataBaseName == undefined || newDataSource.dataBaseName == '') {
      return;
    }
    // if (newDataSource.dbOwnerName == undefined || newDataSource.dbOwnerName == '') {
    //   return;
    // }
    if (newDataSource.userName == undefined || newDataSource.userName == '') {
      return;
    }
    if (newDataSource.password == undefined || newDataSource.password == '') {
      return;
    }
    }
    return true;

  }

  deleteDataSource(src) {
    if(this.dataSources.length==1){
      this.dataSources= [{ dataBaseName: '', userName: '', password: '' }];
    }else{
      this.dataSources = this.dataSources.filter(x => x.dataBaseName != src.dataBaseName);
    }
    // this.dataSources=this.dataSources.splice()
    console.log(this.dataSources)

  }
  similarDBCheck(){
    console.log("Hai ")
  console.log(this.dataSources)
    var map=new Map();
    for(let i=0;i<this.dataSources.length;i++){
      console.log(!map.has(this.dataSources[i].dataBaseName))
      if(!map.has(this.dataSources[i].dataBaseName)){
        map.set(this.dataSources[i].dataBaseName,this.dataSources[i]);
        console.log("main Loop")
        console.log(map)
      }else{
        alert("Multiple Databases having Same Name")
        this.dataSources[i].dataBaseName='';
        // console.log(map)
      //  console.log("db already exists")
        return;
      }
      
    }
    return true;
  }
  showDatasourceModal() {
    // this.dataSourceEdit = false;
    if(this.validateDataSource()){
      this.newDataSource = { dataBaseName: '', userName: '', password: '' };
      this.dataSources.push(this.newDataSource)
    }else{
      alert("Fill all the Fields" )
    }
    
    // $("#newDataSourceModal").modal('show');
  }

  editDataSource(src, index) {
    this.dataSourceEdit = true;
    this.selectedSouceForEdit = index;
    const data = src;
    this.newDataSource = { ...data };
    $("#newDataSourceModal").modal('show');
  }

  insertNewConnection() {
    console.log(this.selectedPlatform)
    // const validated_conn = this.validateConnection();

    const validated_dataSrc = this.validateFinalDataSources();
    const validateconndtl= this.validateconnDetails();
    if (validated_dataSrc && validateconndtl) {
      if(this.selectedPlatform.db_pltfm_nm=="SnowFlake"||(this.connection.port.length==4||this.connection.port.length==5)){
      const newConnection = {
        source: this.selectedDataSource,
        platform: this.selectedPlatform.db_pltfm_nm,
        conn_nm: this.connection.name,
        env: this.connection.env,
        lob:this.connection.lob,
        application:this.connection.application,
        host: this.connection.host,
        port: this.connection.port,
        dbDetails: this.dataSources,
        org_id: this.org_id,
        usr_id: this.usr_id,
        role_id: this.role_id,
        warehouse:this.connection.warehouse
      }

      console.log(newConnection)

      this.service.post(this.service.createnewdbconnection, newConnection).subscribe((res) => {
        alert('Connection created successfully');
        this.router.navigate(['/catalog'])
      }, err => {
        alert('error creating conn')
      });
    }else{
      alert("Enter valid Port Number")
    }
    } else {
      alert('Fill are required fields.');
    }


    // validate fields
    // post
  }
  validateconnDetails(){
    if(this.selectedDataSource==null || this.selectedDataSource==""){ return; }
    if(this.selectedPlatform.db_pltfm_nm==null || this.selectedPlatform.db_pltfm_nm==""){ return; }
    if(this.connection.env==null || this.connection.env==""){ return; }
    if(this.connection.lob==null || this.connection.lob==""){ return; }
    if(this.connection.application==null || this.connection.application==""){ return; }
    if(this.selectedPlatform.db_pltfm_nm!="SnowFlake"){
      if(this.connection.port==null || this.connection.port==""){ return; }
    }
    
    // if(this.connection.port.length!=4 && this.connection.port.length!=5){return;}
    return true;
  }
  validateFinalDataSources() {
    const datasources = this.dataSources;
    if (datasources.length == 0) {
      return;
    } else {
      for (let i = 0; i < datasources.length; i++) {
        const element = datasources[i];

        if (element.dataBaseName == undefined || element.dataBaseName == '') {
          return;
        }
        // if (newDataSource.dbOwnerName == undefined || newDataSource.dbOwnerName == '') {
        //   return;
        // }
        if (element.userName == undefined || element.userName == '') {
          return;
        }
        if (element.password == undefined || element.password == '') {
          return;
        }
      }
      return true;

    }
  };

  validateConnection() {
    const conn = this.connection;

    if (this.connection.name == '') {
      return;
    }
    if (this.connection.env == '') {
      return;
    }
    if(this.connection.lob== ''){
      return;
    }
    if(this.connection.application=''){
      return;
    }
    if (this.connection.host == '') {
      return;
    }
    if (this.connection.port == '') {
      return;
    }
    if(!(this.connection.port.length==4 || this.connection.port.length==5)){
      return;
     }

    return true;
  }

  testConnection(db) {


    // {
    //   "params": {
    //     "db_usr_id": "gathiadmin", "old_db_usr_id": "gathiadmin", "db_pwd_txt": "Admin56Gathi9156", "db_nm": "demo_metarepo", "old_db_pwd_txt":
    //     "Admin56Gathi9156", "with_schema": true, "conn_id": "32209557bf50a9103ecd7e9dd341fce8", "usr_id": "sravanthi",
    //       "host": "gathi-postgres.c39zfgjevvli.us-east-2.rds.amazonaws.com", "port": 5432, "usr_role_grp_id": "DA", "conn_type": "DB", "platform": "postgresql"
    //   }
    // }

    const conn = {
      "params": {
        "db_usr_id": db.userName,
        "db_pwd_txt": db.password,
        "db_nm": db.dataBaseName,
        "with_schema": this.selectedPlatform.schema,
        "usr_id": this.storage.retrieve('userid'),
        "host": this.connection.host,
        "port": this.connection.port,
        "usr_role_grp_id": this.storage.retrieve("roleid"),
        "conn_type": this.selectedDataSource.connector_type,
        "platform": this.selectedPlatform.db_pltfm_nm,
        "warehouse":this.connection.warehouse
      }
    }

    console.log('************************')
    console.log(conn);
    console.log('************************')

    this.service.post(this.service.test_connection, conn).subscribe((res) => {
      // alert(res);
      if(res.type!='string'){
        // if()
        alert(res['Msg'])
      }else{
        alert(res);
      }
    }, err => {
      alert('Error checking connection.');
    });
  }

}
