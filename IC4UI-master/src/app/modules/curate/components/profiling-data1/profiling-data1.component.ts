import { Component, OnInit, Input, ViewChild, ElementRef,SimpleChanges  } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from 'jquery';
declare var Plotly: any;

@Component({
  selector: 'app-profiling-data1',
  templateUrl: './profiling-data1.component.html',
  styleUrls: ['./profiling-data1.component.scss']
})
export class ProfilingData1Component implements OnInit {
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

  @Input('data') profileData: any;
  @Input('columndata') columnDetails: any;
  variableData;

  graph1 = {
    data: [
      { x: [1, 2, 3], y: [2, 3, 4], type: 'bar' },
    ],
    layout: {title: 'Histogram'}
  };

  graph2 = {
    data: [{
      values: [19, 26, 55],
      labels: ['Residential', 'Non-Residential', 'Utility'],
      type: 'pie',
    }
     
    ],
    layout: {title: 'Pie Chart'}
  };

  constructor(private service : ApiService,private storage : LocalStorageService,
    private sanitizer : DomSanitizer, private loader : NgxSpinnerService) { }

  ngOnInit() {

    console.log(this.profileData);
    console.log(this.columnDetails);
    this.orgId = this.storage.retrieve('orgid');
    this.orgName = this.storage.retrieve('orgName');
    this.userId = this.storage.retrieve('userId');
    this.getPassiveProfilingUrl();
    setTimeout(() => {
      
    }, 1000);
    this.convertToArray();

   
    
    // Plotly.newPlot('Graph', data, layout);
  }

  ngAfterViewInit() {
    // this.initPlot();
    // this.demoPlot();
    // this.piePlot();
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.data && changes.data.previousValue) {
      // this.initPlot();
      // this.demoPlot();
      // this.piePlot();
    }

