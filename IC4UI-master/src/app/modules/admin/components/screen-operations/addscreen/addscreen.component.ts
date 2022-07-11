import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addscreen',
  templateUrl: './addscreen.component.html',
  styleUrls: ['./addscreen.component.scss']
})
export class AddscreenComponent implements OnInit {
  scrn_nm: any;
  targetAttributes: any[];
  constructor(private service: ApiService, private storage: LocalStorageService, private router: Router) { }

  ngOnInit() {
    this.listscreens();
  }
  createScreen() {
    var params = {
      "params": {
        "scrn_nm": this.scrn_nm,
        "user_id": this.storage.retrieve('userid'),
      }
    }
    console.log(params)
    this.service.post(this.service.addscreen, params).subscribe((res) => {
      console.log(res);
      this.targetAttributes = res;
      console.log(this.targetAttributes)
    }, (err) => { alert('err'); console.log(err) });

  }
  listscreens() {
    this.service.get(this.service.scrnlist).subscribe((res) => {
      console.log(res);
      this.targetAttributes = res;
      console.log(this.targetAttributes)
    });
  }
}