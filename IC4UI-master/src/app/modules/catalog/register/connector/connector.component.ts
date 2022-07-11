import { Component, OnInit, Input, Output,EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { map } from 'rxjs-compat/operator/map';
import { templateJitUrl } from '@angular/compiler';
import { ConnectorsModule } from '../../connectors/connectors.module';
import { importType, ThrowStmt } from '@angular/compiler/src/output/output_ast';
// import { EventEmitter } from 'protractor';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
// import { RouterModule, Routes }  from '@angular/router';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { NgxSpinnerService } from 'ngx-spinner';
// import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
// import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.scss']
})


export class ConnectorComponent implements OnInit {
  @Input() Iscolumns:Boolean;
  @Output() getSearchStatusChange = new EventEmitter<Boolean>();
  selectedValues=[];
  dataTable: any={};
  SchemasMap=new Map();
  showMainContent: Boolean = true;
  masterSelected: any;
  myMap = new Map();
  values: any[];
  count: number=0;
  columndetails: any;
  newtemp: any=[];
  data1:any={};
  schema_details: any=[];
  withSchema: any;
  nextSchema: any;
  finalcolumndetails: any;
  dbIsActive: any;
  dbStatus: boolean;
  TableArray:any=[]
  dbLoader: boolean=false;
  SchemaLoader: boolean=false;
  isSelectedFor: boolean = true;
  selectedDBName: any;
  schemadetailsSubmitconn: any;
  tblLoader: boolean=false;
  calenderNames: any;
  scheduleNames: any;
  slctdClndrNm: any;
  slctdSchdlNm: any;
  schdljobName: any;
  jbStrtDt: any;
  schStrtDt: any;
  schStrttm: any;
  job_start_time: any;
  job_end_time: any;
  mdmjob: any;
  profjob: any;
  profschdljobName: any;
  profselectedConn: any;
  profslctdClndrNm: any;
  profslctdSchdlNm: any;
  profjbStrtDt: any;
  profschStrtDt: any;
  profschStrttm: any;
  profjob_start_time: any;
  profjob_end_time: any;
  supprtGrp: any;
  profsupprtGrp: any;
  columnDetailspopup: {};
  colpopuploader: boolean=false;
  profSLAEndTm: any;
  profSLAStrtTm: any;
  SLAEndTm: any;
  SLAStrtTm: any;
  offsetdays: any;
  profoffsetdays: any;
  vldtdtablecount: any[];
   ShowHideButton() {
      this.showMainContent = this.showMainContent ? false : true;

   }
  ticketingType:any;
  sources: any;
  platforms: any;
  environments: any;
  connections: any;
  databases: any;
  @Input() childMessage: any;
  // @Input() outputParent=new EventEmitter<string>()
  selectedConnType;
  selectedSource: any;
  selectedPlatform: any;
  selectedEnv;
  selectedConn;
  selectedDB ="";
  selectedconname: any;
  schemadetails: any;
  Pagestart:boolean=true;
  db: any;
  dtOption:any={};
  ApplicationId:string;
   files = [{
     file_type_id: 1,
     file_type_name: 'CSV'
   },
   {
    file_type_id: 2,
    file_type_name: 'Parquet'
  }
  
  ];

  delimiter;
  selectedFileType = 'Parquet';
  selectedFileTypeName;


  constructor(private service: ApiService,private loader: NgxSpinnerService,private chRef: ChangeDetectorRef,private storage:LocalStorageService,private router: Router) { }

  ngOnInit() {
    // this.TableArray=
    console.log(this.childMessage)
    console.log(this.childMessage['apn'])
    this.ApplicationId=this.childMessage['apn']
    this.loadInitialData();
    this.environments = [{ name: 'Dev' }, { name: 'Prod' }];
    // this.databaseChange();
    this.dtOption={
      // "paging":false,
      // "ordering":false,
      // "info":false,
      "destroy":true,
      "responsive":true
    }

  }

  loadInitialData() {
    // this.chRef.detectChanges();
    //   const table: any = $('.tableviewConn');
    //   this.dataTable = table.DataTable();
    this.service.post(this.service.get_connector_types, {})
      .subscribe(
        res => {
          this.sources = res.source_types;
          console.log(this.sources)
          this.sourceSelected(this.sources[0]);
        }, err => {
          console.log('*******');
          console.log(err);
          alert()
        });
  }


  sourceSelected(src) {
    this.selectedSource = src;
    this.platforms = src.platforms;
  }
  loadingConnection(data){

    this.service.post(this.service.connectionnames, data)
      .subscribe(
        res => {
        console.log(res);
        this.connections=res;
        }, err => {
          console.log(err);
          alert(err)
        });
  }
  loadingdatabases(data){
    this.service.post(this.service.databasesbyconnid, data)
      .subscribe(
        res => {
        console.log(res);
        this.databases=res;
        console.log(this.databases)
        this.dbLoader=false;
        }, err => {
          console.log(err);
          alert(err)
          this.dbLoader=false
        });
  }
  loadingSchemas(data){
    this.service.post(this.service.databasesbyconnid, data)
      .subscribe(
        res => {
        console.log(res);

        this.databases=res;
        }, err => {
          console.log(err);
          alert(err)
        });
  }
  platformSelected(ptf) {
    this.selectedPlatform = ptf;
    const src_values = delete this.selectedSource.platforms;
    const data = {
      source: this.selectedSource,
      platform: this.selectedPlatform
    }
  }

  connectorTypeChange() {
    // console.log(this.connections)
    // var db=this.connections.filter((val,i)=>{ return val.db_usr_id == this.selectedConn})[0]

    console.log(this.selectedConnType)

    this.platforms = this.sources.filter(x => x.connector_type == this.selectedConnType)[0].platforms;

    if(this.selectedConnType == 'File'){
      this.platforms = this.platforms.slice(2,4);
    }
  }

  platformChange() {

  }

