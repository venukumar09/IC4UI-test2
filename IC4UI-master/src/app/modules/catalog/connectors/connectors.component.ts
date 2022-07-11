import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectSourcesComponent } from './select-sources/select-sources.component';

@Component({
  selector: 'app-connectors',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.css']
})
export class ConnectorsComponent implements OnInit {


  @ViewChild(SelectSourcesComponent, { static: false }) sources;
  selectedSource: any;
  selectedPlatform: any;

  showCreateConn = false;
  showViewConnections = false;
  showSources = true;
  showCreateFileConn=false;
  constructor() { }

  ngOnInit() {
  }

  receiveData($event) {
    const data = $event;
    this.selectedSource = data.source;
    this.selectedPlatform = data.platform;
    // console.log(this.selectedPlatform);
    console.log(this.selectedSource.connector_type);
    if(this.selectedSource.connector_type=="DB"){
      this.showCreateConn = true;
      this.showCreateFileConn=false;
      this.showSources = false;
      this.showViewConnections = false;
    }else if(this.selectedSource.connector_type=="File"){
      this.showCreateConn = false;
      this.showCreateFileConn=true;
      this.showSources = false;
      this.showViewConnections = false;
    }
    // console.log(data)
  }

  view_EditConnections(){
    this.showCreateConn = false;
    this.showSources = false;
    this.showViewConnections = true;
  }

  backToSources(){
    this.showCreateConn = false;
    this.showSources = true;
    this.showViewConnections = false;
    this.showCreateFileConn=false;
  }

}
