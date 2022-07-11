import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'ngx-webstorage'
import { ApiService } from '../../../../shared/services/api.service';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-view-dim-jobs',
  templateUrl: './view-dim-jobs.component.html',
  styleUrls: ['./view-dim-jobs.component.scss']
})
export class ViewDimJobsComponent implements OnInit {

  org_id = '';
  org_nm = '';
  role_id = '';
  usr_id = '';

  jobs = [];

  dataTable: any={};

  constructor(
    private router: Router,
    private service: ApiService,
    private loader: NgxSpinnerService,
    private storage: LocalStorageService,
    private chRef: ChangeDetectorRef,) { }

  ngOnInit() {
    this.org_id = this.storage.retrieve('orgid');
    this.org_nm = this.storage.retrieve('orgName');
    this.role_id = this.storage.retrieve('roleId');
    this.usr_id = this.storage.retrieve('userId');
    this.getDimJobs();
  }

  getDimJobs() {
    this.loader.show();
    this.service.post(this.service.getDimJobsByUser, { usr_id: this.usr_id })
      .subscribe(res => {
        this.jobs = res;
        this.loader.hide();
        this.chRef.detectChanges();
        const table: any = $('.tableviewDimJobs');
        this.dataTable = table.DataTable();
      },
        err => {
          this.loader.hide();
        alert('Got Error!!!');
      });
  }

  editJob(job) {
    const job_nm = job.job_nm;
    const job_id = job.job_id;

    this.router.navigate(['curate/dimBuilder/edit/job'], { queryParams: { id: job_id} });
  }

  addNewJob() {
    this.router.navigate(['curate/dimBuilder/create/job']);
  }

}