  environmentChange() {
    console.log(this.selectedEnv)
    let data={
      "env_nm":this.selectedEnv,
      "org_id":this.storage.retrieve('orgid'),
      "platform":this.selectedPlatform,
      "conn_type":this.selectedConnType
    }
    // var dbDetails=this.storage.retrieve('databases').source_types[0].platforms;
   
   var dbDetails = this.platforms;
    this.withSchema=dbDetails.filter((val,i)=>{ return val.db_pltfm_nm == this.selectedPlatform})[0].schema;
    console.log(dbDetails)
    console.log(this.withSchema)
    console.log(data)
    this.loadingConnection(data);
  }
  fileDbName;
  connectionChange() {
    this.databases=[];
    this.schemadetails=[];
    this.TableArray=[];
    this.selectedDB='';
    this.dbLoader=true;
    var con=this.connections.filter((val,i)=>{ return val.conn_id == this.selectedConn})[0]
    this.selectedconname=con.conn_nm;
    this.fileDbName = con.db_nm
    console.log(this.selectedConn)
    let data={
      "conn_id":this.selectedConn,
    }

    if(this.selectedConnType == 'File'){
     this.loadSchemaList();
    }else{
      this.loadingdatabases(data)
    }
   
  }
  schemaSelect(data){
    console.log(data)
    console.log(this.schemadetails)
    var data1=this.data1
    data1.params.selected_schemas=[]
    var tableDetails=[]
    data1.params.selected_schemas.push(data['schema_name'])
    if(this.SchemasMap.has(data.schema_name)){

      this.SchemasMap.get(data.schema_name).isSelected=false;
      this.SchemasMap.delete(data.schema_name);
      this.schemadetails.forEach(element=> {
        if(data.schema_name==element.schema_name){
          element.table_details=tableDetails
          element.table_details.forEach(element2 => {

            // this.service.post(this.service.getschemaslist, data1).subscribe(res=>{

            // });
            element2.isSelected=true;
          });
        }
      });
this.TableArray = Array.from( this.SchemasMap.values());
    }else{
      console.log(data1)
      this.tblLoader=true
      this.service.post(this.service.gettableslist, data1).subscribe(res=>{

        console.log(res)
        tableDetails=res.catalog_result.table_details.schema_details[0].table_details;
        console.log(tableDetails)
        console.log(data)
        this.tblLoader=false;
        tableDetails.forEach(element => {
          element.isSelected=true
        },err=>{
          this.tblLoader=false;
          alert("Error in fecthing tableDetails")
        });
        data.table_details=tableDetails;
        data.isSelected=true;
      this.SchemasMap.set(data.schema_name,data);
      this.TableArray = Array.from( this.SchemasMap.values());
      console.log(this.TableArray)

    });

    }
    console.log(this.SchemasMap)

    console.log(this.TableArray)

  }
  selectAll(schemaName){
    console.log(schemaName)
    console.log(this.TableArray)
    // for(let i=0;i<this.TableArray;i++){
    //   this.TableArray.schemadetails
    // }
  }
  // tableSelect(schemadtl,tbldetail){
  //   console.log(schemadtl)
  //   console.log(tbldetail)
  // }
  databaseChange(db){

    console.log(this.selectedDB)
    // var db=this.selectedDB;
    if(this.selectedDB==db.db_usr_id && this.dbStatus==true){
      this.dbStatus=false;
      this.selectedDB='';
      this.selectedDBName='';
      this.TableArray=[];
      this.SchemasMap.clear();
      this.SchemaLoader=false;
    }else{
      this.SchemaLoader=true;
      this.selectedDB=db.db_usr_id;
      this.selectedDBName=db.db_nm;
      this.dbStatus=true
    console.log(this.databases)
    console.log(this.db)
    if(this.databases){
      this.db=this.databases.filter((val,i)=>{ return val.db_usr_id == this.selectedDB})[0]
    }

    console.log(this.db)
    // console.log()
    var snowflake=this.connections.filter((val,i)=>{ return val.db_nm.toLowerCase() == db.db_nm.toLowerCase()})[0]
    console.log(snowflake)
    var data1=this.data1={
            "params":{
                        "host":this.db.host_url_txt,
                        "db_nm":this.db.db_nm,
                        "port":this.db.port_nbr,
                        "warehouse":snowflake.warehouse,
                        "selected_subplatform": "",
		                    "selected_schemas":[this.db.db_nm],
                        "db_usr_id":this.db.db_usr_id,
                        "db_pwd_txt":this.db.db_pwd_txt,
                        "conn_type":this.selectedConnType,
                        "platform":this.selectedPlatform,
                        "conn_id":this.selectedConn,
                        "conn_nm":this.selectedconname,
                        "usr_id":this.db.db_usr_id,
                        "usr_role_grp_id":this.storage.retrieve('roleid'),
                        "env_nm":this.selectedEnv,
                        "with_schema": true,
                        "org_id": this.childMessage['org'],
                        "ln_of_bsn_id": this.childMessage['lob'],
                        "apn_id": this.childMessage['apn'],
                        "edit_conn":false,
                        "projectid": "0",
                        "input_file_dir":"",
                        "input_file_nm":"",
                        "sub_conn_type":this.selectedConnType,
                        "sub_conntr_type": this.selectedConnType,

                      }

                      }
                      var databaseslocal=this.storage.retrieve('databases')
                      console.log(this.selectedPlatform)
                      console.log(data1.params.platform)
                      console.log(databaseslocal.source_types[0].platforms)
                      if(this.selectedConnType=='DB'){
                        for(let i=0;i<databaseslocal.source_types[0].platforms.length;i++){
                          if(data1.params.platform==databaseslocal.source_types[0].platforms[i].db_pltfm_nm){
                            data1.params.with_schema=databaseslocal.source_types[0].platforms[i].schema;
                            console.log(data1.params.with_schema)
                          }
                        }
                      }
                      console.log(data1)

    this.service.post(this.service.getschemaslist, data1)
      .subscribe(
        res => {
        console.log(res);
        this.SchemaLoader=false;
        // console.log(res.catalog_result.table_details.schema_details)
        console.log(this.schemadetails)
    if(data1.params.with_schema==true){
      this.schemadetails=res.schema_details;
      // this.schemadetails.forEach(element => {
      //   console.log(element)
      //   element.table_details.forEach(element2 => {
      //     element2.isSelected=true;
      //     // console.log(element2)
      //   });
      // });
      console.log(this.schemadetails)
    }else{
      this.schemadetails=res.schema_details;
      var tempSchemaDtl=res.schema_details;
      for(let i=0;i<tempSchemaDtl.length;i++){
        var tempsplit=tempSchemaDtl[i].schema_name.split('.');
        console.log(tempsplit)
        this.schemadetails[i].schema_name=tempsplit[0];
      }
    }

  }),err=>{
    this.SchemaLoader=false;
  }
  // console.log(this.schema_details.length)
  // console.log((!this.schema_details))
    if(!(!this.schema_details)){
      console.log(this.schema_details)
      for(let i=0;i<this.schema_details.length;i++){
        this.schemadetails[i].masterSelected=false

        for(let j=0;j<this.schemadetails[i].table_details.length;j++){
          this.schemadetails[i].table_details[j].isSelected=false
        }
        console.log(this.schemadetails[i])
      }
    }

    //res.catalog_result;
    //     console.log(this.schemadetails)
    //     }, err => {
    //       console.log(err);
    //       alert(err)
    //     });


  }
}
  checkUncheckAll(checklist) {
    console.log(checklist)
    if(checklist.masterSelected==false){
    checklist.masterSelected=true;
    for (var i = 0; i < checklist.table_details.length; i++) {
      checklist.table_details[i].isSelected = true;
    }
    this.count=checklist.table_details
    this.myMap.set(checklist.md5_schema_id,checklist);
    console.log(this.myMap)
    this.maptoArray()
    // this.getCheckedItemList();
    }else{
      checklist.masterSelected=false;
    for (var i = 0; i < checklist.table_details.length; i++) {
      checklist.table_details[i].isSelected = false;
    }
    this.count=0
    this.myMap.delete(checklist.md5_schema_id);
    console.log(this.myMap)
    this.maptoArray()
    }
    console.log(this.schemadetails)
  }
  isSelected(schemadtl1,tbldtl){
    // console.log(schemadtl)
    console.log(tbldtl)
    // filter((val,i)=>{ return val.conn_id == this.selectedConn})
    if(!this.myMap.has(schemadtl1.md5_schema_id)){
      for(let i of schemadtl1.table_details){
        if(i.md5_table_id==tbldtl.md5_table_id){
          i.isSelected=true;
        }
      }
    }else{
      var temp=this.myMap.get(schemadtl1.md5_schema_id)
      for(let i of temp.table_details){
        if(i.md5_table_id==tbldtl.md5_table_id){
          if(i.isSelected==true){
            temp.masterSelected=false;
            i.isSelected=false;
          }else{
            i.isSelected=true;
          }
        }
      }
    }
    this.myMap.set(schemadtl1.md5_schema_id,schemadtl1)
    console.log(this.myMap.get(schemadtl1.md5_schema_id))
    this.maptoArray()
  }

