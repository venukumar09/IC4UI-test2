import { Component, OnInit, Input, ViewChild, ElementRef,SimpleChanges  } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from 'jquery';
declare var Plotly: any;
@Component({
  selector: 'app-profiling-data',
  templateUrl: './profiling-data.component.html',
  styleUrls: ['./profiling-data.component.scss']
})

export class ProfilingDataComponent implements OnInit {

  public data: any;
  public layout: any;

  @ViewChild('plotContainer', { static: true }) plotContainer: ElementRef;

  @ViewChild("Graph", { static: true })Graph: ElementRef; 
  @ViewChild("Graph1", { static: true })Graph1: ElementRef; 
  @ViewChild("Graph2", { static: true })Graph2: ElementRef; 

  orgName: any;
  orgId: any;
  userId: any;
  @Input('obj_id') obj_id: any;
  iframeURL: any;
  file_found: any;
  last_modified_ts: any;

  constructor(private service : ApiService,private storage : LocalStorageService,private sanitizer : DomSanitizer, private loader : NgxSpinnerService) { }

  ngOnInit() {

    this.orgId = this.storage.retrieve('orgid');
    this.orgName = this.storage.retrieve('orgName');
    this.userId = this.storage.retrieve('userId');
    this.getPassiveProfilingUrl();

   
    
    // Plotly.newPlot('Graph', data, layout);
  }

  ngAfterViewInit() {
    // this.initPlot();
    this.demoPlot();
    this.piePlot();
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.data && changes.data.previousValue) {
      // this.initPlot();
      this.demoPlot();
      this.piePlot();
    }

