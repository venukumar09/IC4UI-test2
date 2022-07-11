
import { Component, Output,OnInit, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router, NavigationExtras } from '@angular/router';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchdata:string='';
  searchSugesnRes:any=[];
  searchedobj=""
  resSta: any;
  @Output() toggled = new EventEmitter();
  isToggled : boolean= false;
  rolename: any;
  userName: any;
  paramdata: any;
  logoutopen: number=0;
  constructor(private service:ApiService,private router: Router,private storage:LocalStorageService) { }
  
  ngOnInit() {
    this.rolename=this.storage.retrieve('roleid')
    console.log(this.rolename)
    this.userName=this.storage.retrieve('username')
  }
  toggleLayout(){

    this.isToggled = !this.isToggled;

    this.toggled.emit(this.isToggled);

  }
  usersta(){
    if(this.logoutopen==0){
      this.logoutopen=1;
    }else{
      this.logoutopen=0;
    }
    
  }
  suggessions(keyevent){
    this.resSta=0;
    if(keyevent.code=='Escape'){
      this.searchdata=''
      this.searchSugesnRes=[];
      return;
    }
    if(this.searchdata.length>=3){
      // console.log(this.searchdata.length);
      console.log(keyevent)
      if(keyevent.code=='Enter'){
        this.searchiconclick();
        return;
      }
      
      var data={
        "searchText":this.searchdata,
        "userid":this.storage.retrieve('userid'),
        "orgid":this.storage.retrieve('orgid')
    }
    // if(event.keycode)
    // var res=[{"suggestions": "Insured_Distancetowork"}, {"suggestions": "Iowa_Workers_Compensation"}, {"suggestions": "Iowa_Workers_Compensation_V"}, {"suggestions": "Of_Hours_Worked__In_The_Most_Recent_12_Months"}, {"suggestions": "Policy Lines Of Business - Eg. Surety Bond, Bond-Misc, Excess Worker Comp"}, {"suggestions": "Total Number Of Employees Working "}, {"suggestions": "Urbanvsruralworkarea"}, {"suggestions": "Workers_Compensation_Claims_Demo"}, {"suggestions": "Workers_Compensation_Claims_Demo_V"}]
      console.log(this.searchSugesnRes)
      this.service.post(this.service.suggestions,data).subscribe(
        res=>{
          console.log(res)
          this.resSta=1;  
          this.searchSugesnRes=res    
        },
        err=>{
          console.log(err)
        }
      )
    }
  }
  logout() {
    this.storage.clear();
    this.router.navigate(['/signin']);
  }
  searchiconclick(){
    this.paramdata=this.searchdata;
    this.searchdata="";
    var data={
      "searchText":this.paramdata,
      "filterParams":{orgfilterdata: [], lobfilterdata: [], apnfilterdata: []},
      "userid":this.storage.retrieve('userid'),
      "orgid":this.storage.retrieve('orgid')
    }
    this.storage.store('Searchedobj',data)
    console.log(this.paramdata)
    this.router.navigate(['catalog/searchResults', this.paramdata, true]);
    this.searchSugesnRes=[]
  }
  searchslctdobj(paramdata){
    
    this.searchdata=""
    console.log(this.searchedobj)
    // this.paramdata=paramdata
    var data={
      "searchText":paramdata,
      "filterParams":{orgfilterdata: [], lobfilterdata: [], apnfilterdata: []},
      "userid":this.storage.retrieve('userid'),
      "orgid":this.storage.retrieve('orgid')
    }
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       "searchText":paramdata,
  //       "filterParams":{orgfilterdata: [], lobfilterdata: [], apnfilterdata: []},
  //       "userid":this.storage.retrieve('userid'),
  //       "orgid":this.storage.retrieve('orgid')
  //     }
  // };
    this.storage.store('Searchedobj',data)
    console.log(paramdata)
    this.router.navigate(['catalog/searchResults', paramdata, true]);
    
    // this.service.post(this.service.mainSearch,data).subscribe(
    //   res=>{
    //     console.log(res)
        
    //   },
    //   err=>{
    //     console.log(err)
    //   }
    // )
}
}