  isSelectedDb(db){
    console.log(db)
    this.dbIsActive=true;
  }

  maptoArray(){
    // let temp=this.schemadetails.filter((val,i)=>{ return val.md5_schema_id == this.values})[0]
    this.values=[...this.myMap.values()]
    console.log(this.values)
    console.log(this.schemadetails)
    // console.log(this.count)
  }
  sndngSlctdDtls(){
    console.log("this sendingSelected Details")
    console.log(this.values['table_details'])
      this.selectedValues=this.values;
    for(let i=0;i<this.values.length;i++){
      for(let j=0;j<this.values[i].table_details;j++){
        if(this.values[i].table_details[j].isSelected==true){
          this.selectedValues.push(this.values[i]);
          break;
        }
    }
  }
  console.log(this.selectedValues)
}
  removingSlctDtls(){

    this.selectedValues=[];
  }
  SendingAllDetails(){

    this.selectedValues=JSON.parse(JSON.stringify(this.schemadetails));
    // Object.assign([],this.schemadetails);
    for(let i=0;i<this.selectedValues.length;i++){

      let selected_tabledtls=this.selectedValues[i].table_details

      for(let j=0;j<selected_tabledtls.length;j++){
        selected_tabledtls[j].isSelected=true;
      }
    }
    console.log(this.selectedValues)
  }
  removingAllDetails(){
    this.selectedValues=JSON.parse(JSON.stringify(this.schemadetails));
    for(let i=0;i<this.selectedValues.length;i++){

      let selected_tabledtls=JSON.parse(JSON.stringify(this.selectedValues[i].table_details));

      for(let j=0;j<selected_tabledtls.length;j++){
        selected_tabledtls[j].isSelected=false;
      }
    }
    this.selectedValues=[]
  }
  schemaChange(db) {
    // var statev = data.target.textContent
    // console.log(statev)
    console.log(this.db.host_url_txt)
    var data={
      "params": {
        "host":this.db.host_url_txt,
        "db_nm":this.db.db_nm,
        "port":this.db.port_nbr,
        "db_usr_id":this.db.db_usr_id,
        "db_pwd_txt":this.db.db_pwd_txt,
        "conn_type":this.selectedConnType,
        "platform":this.selectedPlatform,
        "conn_id":this.selectedConn,
        "sub_conntr_type": "database",
        "input_file_dir": "",
        "input_file_nm": "",
        "applicationid": this.ApplicationId,
        "subapplicationid": "0",
        "projectid": "0",
        "selected_schemas": [
          "security_t2"
        ],
        "sub_conn_type":"database",
        "env_nm":this.selectedEnv,
        "with_schema": true,
        "org_id": this.childMessage['org'],
        "ln_of_bsn_id": this.childMessage['lob'],
        "conn_nm":this.selectedconname,
        "usr_id":this.storage.retrieve('userid'),
        "usr_role_grp_id":this.storage.retrieve('roleid'),
        "old_db_usr_id": "gathiadmin",
        "old_db_pwd_txt": "Admin56Gathi9156",
        "profilejson": "",
        "selected_subplatform": "",
        "apn_id": this.ApplicationId,
        "edit_conn": false,
      }
    }

    this.service.post(this.service.extracttablemetadata, data)
      .subscribe(
        res => {
        console.log(res);
        // this.schemadetails=res.catalog_result;
        // console.log(this.schemadetails)
        }, err => {
          console.log(err);
          alert(err)
        });

    // this.loadingSchemas(data);

  }
  newTableSelect(schema_name,table_name){
    console.log(schema_name)
    console.log(table_name)
    // var index=
    // var schemadtl=this.TableArray.filter((val,i)=>{ return val.schema_name == schema_name})[0]
    // var tabledtl=schemadtl.table_details.filter((val,i)=>{val.table_name == table_name})

    this.TableArray.forEach(element => {
      if(schema_name==element.schema_name){
        element.table_details.forEach(element2 => {
          if(element2.table_name==table_name){
            if(element2.isSelected==true){
              element2.isSelected=false;
              console.log(element2.table_name);
              console.log(element2.isSelected)
            }else{
              element2.isSelected=true;
              console.log(element2.table_name);
              console.log(element2.isSelected)
            }
          }
        });
      }
    });

    console.log("ahai")
  }

