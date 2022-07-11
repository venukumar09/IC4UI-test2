import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addscreenoperations',
  templateUrl: './addscreenoperations.component.html',
  styleUrls: ['./addscreenoperations.component.scss']
})
export class AddscreenoperationsComponent implements OnInit {
  targetAttributes: any[];
  screen_operations: any;
  connection:any;
  screen_operationstarget: any[];
  constructor(private service: ApiService, private storage: LocalStorageService, private router: Router) { }

  ngOnInit() {
    this.listscreens();
    this.listscreenoperations();
  }
  listscreens() {
    // console.log(this.connection)
    this.service.get(this.service.scrnlist).subscribe((res) => {
      console.log(res);
      this.targetAttributes = res;
      console.log(this.targetAttributes)
      
    });
    
  }
  
  createScreenoprtn() {
    var params = {
      "params": {
        "scrn_id": this.connection,
        "screen_operations": this.screen_operations,
        "user_id": "kalyan"
      }
    }
    console.log(this.connection);
    console.log(params)
    this.service.post(this.service.addscreenoperations,params).subscribe((res) => {
      console.log(res);
      this.targetAttributes = res;
      console.log(this.targetAttributes)
    });
    this.listscreenoperations();
  }
  listscreenoperations() {
    this.service.get(this.service.scrnoperlist).subscribe((res) => {
      console.log(res);
      this.screen_operationstarget = res;
      console.log(this.screen_operationstarget)
    });
  }
}
