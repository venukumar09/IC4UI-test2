import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class TargetComponent implements OnInit {

  @Input() src: any;
  @Input() target: any;
  target_data = {
      name: '',
      id: '',
      details: '',
      attributes: [],
      source: {},
      db_pltfm_nm: '',
      dbName:'',
      schemaName:'' 
  }
  targetAttributes: [];
  lobs = [];
  apps = [];
  dbPlatforms = [];
  selected_dbpltfm_value = '';
  selected_conn_id = '';
  selected_lob_value = '';
  selected_apn_value = '';

  org_id = '';
  org_nm = '';
  roleId = '';
  userId = '';

  @Output() sourceStatus = new EventEmitter();

  tgt_obj = {
    org_id : '',
    lob_id : '',
    apn_id: '',
    db_pltfm_nm : '',
    db_nm: '',
    obj_nm : '',
    usr_id: '',
    attributes : [],    
    conn_id:'',
   
  }

  constructor(private service: ApiService,
    private storage: LocalStorageService,
    private loader: NgxSpinnerService) {
    this.org_id = this.storage.retrieve('orgid');
    this.org_nm = this.storage.retrieve('orgName');
    this.roleId = this.storage.retrieve('roleId');
    this.userId = this.storage.retrieve('userId');
  }

  ngOnInit() {
    console.log(this.src);
    console.log(this.target);
    if (this.src.data !== undefined) {
      this.targetAttributes = this.src.data.attributes ? this.src.data.attributes : [];
    }
    if(this.target.data !== undefined){
      this.target.dbName =  this.target.data.dbName ;
      this.target.schemaName = this.target.data.schemaName;
    }
    
    this.getLobData();
    this.getDBPlatforms();
  }

  submit() {
    this.target_data.attributes = this.targetAttributes;
    this.target_data.name = this.target.name;
    this.target_data.source = this.src;
    this.target_data.db_pltfm_nm = this.selected_dbpltfm_value;
    this.target_data.dbName = this.target.dbName;
    this.target_data.schemaName =this.target.schemaName;

    const tgtDetails = this.target_data;
    this.sourceStatus.emit({ data: tgtDetails, update: true });
  }


  cancel() {
    this.sourceStatus.emit({ data: [], update: false });

    //this.aggregator_data = {
    //  name: '',
    //  id: '',
    //  details: '',
    //  attributes: [],
    //  filterCondition: '',
    //  output: '',
    //  keys: [],
    //  source: {}
    //};
    //this.targetAttributes = [];
  }

  getDBPlatforms() {
    this.loader.show();
    this.service.post(this.service.dimDBPlatforms, { org_id: this.org_id }).subscribe((data) => {
      this.loader.hide();
      if (data.length !== 0) {
        this.dbPlatforms = data;
        console.log(this.dbPlatforms)
      } else {
      }

    }, err => {
      this.loader.hide();
    });
  }

  getLobData() {
    this.loader.show();
    this.service.post(this.service.get_lobs, { org_id: this.org_id }).subscribe((data) => {
      this.loader.hide();

      if (data.length !== 0) {
        this.lobs = data;
        console.log(this.lobs)
      } else {
      }

    }, err => {
      this.loader.hide();
    });
  }


  getApplications() {
    this.loader.show();
    this.service.post(this.service.get_applications, { lob_id: this.selected_lob_value }).subscribe((data) => {
      this.loader.hide();
      console.log(data)

      if (data.length !== 0) {
        this.apps = data;

      } else {
      }

    }, err => {
      this.loader.hide();
    });
  }

  registerObject() {
    this.loader.show();
    const conn_details = this.dbPlatforms.find(x=>  x.conn_id == this.selected_conn_id)
    this.tgt_obj = {
      org_id: this.org_id,
      lob_id: this.selected_lob_value,
      apn_id: this.selected_apn_value,
      db_pltfm_nm: conn_details.db_pltfm_nm,
      conn_id: this.selected_conn_id, 
      db_nm: '',
      obj_nm: this.target.name,
      usr_id: this.userId,
      attributes: this.targetAttributes      
    }

    this.service.post(this.service.registerDimTargetObject, this.tgt_obj).subscribe((data) => {
      this.loader.hide();
      console.log(data)
      alert('Object registered successfully.');
      if (data.length !== 0) {
        console.log(data)
      } else {
      }

    }, err => {
        alert('Got error while registering object.');
      this.loader.hide();
    });
  }


}
