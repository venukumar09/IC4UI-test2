import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-select-sources',
  templateUrl: './select-sources.component.html',
  styleUrls: ['./select-sources.component.css']
})
export class SelectSourcesComponent implements OnInit {

  sources =[];
  platforms = [];
  selectedSource: any;
  selectedPlatform = '';
  hovered_platform = '';

  @Output() dataEvent = new EventEmitter<any>();

  constructor(private service: ApiService,private storage:LocalStorageService) { }

  ngOnInit() {
    let temp
    temp=this.storage.retrieve("databases")
    console.log(temp)
    if(temp==null){
      // this.sources = temp.source_types;
    // this.sourceSelected(this.sources[0]);
    this.loadInitialData();
    }else{
    this.sources = temp.source_types;
    this.sourceSelected(this.sources[0]);  
    }
    // this.sources = temp.source_types;
    // this.sourceSelected(this.sources[0]);
    this.loadInitialData();
  }

  loadInitialData() {
    this.service.post(this.service.get_connector_types, {})
      .subscribe(
        res => {
          this.sources = res.source_types;
          this.sourceSelected(this.sources[0]);
          console.log(res)
          this.storage.store("databases",res);
        }, err => {
          console.log('*******')
          console.log(err)
          // alert()
        });
  }

  sourceSelected(src) {
    this.selectedSource = src;
    this.platforms = src.platforms;
  }

  platformSelected(ptf) {
    this.selectedPlatform = ptf;
    console.log(ptf)
    const src_values = delete this.selectedSource.platforms;
    const data = {
      source: this.selectedSource,
      platform: this.selectedPlatform
    }
    // debugger;
    this.dataEvent.emit(data);
  }

  hoveredPlatform(nm) {
    this.hovered_platform = nm
  }

}