    if (changes && changes.layout && changes.layout.previousValue) {
      // this.initPlot();
      // this.demoPlot();
      // this.piePlot();
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

  tabValue1: any = '1-1';
  activeTab1(val,val1){
    this.tabValue1 = val+'-'+val1;
  }

  returnValue(val, val1){
    if (this.tabValue1 == (val+'-'+val1)){
      return true;
    }else{
      return false;
    }
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

  neededArray = [];
  convertToArray(){

    let varProperties = Object.keys(this.profileData.variables);
    this.neededArray = [];
    let i = 0;
    for (var prop of varProperties ) { 
        this.neededArray.push(this.profileData.variables[prop]);
        this.neededArray[i]['name'] = prop;
        // this.getCommonValues(this.neededArray[i].value_counts_index_sorted);
        
        var minValues = this.getExtremeMinValues(this.neededArray[i].value_counts_without_nan)
        this.neededArray[i]['minvalues']= minValues;

        var maxValues = this.getExtremeMaxValues(this.neededArray[i].value_counts_without_nan)
        this.neededArray[i]['maxvalues'] = maxValues;

        if(this.neededArray[i].type == 'Numeric'){
          var graphValues = this.getHisValues(this.neededArray[i].histogram);
          this.neededArray[i]['hisvalues'] = graphValues;

        }

        if(this.neededArray[i].type == 'Categorical'){

         var sampleValues =  this.getSampleValues(this.neededArray[i].first_rows);
         this.neededArray[i]['samplevalues'] = sampleValues;

         var charCounts = this.getCharCounts(this.neededArray[i].character_counts);
         this.neededArray[i]['charcounts'] = charCounts;

         var categoryAlias = this.getSampleValues(this.neededArray[i].category_alias_counts);
         this.neededArray[i]['catalias'] = categoryAlias;

         var catAliasCharCount = this.gatCatAliasCharCounts(this.neededArray[i].category_alias_counts, this.neededArray[i].category_alias_char_counts)
         this.neededArray[i]['catAliasCharCount'] = catAliasCharCount;

        //  var lowerCase = this.getSampleValues(this.neededArray[i].category_alias_char_counts.Lowercase_Letter);
        //  this.neededArray[i]['lowercase'] = lowerCase;

        //  var upperCase = this.getSampleValues(this.neededArray[i].category_alias_char_counts.Uppercase_Letter);
        //  this.neededArray[i]['uppercase'] = upperCase;

         var scriptCount = this.getSampleValues(this.neededArray[i].script_counts);
         this.neededArray[i]['scriptcount'] = scriptCount;

        //  script char count
        var scrCharCount = this.getScriptCharCounts(this.neededArray[i].script_counts, this.neededArray[i].script_char_counts)
        this.neededArray[i]['scrCharCount'] = scrCharCount;

        var blockAlias = this.getSampleValues(this.neededArray[i].block_alias_counts);
        this.neededArray[i]['blockalias'] = blockAlias;

        var bloCharCount = this.getScriptCharCounts(this.neededArray[i].block_alias_counts, this.neededArray[i].block_alias_char_counts)
        this.neededArray[i]['blocharcount'] = bloCharCount;

        var histvalues = this.getHisValues(this.neededArray[i].histogram_frequencies);
        this.neededArray[i]['hisvalues'] = histvalues;

        var pievalues = this.getPieValues(this.neededArray[i].word_counts);
        this.neededArray[i]['pievalues'] = pievalues;

        }
        i++;
    }
    console.log(this.neededArray);
  }

  getCommonValues(response){
    let comProperties = Object.keys(response);
    

  }

  getExtremeMinValues(response){
    // let minProp =  Object.keys(response);

    // var minArray = [];
    // let i = 0;
    // for (var prop of minProp ) { 

    //     minArray.push(response[prop]);
    //     minArray[i]['value']= prop;
    //     i++;

    //     if(i>10){
    //       break;
    //     }
    // }
    // console.log(minArray);

    let minArray = Object.entries(response)
    return minArray.slice(0,10);
  }

  getExtremeMaxValues(response){
    let maxArray = Object.entries(response)
    return maxArray.slice(Math.max(maxArray.length - 10, 0)).reverse(); 

  }

  getSampleValues(response){
    let sampleArray = Object.entries(response)
    return sampleArray; 

  }

  getCharCounts(response){
    let sampleArray = Object.entries(response)
    return sampleArray; 
  }

  gatCatAliasCharCounts(name, value){

    let valArray = Object.entries(value);
    let nameArray = Object.keys(value);
    var finalArray = [];
    nameArray.forEach((x,i) =>{
      var obj = {
        name: x,
        values : Object.entries(value[x])
      }
      finalArray.push(obj)
    })

    return finalArray;



  }

  getScriptCharCounts(name, value){

    let valArray = Object.entries(value);
    let nameArray = Object.keys(name);
    var finalArray = [];
    nameArray.forEach((x,i) =>{
      var obj = {
        name: x,
        values : Object.entries(value[x])
      }
      finalArray.push(obj)
    })

    return finalArray;



  }

  returnPercent(data, type){
    if(type == '5'){
      return data['5%'];
    }
    if(type == '25'){
      return data['25%'];
    }
    if(type == '50'){
      return data['50%'];
    }
    if(type == '75'){
      return data['75%'];
    }
    if(type == '95'){
      return data['95%'];
    }
  }

  getValue(data){
    if (data == 0) {
      return Number(data)+1 +'st';
    }else if (data == 1) {
      return Number(data)+1 +'nd';
    }else if (data == 2) {
      return Number(data)+1 +'rd';
    }else{
      return Number(data)+1 +'th';
    }
  }

  getHisValues(response){
    var xaxis = Object.values(response.bin_edges);
    var yaxis = Object.values(response.counts);

    var finalData =  [{ x: xaxis, y: yaxis, type: 'bar',marker: {
      color: '#169ddd',
      opacity: 0.6,
      line: {
        color: '#169ddd',
        width: 1.5
      }
    } }];
    return finalData;
  }

  getPieValues(response){

    var values = Object.values(response);
    var labels = Object.keys(response);

    var finalData =  [{ values:values, labels: labels, type: 'pie' }];
    return finalData;

  
  }

  getDetails(type, name){

    if(type == 'datatype'){

      var datatype = this.columnDetails.filter(x=> x.assetName.toLowerCase() == name.toLowerCase())[0].dataType;
      return datatype;
    }

    if(type == 'null'){
      var isnull = this.columnDetails.filter(x=> x.assetName.toLowerCase() == name.toLowerCase())[0].isNull;
      return isnull == 'Y'? true: false;
    }

    if(type == 'pk'){
      var ispk = this.columnDetails.filter(x=> x.assetName.toLowerCase() == name.toLowerCase())[0].isPK;
      return ispk == 'Y'? true: false;
    }
    if(type == 'rules'){
      var rules = this.columnDetails.filter(x=> x.assetName.toLowerCase() == name.toLowerCase())[0].rules;

      var string = ''
      rules.forEach((x,i) =>{
        // if(i<rules.length){

        // }else{

        // }
        string = string + x.rul_nm + ', ';
      })
      return string;
    }


  }
}