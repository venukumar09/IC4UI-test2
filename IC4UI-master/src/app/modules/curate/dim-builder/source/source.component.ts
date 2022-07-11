import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, OnChanges } from '@angular/core';

import { ApiService } from '../../../../shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit, OnDestroy, OnChanges {

  searchText: string = '';
  selected_obj = {
    id: '',
    name: '',
    details: {},
    attributes: []
  }

  selected_obj_value: any;

  suggestions = [];
  showSuggestions = false;

  name: string = '';
  @Input() src: any;
  @Output() sourceStatus = new EventEmitter();
  lobs = [];
  apps = [];
  dbPlatforms = [];

  selected_lob_value = '';
  selected_app_value = '';
  selected_db_pltfm_nm = '';

  org_id = '';
  org_nm = '';
  role_id = '';
  usr_id = '';

  constructor(private service: ApiService, private storage: LocalStorageService, private loader: NgxSpinnerService) { }

  ngOnInit() {
    console.log(this.src);

    this.org_id = this.storage.retrieve('orgid');
    this.org_nm = this.storage.retrieve('orgName');
    this.role_id = this.storage.retrieve('roleId');
    this.usr_id = this.storage.retrieve('userId');

    //this.getSourceDetails();
    this.getLobData();
    this.getDBPlatforms();

    // this.selected_obj.attributes =this._data.source_attributes;
    // this.selected_obj.details = this._data.source_details[0]
  }

  ngOnChanges() {
    //alert()
    console.log(this.src);
    if (this.src !== undefined) {
      const data: any = this.src.data;
      if (data != undefined) {
        console.log(data)
        this.selected_obj = data;
      }
    }

  }

  ngOnDestroy() {
    //alert('des')
    this.selected_obj = {
      id: '',
      name:'',
      details: {},
      attributes: []
    }

  }

  submit() {
    this.selected_obj.name = this.src.name;
    const srcDetails = this.selected_obj;
    this.sourceStatus.emit({ data: srcDetails, update: true });
  }

  cancel() {
    this.sourceStatus.emit({ data: [], update: false });
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

  // for hiding suggestions drop
  hideSuggestions() {
    this.suggestions = [];
    this.showSuggestions = false;
  }

  // calling api for getting suggestions
  getSuggestions(searchText?) {
    this.loader.show();
    this.searchText = searchText;
    if (this.searchText !== '' && this.searchText !== undefined) {
      //this.dataService.storeMainResults([]);
      // this.selected_db_pltfm_nm
      if (this.searchText.length >= 3) {
        this.suggestions = [];
        const values = {
          searchText: this.searchText.trim(),
          userId: this.usr_id,
          orgId: this.org_id,
          lobId: this.selected_lob_value,
          apnId: this.selected_app_value,
          db_pltfm_nm: 'hive'
        }
        //this.isLoading = true;
        this.service.post(this.service.dimBuilderSuggestions, values).subscribe((data) => {
          this.showSuggestions = true;
          //this.isLoading = false;
          if (data.length !== 0) {
            this.suggestions = data;
            this.showSuggestions = true;
          } else {
            this.hideSuggestions();
            // this.toaster.showinfo(`No suggestions found for ${this.searchText}`)
          }
          this.loader.hide();
        }, err => {
          alert('Got Error !!!')
          this.loader.hide();
        });
      } else {
        this.hideSuggestions();
        this.loader.hide();
      }
    } else {
      this.loader.hide();
      this.hideSuggestions();
    }
  }

  getSourceDetails(obj) {
    this.loader.show();
    this.selected_obj.id = obj;
    //this.selected_obj.name = obj.obj_nm;
    const parms = {
      obj_id: this.selected_obj.id ,
    }
    this.service.post(this.service.dimBuilderSourceDetails, parms).subscribe(res => {

      this.hideSuggestions();
      const src_attr = res.source_attributes;
      this.selected_obj.attributes = src_attr;
      this.selected_obj.details = res.source_details[0]


      this.loader.hide();
    }, err => {
      this.loader.hide();
      //this.toaster.showerror('Error Getting Data.Please Try Again.')
      alert(err)
    });

  }

  onObjSelect(obj) {
    this.searchText = '';
    this.selected_obj_value = obj.obj_id;
    this.getSourceDetails(obj.obj_id);
  }
}