  getcolumns(){
    if(this.selectedConnType == 'File'){
      this.getcolumnsfile()
      // this.getcolumnsfile2()

    }else{
      this.getcolumnsdb()
    }
  }
  getcolumnsdb(){
    console.log(this.db)
    this.values=this.TableArray;
    console.log(this.values)

    this.nextSchema=JSON.parse(JSON.stringify(this.values));
    // var temp=new temp();
    var temptable_details=[]
    for(let i of this.nextSchema){
      i.schema_name=this.db.db_nm+"."+i.schema_name
      console.log(i.schema_name)
      console.log(i.table_details.length)
      for (let j=0;j<i.table_details.length;j++){
          if(i.table_details[j].isSelected==true){
            // i.table_details.splice(j,1)
            temptable_details.push(i.table_details[j]);
          }
      }
      console.log(temptable_details)
      i.table_details=temptable_details;
      console.log(i.table_details)
    }
    console.log(this.values)

    console.log(this.db)
    // console.log()
    // var snowflake=this.connections.filter((val,i)=>{ return val.db_nm == this.db.db_nm})[0]
     var snowflake=this.connections.filter((val,i)=>{ return val.db_nm.toLowerCase() == this.db.db_nm.toLowerCase()})[0]
    console.log(snowflake)
    console.log(this.nextSchema)
    var selectedschemas=[]
    this.nextSchema.forEach(element => {
      selectedschemas.push(element.schema_name)
    });

    var data={
        "params": {
        "host":this.db.host_url_txt,
        "db_nm":this.db.db_nm,
        "port":this.db.port_nbr,
        "warehouse":snowflake.warehouse,
        "selected_subplatform": "",
        "selected_schemas": selectedschemas,
        "db_usr_id":this.db.db_usr_id,
        "db_pwd_txt":this.db.db_pwd_txt,
        "platform":this.selectedPlatform,
        "conn_type":this.selectedConnType,
        "usr_id": this.storage.retrieve('userid'),
        "usr_role_grp_id": this.storage.retrieve('roleid'),
        "conn_nm": this.selectedconname,
        "schema_details": this.nextSchema,
        "conn_id":this.selectedConn,
        "with_schema":this.withSchema,
        "env_nm":this.selectedEnv,
        "org_id": this.storage.retrieve('orgid'),
        "ln_of_bsn_id": this.childMessage['lob'],
        "apn_id":this.childMessage['apn'],
        "edit_conn": false,
        "projectid": "0",
        "input_file_dir": "",
        "input_file_nm": "",
        "sub_conn_type": "DB",
        "conn_sub_type_nm": "DB",
        "ln_of_bsn_nm": this.childMessage['lob_nm'],
        "apn_nm": this.childMessage['apn_nm'],
                    }
            }
            console.log(this.values)
            this.loader.show()
    this.service.post(this.service.runmdmloadingjob, data)
      .subscribe(
        res => {
          this.loader.hide()
          alert("Registration Successful")
          this.router.navigate(["home"])
        //   this.newtemp=[]
        //   this.columndetails=res.catalog_result
        //   this.schemadetailsSubmitconn=res['catalog_result'].schema_details
        //   // this.chRef.detectChanges();
        //   // const table: any = $('.tableviewConn');
        //   // this.dataTable = table.DataTable(this.dtOption);
        //   for(let i=0;i<res['catalog_result'].schema_details.length;i++){
        //     for(let j=0;j<res['catalog_result'].schema_details[i].table_details.length;j++){
        //       for(let k=0;k<res['catalog_result'].schema_details[i].table_details[j].column_details.length;k++){
        //         var tempIsNull=true,tempIsPrimary=false;

        //         if(res.catalog_result.schema_details[i].table_details[j].column_details[k].nullable=='YES'){
        //           tempIsNull=true
        //         }else{
        //           tempIsNull=false;
        //         }
        //         for(let l=0;l<res['catalog_result'].schema_details[i].table_details[j].primary_keys.length;l++){
        //           if(res.catalog_result.schema_details[i].table_details[j].column_details[k].column_name==res['catalog_result'].schema_details[i].table_details[j].primary_keys[l]){
        //             tempIsPrimary=true;
        //           }else{
        //             tempIsPrimary=false;
        //           }
        //         }
        //         var temp1={
        //         "Schema_name":res.catalog_result.schema_details[i].schema_name,
        //         "Table_Name":res.catalog_result.schema_details[i].table_details[j].table_name,
        //         "column_name":res.catalog_result.schema_details[i].table_details[j].column_details[k].column_name,
        //         "datatype":res.catalog_result.schema_details[i].table_details[j].column_details[k].datatype,
        //         "nullable":tempIsNull,
        //         "isPrimary":tempIsPrimary,
        //         "datatype_length":res.catalog_result.schema_details[i].table_details[j].column_details[k].datatype_length
        //       }
        //       console.log(temp1)
        //       this.newtemp.push(temp1);
        //       this.finalcolumndetails=res.catalog_result.schema_details
        //     }
        //   }
        // }
        // console.log(this.newtemp)
        // console.log(this.newtemp)

        //   this.Pagestart=false;
        //   this.getSearchStatusChange.emit(false);
        },err=>{
          this.loader.hide()
          alert("Error in Registering objects")
        })
        // this.chRef.detectChanges();
        // const table: any = $('table');
        // this.dataTable = table.DataTable(this.dtOption);
        console.log(this.schemadetails)
  }