    if (changes && changes.layout && changes.layout.previousValue) {
      // this.initPlot();
      this.demoPlot();
      this.piePlot();
    }
  }

  initPlot() {

    // this.getTheme();

    // the layout.
    this.layout = {
      autosize: true,
      height: 500,
      legend: { orientation: "h", x: 0, y: -0.1 },
      margin: { l: 10, r: 10, b: 290, t: 70, pad: 0 },
      showlegend: true,

      title: { text: "Alarm Trend Of Process" },
      // xaxis: {
      //   anchor: "y",
      //   autorange: true,
      //   domain: (2)[0.05, 1],
      //   dtick: 15000 * 60 * 1000, //TEST interval
      //   range: (2)["2019-02-21 13:37:13.3223", "2019-04-22 10:22:46.6777"],
      //   showgrid: false,
      //   showticklabels: true,
      //   zeroline: false,
      //   tick0: 0,
      //   tickformat: "%H:%M",
      //   title: {
      //     font: { size: 13, color: "#cccccc" }
      //   },
      //   type: "date",
      //   zeroline: false,
      //   title: 'demo',
      //   side: 'right',
      //   linecolor: '#FFF',
      //   linewidth: 50
      // },
      // yaxis: {
      //   title: 'Demo',
      //   anchor: "x",
      //   autorange: true,
      //   domain: (2)[0.6, 1],
      //   dtick: 50,
      //   range: (2)[-0.18038237738985866, 2.1803823773898587],
      //   showgrid: false,
      //   showticklabels: true,
      //   tick0: 0,
      //   type: "linear",
      //   zeroline: true,
      //   zerolinecolor: "#bdbdbd"
      // }
    }

   
    this.data = [
      {
        x: ["2019-02-25 00:00:00", "2019-02-26 00:00:00", "2019-03-25 00:00:00", "2019-04-19 00:00:00"],
        y: [1, 0, 1, 0],
        type: 'scatter',
        fill: "none",
        mode: "lines+markers",
        line: { shape: 'linear', width: 1 },
        name: "Emergency",
        hovermode: 'closest',
        hoverlabel: { namelength: -1 },
        xaxis: 'x',
        yaxis: 'y'
      },
      {
        x: ["2019-02-25 00:00:00", "2019-02-26 00:00:00", "2019-03-25 00:00:00", "2019-04-19 00:00:00"],
        y: [1, 1, 2, 0],
        type: 'scatter',
        fill: "none",
        mode: "lines+markers",
        line: { shape: 'linear', width: 1 },
        name: "Major",
        xaxis: 'x',
        yaxis: 'y'
      },
      {
        x: ["2019-02-25 00:00:00", "2019-02-26 00:00:00", "2019-03-25 00:00:00", "2019-04-19 00:00:00"],
        y: [0, 0, 0, 1],
        type: 'scatter',
        fill: "none",
        mode: "lines+markers",
        line: { shape: 'linear', width: 1 },
        name: "Critical",
        xaxis: 'x',
        yaxis: 'y'
      }
    ]

    if (this.data !== undefined && this.layout) {
      Plotly.newPlot(this.plotContainer.nativeElement, this.data, this.layout, { staticPlot: false });
    } else {
      console.warn('The data or the layout are not defined');
    }

  }

  public onResize() {
    Plotly.Plots.resize(this.plotContainer.nativeElement);
  }

  demoPlot(){
    var trace1 = {
      x: ['giraffes', 'orangutans', 'monkeys'],
      y: [20, 14, 23],
      name: 'SF Zoo',
      type: 'bar'
    };
    
    // var trace2 = {
    //   x: ['giraffes', 'orangutans', 'monkeys'],
    //   y: [12, 18, 29],
    //   name: 'LA Zoo',
    //   type: 'bar'
    // };
    
    // var data = [trace1, trace2];
    var data = [trace1];
    
    var layout = {barmode: 'group'};
    Plotly.newPlot('Graph', data, layout);
    Plotly.newPlot('Graph1', data, layout);
    Plotly.newPlot('Graph2', data, layout);
  }

  piePlot(){
    var data = [{
      values: [19, 26, 55],
      labels: ['Residential', 'Non-Residential', 'Utility'],
      type: 'pie'
    }];
    
    var layout = {
      height: 400,
      width: 500
    };
    
    Plotly.newPlot('myDiv1', data, layout);
  }
  tabValue= 1;
  activeTab(val){
    this.tabValue = val
  }

  tabValue1= 1;
  activeTab1(val){
    this.tabValue1 = val
  }

  tabValue2= 1;
  activeTab2(val){
    this.tabValue2 = val
  }

  tabValue3= 1;
  activeTab3(val){
    this.tabValue3 = val
  }

  tabValue4= 1;
  activeTab4(val){
    this.tabValue4 = val
  }

  getPassiveProfilingUrl() {

    if (
      this.obj_id === "2ff379a4516cc3d0d56b2c2645ad2bc3" ||
      this.obj_id === "446c449d9f4853ce28fbf0946d9c54c3"
    ) {
      let url =
        "https://s3.us-east-2.amazonaws.com/profiling-htmls/gathi_demo/6bf7bbe6fc4eba0f6f880c599dac61ba.html";
      const data = {
        file_found: true,
        last_modified_ts: "2021-07-09 07:11:27+00:00",
      };

      this.iframeURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.file_found = data.file_found;
      this.last_modified_ts = data.last_modified_ts;
      setTimeout(() => {
        let head = $("#profilingFrame").contents().find("body");
        let css =
          "<style>.container{margin: 0 !important;width: 100% !important;}</style>";
        $(head).append(css);
      }, 2000);
    } else {
      // this.loader.show();
      const params = { org_id: this.orgId, user_id: this.userId, obj_id: this.obj_id };
      this.service.post(this.service.passiveProfiling_data_ep, params).subscribe(res => {
        if (res.file_found) {
          this.iframeURL = this.sanitizer.bypassSecurityTrustResourceUrl(res.url);
          this.file_found = res.file_found;
          this.last_modified_ts = res.last_modified_ts;
          setTimeout(() => {
            let head = $("#profilingFrame").contents().find("body");
          let css = '<style>.container{margin: 0 !important;width: 100% !important;}</style>';
          $(head).append(css);
          }, 2000);
        } else if (!res.file_found) {
          this.file_found = res.file_found;
        }
        // this.loader.hide();
      }, err => {
        // this.loader.hide();
        console.log('Got error!!!. Please try again.');
      });
    }

  }

}