  getcolumnsfile(){
    console.log(this.db)
    this.values=this.TableArray;
    console.log(this.values)

    this.nextSchema=JSON.parse(JSON.stringify(this.values));
    // var temp=new temp();
    var temptable_details=[]
    for(let i of this.nextSchema){
      if(this.selectedConnType == 'File'){
        i.schema_name=i.schema_name
      }else{
        i.schema_name=this.db.db_nm+"."+i.schema_name
      }
     
      console.log(i.schema_name)
      console.log(i.table_details.length)
      for (let j=0;j<i.table_details.length;j++){
          if(i.table_details[j].isSelected==true){
            // i.table_details.splice(j,1)
            temptable_details.push(i.table_details[j]);
          }
      }
      console.log(temptable_details)
      i.table_details=temptable_details;
      console.log(i.table_details)
    }
    console.log(this.values)

    console.log(this.db)
    // console.log()
    // var snowflake=this.connections.filter((val,i)=>{ return val.db_nm == this.db.db_nm})[0]
    
    if(this.selectedConnType == 'File'){

    }else{
      var snowflake=this.connections.filter((val,i)=>{ return val.db_nm.toLowerCase() == this.db.db_nm.toLowerCase()})[0]
    }
    // var snowflake=this.connections.filter((val,i)=>{ return val.db_nm.toLowerCase() == this.db.db_nm.toLowerCase()})[0]
    console.log(snowflake)
    console.log(this.nextSchema)
    var selectedschemas=[]
    this.nextSchema.forEach(element => {
      selectedschemas.push(element.schema_name)
    });

    var data={
        "params": {
        "host":this.selectedConnType == 'File' ? '' :this.db.host_url_txt,
        "db_nm":this.selectedConnType == 'File' ? this.fileDbName :this.db.db_nm,
        "port":this.selectedConnType == 'File' ? '' :this.db.port_nbr,
        "warehouse":this.selectedConnType == 'File' ? '' :snowflake.warehouse,
        "selected_subplatform": "",
        "selected_schemas": selectedschemas,
        "db_usr_id":this.selectedConnType == 'File' ? '' :this.db.db_usr_id,
        "db_pwd_txt":this.selectedConnType == 'File' ? '' :this.db.db_pwd_txt,
        "platform":this.selectedPlatform,
        "conn_type":this.selectedConnType,
        "usr_id": this.storage.retrieve('userid'),
        "usr_role_grp_id": this.storage.retrieve('roleid'),
        "conn_nm": this.selectedconname,
        "schema_details": this.nextSchema,
        "conn_id":this.selectedConn,
        "with_schema":this.withSchema,
        "env_nm":this.selectedEnv,
        "org_id": this.storage.retrieve('orgid'),
        "ln_of_bsn_id": this.childMessage['lob'],
        "apn_id":this.childMessage['apn'],
        "edit_conn": false,
        "projectid": "0",
        "input_file_dir": "",
        "input_file_nm": "",
        "sub_conn_type": this.selectedFileType,
        "conn_sub_type_nm": this.selectedFileType,
        "ln_of_bsn_nm": this.childMessage['lob_nm'],
        "apn_nm": this.childMessage['apn_nm'],
                    }
            }
            console.log(this.values)
            this.loader.show()
    this.service.post(this.service.runmdmloadingfilejob, data)
      .subscribe(
        res => {
          this.loader.hide()
          alert("Registration Successful")
          this.router.navigate(["home"])
       
        },err=>{
          this.loader.hide()
          alert("Error in Registering objects")
        })
        // this.chRef.detectChanges();
        // const table: any = $('table');
        // this.dataTable = table.DataTable(this.dtOption);
        console.log(this.schemadetails)
  }

  getcolumnsfile2(){

    console.log(this.schemadetails);
    console.log(this.schemaSelected);
    console.log(this.TableArray);

    var data={
      "params": {
                  "conn_type":this.selectedConnType,
                  "platform":this.selectedPlatform,
                  "env_nm":this.selectedEnv,
                  "conn_nm": this.selectedconname,
                  "conn_id":this.selectedConn,
                  file_type:this.selectedFileType,
                  delimiter: this.delimiter,
                  application: 'life-insurance',
                  object : ["policy"],
                  organisation: '',
                  lob: '',
                  lob_application: '',
                  "usr_id": this.storage.retrieve('userid'),
                  "usr_role_grp_id": this.storage.retrieve('roleid'),
                  "org_id": this.storage.retrieve('orgid'),
                  "ln_of_bsn_id": this.childMessage['lob'],
                  "apn_id":this.childMessage['apn'],
                  "ln_of_bsn_nm": this.childMessage['lob_nm'],
                  "apn_nm": this.childMessage['apn_nm'],
                  "selected_schemas": this.TableArray,
                 }
          }

    console.log('file2', data);
  }


  getcolumndetailspopup(tablejson,schemajson){
    this.columnDetailspopup={}
    console.log(schemajson)
    console.log(tablejson)
    var snowflake=this.connections.filter((val,i)=>{ return val.db_nm.toLowerCase() == this.db.db_nm.toLowerCase()})[0]
    var data=  {
      "params": {
    "host": this.db.host_url_txt,
    "db_nm":this.db.db_nm,
    "warehouse":snowflake.warehouse,
    "port":this.db.port_nbr,
    "db_usr_id":this.db.db_usr_id,
    "db_pwd_txt":this.db.db_pwd_txt,
    "platform":this.selectedPlatform,
    "conn_type":this.selectedConnType,
    "usr_id": this.storage.retrieve('userid'),
    "usr_role_grp_id": this.storage.retrieve('roleid'),
    "conn_nm": this.selectedconname,
    "conn_id":this.selectedConn,
    "schema_details":[
      {
    "md5_schema_id": schemajson.md5_schema_id,
    "schema_name": this.selectedDBName+"."+schemajson.schema_name,
    "table_details": [
      tablejson]
    }]


      // "host":this.db.host_url_txt,
      // "db_nm":this.db.db_nm,
      // "port":this.db.port_nbr,
      // "warehouse":snowflake.warehouse,
      // "selected_subplatform": "",
      // "selected_schemas": selectedschemas,
      // "db_usr_id":this.db.db_usr_id,
      // "db_pwd_txt":this.db.db_pwd_txt,
      // "platform":this.selectedPlatform,
      // "conn_type":this.selectedConnType,
      // "usr_id": this.storage.retrieve('userid'),
      // "usr_role_grp_id": this.storage.retrieve('roleid'),
      // "conn_nm": this.selectedconname,
      // "schema_details": this.nextSchema,
      // "conn_id":this.selectedConn,
      // "with_schema":this.withSchema,
      // "env_nm":this.selectedEnv,
      // "org_id": this.storage.retrieve('orgid'),
      // "ln_of_bsn_id": this.childMessage['lob'],
      // "apn_id":this.childMessage['apn'],
      // "edit_conn": false,
      // "projectid": "0",
      // "input_file_dir": "",
      // "input_file_nm": "",
      // "sub_conn_type": "DB",
      // "conn_sub_type_nm": "DB",
      // "ln_of_bsn_nm": this.childMessage['lob_nm'],
      // "apn_nm": this.childMessage['apn_nm'],
                  }
          }
          this.newtemp=[]
          this.colpopuploader=true
          this.service.post(this.service.getcolumndetails,data).subscribe(res=>{
            console.log(res)
            this.columnDetailspopup=res.catalog_result.schema_details[0]
              this.newtemp=[]
              this.colpopuploader=false;
          this.columndetails=res.catalog_result
          this.schemadetailsSubmitconn=res['catalog_result'].schema_details
          for(let i=0;i<res['catalog_result'].schema_details.length;i++){
            for(let j=0;j<res['catalog_result'].schema_details[i].table_details.length;j++){
              for(let k=0;k<res['catalog_result'].schema_details[i].table_details[j].column_details.length;k++){
                var tempIsNull=true,tempIsPrimary=false;

                if(res.catalog_result.schema_details[i].table_details[j].column_details[k].nullable=='YES'){
                  tempIsNull=true
                }else{
                  tempIsNull=false;
                }
                for(let l=0;l<res['catalog_result'].schema_details[i].table_details[j].primary_keys.length;l++){
                  if(res.catalog_result.schema_details[i].table_details[j].column_details[k].column_name==res['catalog_result'].schema_details[i].table_details[j].primary_keys[l]){
                    tempIsPrimary=true;
                  }else{
                    tempIsPrimary=false;
                  }
                }
              var temp1={
                "Schema_name":res.catalog_result.schema_details[i].schema_name,
                "Table_Name":res.catalog_result.schema_details[i].table_details[j].table_name,
                "column_name":res.catalog_result.schema_details[i].table_details[j].column_details[k].column_name,
                "datatype":res.catalog_result.schema_details[i].table_details[j].column_details[k].datatype,
                "nullable":tempIsNull,
                "isPrimary":tempIsPrimary,
                "datatype_length":res.catalog_result.schema_details[i].table_details[j].column_details[k].datatype_length
              }
              console.log(temp1)
              this.newtemp.push(temp1);
              this.finalcolumndetails=res.catalog_result.schema_details
            }
          }
        }
        this.chRef.detectChanges();
      const table: any = $('table');
      this.dataTable = table.DataTable(this.dtOption);
      console.log(this.newtemp)
      console.log(this.newtemp)
          })
  }
  backtosources(){
    this.Pagestart=true;
    this.getSearchStatusChange.emit(true);
    console.log(this.schemadetails)
  }
  submitConnection(){
    var data1=this.schemadetailsSubmitconn;
    // for(let i=0;i<this.schemadetails.table_details.length;i++){

    // }
    console.log(this.schema_details)
    for(let i=0;i<this.schemadetailsSubmitconn[0].table_details.length;i++){
      console.log(this.schemadetailsSubmitconn[0].table_details)
      // i['nullablekeys']=[];
      this.schemadetailsSubmitconn[0].table_details[i]['nullablekeys']=[]
      // console.log(this)
    }
    var snowflake=this.connections.filter((val,i)=>{ return val.db_nm == this.db.db_nm})[0]
    console.log(snowflake)
    var datasubconn={
        "params": {
        "host":this.db.host_url_txt,
        "db_nm":this.db.db_nm,
        "port":this.db.port_nbr,
        "warehouse":snowflake.warehouse,
        "platform":this.selectedPlatform,
        "db_usr_id":this.db.db_usr_id,
        "db_pwd_txt":this.db.db_pwd_txt,
        "conn_id":this.selectedConn,
        "usr_id": this.storage.retrieve('userid'),
        "usr_role_grp_id": this.storage.retrieve('roleid'),
        "conn_nm": this.selectedconname,
        "org_id":this.storage.retrieve('orgid'),
        "ln_of_bsn_id": this.childMessage['lob'],
        "apn_id": this.ApplicationId,
        "conn_sub_type_nm":this.selectedConnType,
        "conn_json": {
          "platform": this.selectedPlatform,
          "conn_nm": this.selectedconname,
          "conn_id":this.selectedConn,
          "schema_details": this.finalcolumndetails
        }
      }
    }
  console.log(datasubconn)
  this.service.post(this.service.submitconnection,datasubconn)
  .subscribe(
    res => {
      console.log(res)

      alert("Successfully Registered")
      this.router.navigate(['/catalog']);
    }
    )
  console.log(datasubconn)
}
validate(){
  console.log(this.TableArray)
  this.values=this.TableArray;

  console.log(this.values)
  this.nextSchema=JSON.parse(JSON.stringify(this.values));
  console.log(this.db)
    this.values=this.TableArray;
    console.log(this.values)

    this.nextSchema=JSON.parse(JSON.stringify(this.values));
    // var temp=new temp();
    var tempSchemadtls=JSON.parse(JSON.stringify(this.TableArray))
    var temptable_details=[]
    for(let i of tempSchemadtls){
      for (let j=0;j<i.table_details.length;j++){
          if(i.table_details[j].isSelected==true){
            // i.table_details.splice(j,1)
            temptable_details.push(i.table_details[j]);
          }
      }
      console.log(temptable_details)
      i.table_details=temptable_details;
      // console.log(i.table_details)
      temptable_details=[]
    }
    console.log(this.nextSchema)
    console.log(this.values)

    console.log(this.db)
  console.log("Validate Schemas and tables")
  console.log(this.nextSchema)
  var selectedschemas=[]
    this.nextSchema.forEach(element => {
      selectedschemas.push(element.schema_name)
    });
  var snowflake=this.connections.filter((val,i)=>{ return val.db_nm == this.db.db_nm})[0]
  var data={
    "params": {
    "host":this.db.host_url_txt,
    "db_nm":this.db.db_nm,
    "port":this.db.port_nbr,
    "warehouse":snowflake.warehouse,
    "selected_subplatform": "",
    "selected_schemas": selectedschemas,
    "db_usr_id":this.db.db_usr_id,
    "db_pwd_txt":this.db.db_pwd_txt,
    "platform":this.selectedPlatform,
    "conn_type":this.selectedConnType,
    "usr_id": this.storage.retrieve('userid'),
    "usr_role_grp_id": this.storage.retrieve('roleid'),
    "conn_nm": this.selectedconname,
    "schema_details": tempSchemadtls,
    "conn_id":this.selectedConn,
    "with_schema":this.withSchema,
    "env_nm":this.selectedEnv,
    "org_id": this.storage.retrieve('orgid'),
    "ln_of_bsn_id": this.childMessage['lob'],
    "apn_id":this.childMessage['apn'],
    "edit_conn": false,
    "projectid": "0",
    "input_file_dir": "",
    "input_file_nm": "",
    "sub_conn_type": "DB",
    "conn_sub_type_nm": "DB",
    "ln_of_bsn_nm": this.childMessage['lob_nm'],
    "apn_nm": this.childMessage['apn_nm'],
                }
        }
        console.log(data)
        this.loader.show()
        this.service.post(this.service.validatetables,data).subscribe(res=>{
          this.loader.hide()
          console.log(res)
          this.vldtdtablecount=res.schema_details
          // this.TableArray=res.schema_details
          // var tamp1
          console.log(res.schema_details)
          for(let i=0;i<res.schema_details.length;i++) {
            for(let j=0;j<this.TableArray.length;j++){
              if(this.TableArray[j].schema_name==res.schema_details[i].schema_name){
                for(let k=0;k<res.schema_details[i].table_details.length;k++){
                    for(let l=0;l<this.TableArray[j].table_details.length;l++){
                      if(res.schema_details[i].table_details[k].table_name==this.TableArray[j].table_details[l].table_name){
                        this.TableArray[j].table_details[l]=res.schema_details[i].table_details[k]
                        this.TableArray[j].table_details[l].isSelected=true
                      }
                    }
                }
                // res.schema_details[i].table_details.forEach(restblelement => {
                //   var temp=this.TableArray[j].table_details;
                //   temp.forEach(tblelement => {
                //         if(restblelement.table_name==tblelement.table_name){
                //           tblelement=restblelement
                //           tblelement['isSelected']=true
                //         }
                //     });
                //   // this.TableArray[j].table_details=temp
                // });

              }
            };
          };

          console.log(this.TableArray)
        },err=>{
          this.loader.hide();
          alert("error in validating Tables")
        })

        // var res={
        //   "schema_details": [
        //     {
        //       "md5_schema_id": "b153f150648297ecc3f55b67c8192407",
        //       "schema_name": "TPCDS_SF100TCL",
        //       "table_details": [
        //         {
        //           "obj_size_txt": "",
        //           "obj_rows_cnt": 60,
        //           "primary_keys": [],
        //           "foreign_keys": [],
        //           "table_name": "CALL_CENTER",
        //           "obj_status": "Updated",
        //           "obj_color": "orange",
        //           "modified": {
        //             "obj_rows_cnt": "60",
        //             "primary_keys": "",
        //             "foreign_keys": ""
        //           },
        //           "db_nm": "SNOWFLAKE_SAMPLE_DATA",
        //           "md5_table_id": "12adccf5df6e7c38b3031680036939ba",
        //           "obj_type_nm": "Table",
        //           "table_profile": false
        //         }
        //       ],
        //       "isSelected": true
        //     }
        //   ]
        // }
}
getcal_and_schdl_names(){
  this.mdmjob=""
  this.profjob=""
  this.calenderNames=""
  this.scheduleNames=""
  var db_nm=this.databases.filter((val,i)=>{ return val.db_usr_id == this.selectedDB})[0]
  var data={"ln_of_bsn_id":this.childMessage['lob'],
            "apn_id":this.childMessage['apn'],
            "platform":this.selectedPlatform,
            "db_nm":db_nm.db_nm
          }
  this.service.post(this.service.getmdmjobnames,data).subscribe(res=>{
    console.log(res)
    this.mdmjob=res.mdm_job
    this.profjob=res.profiling_job
  })
  this.service.post(this.service.calenderNames_ep,{}).subscribe(res=>{
    console.log(res)
    this.calenderNames=res
  })
  this.service.post(this.service.scheduleNames_ep,{}).subscribe(res=>{
    console.log(res)
    this.scheduleNames=res
  })

}
ScheduleRegister(){
  var data={
    "mdm_job": {
      "conn_job_nm": this.mdmjob,
      "job_nm":this.mdmjob,
      "conn_id": this.selectedConn,
      "clndr_nm": this.slctdClndrNm,
      "sch_nm": this.slctdSchdlNm,
      "job_eff_strt_dt": this.jbStrtDt,
      "sch_eff_strt_dt": this.schStrtDt,
      "sch_strt_tm": this.schStrttm,
      "job_sla_strt_tm": this.SLAStrtTm,
      "job_sla_end_tm": this.SLAEndTm,
      "sla_offset_day_cnt": this.offsetdays,
      "job_pred_cond_txt": "",
      "pred_cond_type_txt": "",
      "support_grp_email_id": this.supprtGrp,
      "job_frq_txt": "",
      "job_prt_nbr": null,
      "max_run_alarm_sec_cnt": null,
      "min_run_alarm_sec_cnt": null,
      "crtcl_job_ind": "N",
      "fin_pnlty_ind": "N",
      "crt_dag_ind": "Y",
      "job_crtd_by_id": this.storage.retrieve('userid'),
      "job_ownr_id": this.storage.retrieve('userid'),
      "rec_lst_updt_by_id": this.storage.retrieve('userid'),
      "org_id": this.storage.retrieve('orgid'),
      "ln_of_bsn_id": this.childMessage['lob'],
      "apn_id": this.childMessage['apn'],
      "tckt_type":this.ticketingType,
    },
    "profiling_job": {
      "conn_job_nm": this.profjob,
      "job_nm":this.profjob,
      "conn_id":this.selectedConn,
      "clndr_nm": this.profslctdClndrNm,
      "sch_nm": this.profslctdSchdlNm,
      "job_eff_strt_dt": this.profjbStrtDt,
      "sch_eff_strt_dt": this.profschStrtDt,
      "sch_strt_tm": this.profschStrttm,
      "job_sla_strt_tm": this.profSLAStrtTm,
      "job_sla_end_tm": this.profSLAEndTm,
      "sla_offset_day_cnt": this.profoffsetdays,
      "job_pred_cond_txt": "",
      "pred_cond_type_txt": "",
      "support_grp_email_id": this.profsupprtGrp,
      "job_frq_txt": "",
      "job_prt_nbr": null,
      "max_run_alarm_sec_cnt": null,
      "min_run_alarm_sec_cnt": null,
      "crtcl_job_ind": "N",
      "fin_pnlty_ind": "N",
      "crt_dag_ind": "Y",
      "job_crtd_by_id": this.storage.retrieve('userid'),
      "job_ownr_id": this.storage.retrieve('userid'),
      "rec_lst_updt_by_id": this.storage.retrieve('userid'),
      "org_id": this.storage.retrieve('orgid'),
      "ln_of_bsn_id": this.childMessage['lob'],
      "apn_id": this.childMessage['apn'],
      "tckt_type":this.ticketingType
    }
  }
  this.service.post(this.service.addconnectorjobs,data)
  .subscribe(
    res => {
      console.log(res)

      alert("Successfully Scheduled")
      this.router.navigate(['/catalog']);
    }
    )

  console.log("Schedule Register")
}

loadSchemaList(){
  this.SchemaLoader = true;
  var data1=this.data1={
    "params":{
              
                "conn_type":this.selectedConnType,
                "platform":this.selectedPlatform,
                "conn_id":this.selectedConn,
                "conn_nm":this.selectedconname,
                
                "usr_role_grp_id":this.storage.retrieve('roleid'),
                "env_nm":this.selectedEnv,
                "with_schema": true,
               
                "edit_conn":false,
                "projectid": "0",
                "input_file_dir":"",
                "input_file_nm":"",
                "sub_conn_type":this.selectedConnType,
                "sub_conntr_type": this.selectedConnType,

              }

              }

              this.service.post(this.service.getschemaslistforfile, data1)
      .subscribe(
        res => {
        console.log(res);
        this.SchemaLoader=false;
        // console.log(this.schemadetails)
    if(data1.params.with_schema==true){
      this.schemadetails=res;
      console.log(this.schemadetails)
    }else{
      this.schemadetails=res;
      var tempSchemaDtl=res;
      for(let i=0;i<tempSchemaDtl.length;i++){
        var tempsplit=tempSchemaDtl[i].schema_name.split('.');
        console.log(tempsplit)
        this.schemadetails[i].schema_name=tempsplit[0];
      }
    }

  }),err=>{
    this.SchemaLoader=false;
  }


}

schemaSelected = [];

schemaSelect2(data){
  this.schemaSelected = [];
  console.log(data)
  console.log(this.schemadetails)
  var data1=this.data1
  data1.params.selected_schemas=[]
  var tableDetails=[]
  data1.params.selected_schemas.push(data['schema_name'])
  this.schemaSelected.push(data['schema_name']);
  if(this.SchemasMap.has(data.schema_name)){

    this.SchemasMap.get(data.schema_name).isSelected=false;
    this.SchemasMap.delete(data.schema_name);
    this.schemadetails.forEach(element=> {
      if(data.schema_name==element.schema_name){
        element.table_details=tableDetails
        element.table_details.forEach(element2 => {

          // this.service.post(this.service.getschemaslist, data1).subscribe(res=>{

          // });
          element2.isSelected=true;
        });
      }
    });
this.TableArray = Array.from( this.SchemasMap.values());
  }else{
    console.log(data1)
    this.tblLoader=true
    this.service.post(this.service.gettableslistforfile, data1).subscribe(res=>{

      console.log(res)
      tableDetails=res.catalog_result.schema_details[0].table_details;
      console.log(tableDetails)
      console.log(data)
      this.tblLoader=false;
      tableDetails.forEach(element => {
        element.isSelected=true
      },err=>{
        this.tblLoader=false;
        alert("Error in fecthing tableDetails")
      });
      data.table_details=tableDetails;
      data.isSelected=true;
    this.SchemasMap.set(data.schema_name,data);
    this.TableArray = Array.from( this.SchemasMap.values());
    console.log(this.TableArray)

  });

  }
  console.log(this.SchemasMap)

  console.log(this.TableArray)

}

getcolumndetailspopupfile(tablejson,schemajson){
  this.columnDetailspopup={}
  console.log(schemajson)
  console.log(tablejson)
  var data1 = {
    "params":
    {
    "conn_type":this.selectedConnType,
    "conn_id":this.selectedConn,
    "selected_schemas":[schemajson.schema_name],
    "object_name":tablejson.table_name
  }
  }
 
  this.newtemp = []
  this.colpopuploader = true;
  this.service.post(this.service.getcolumndetailsforfile,data1).subscribe(res=>{
          // console.log(res)

          var data = res;

          data.forEach( (x, i) =>{
            var temp1={
              "Schema_name":data[i].Schema_name,
              "Table_Name":data[i].Table_Name,
              "column_name":data[i].column_name,
              "datatype":data[i].datatype,
              "nullable":data[i].nullable,
              "isPrimary":data[i].isPrimary,
              "datatype_length":data[i].datatype_length
            }
            // console.log(temp1)
            this.newtemp.push(temp1);
          })
          this.colpopuploader = false;

  }, error =>{
    this.colpopuploader = false;
  });

    //     this.newtemp=[]
    //     this.colpopuploader=true
    //     this.service.post(this.service.getcolumndetailsforfile,data1).subscribe(res=>{
    //       console.log(res)
    //       this.columnDetailspopup=res.catalog_result.schema_details[0]
    //         this.newtemp=[]
    //         this.colpopuploader=false;
    //     this.columndetails=res.catalog_result
    //     this.schemadetailsSubmitconn=res['catalog_result'].schema_details
    //     for(let i=0;i<res['catalog_result'].schema_details.length;i++){
    //       for(let j=0;j<res['catalog_result'].schema_details[i].table_details.length;j++){
    //         for(let k=0;k<res['catalog_result'].schema_details[i].table_details[j].column_details.length;k++){
    //           var tempIsNull=true,tempIsPrimary=false;

    //           if(res.catalog_result.schema_details[i].table_details[j].column_details[k].nullable=='YES'){
    //             tempIsNull=true
    //           }else{
    //             tempIsNull=false;
    //           }
    //           for(let l=0;l<res['catalog_result'].schema_details[i].table_details[j].primary_keys.length;l++){
    //             if(res.catalog_result.schema_details[i].table_details[j].column_details[k].column_name==res['catalog_result'].schema_details[i].table_details[j].primary_keys[l]){
    //               tempIsPrimary=true;
    //             }else{
    //               tempIsPrimary=false;
    //             }
    //           }
    //         var temp1={
    //           "Schema_name":res.catalog_result.schema_details[i].schema_name,
    //           "Table_Name":res.catalog_result.schema_details[i].table_details[j].table_name,
    //           "column_name":res.catalog_result.schema_details[i].table_details[j].column_details[k].column_name,
    //           "datatype":res.catalog_result.schema_details[i].table_details[j].column_details[k].datatype,
    //           "nullable":tempIsNull,
    //           "isPrimary":tempIsPrimary,
    //           "datatype_length":res.catalog_result.schema_details[i].table_details[j].column_details[k].datatype_length
    //         }
    //         console.log(temp1)
    //         this.newtemp.push(temp1);
    //         this.finalcolumndetails=res.catalog_result.schema_details
    //       }
    //     }
    //   }
    //   this.chRef.detectChanges();
    // const table: any = $('table');
    // this.dataTable = table.DataTable(this.dtOption);
    // console.log(this.newtemp)
    // console.log(this.newtemp)
    //     })
}



}
