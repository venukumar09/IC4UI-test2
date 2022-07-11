import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
declare var $: any;
// import 'datatables.net';
// import 'datatables.net-bs4';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-upload-template',
  templateUrl: './upload-template.component.html',
  styleUrls: ['./upload-template.component.css']
})
export class UploadTemplateComponent implements OnInit, AfterViewInit {

  files: any = [];

  org_id = '7248518a1808eae38650458ce81ba05a';
  // usr_id =  this.storage.retrieve('userid');
  usr_id = '12345';
  // selectedLOb_Id;
  // selectedApp_Id;

  @Input() selectedLOb_Id: string;
  @Input() selectedApp_Id: string;
  showTable = false;
  fileDetails;

  lobs = [];
  applications = [];
  tableDetails = [];

  constructor(private service: ApiService,
    private router:Router) { }

  ngOnInit() {
    // this.getLOBs();
    $(document).ready(function () {
      $('#example').DataTable();
    });
  }

  ngAfterViewInit() {

  }

  // getLOBs() {
  //   this.service.post(this.service.get_lobs, { org_id: this.org_id })
  //     .subscribe((res) => {
  //       this.lobs = res;

  //     }, err => console.log(err));
  // }

  // getApplications() {
  //   this.service.post(this.service.get_applications, { lob_id: this.selectedLOb_Id })
  //     .subscribe((res) => {
  //       this.applications = res;
  //     }, err => console.log(err));
  // }


  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];

      this.deleteAttachment(0);
      this.files.push(element);

      // if (this.files.some(x => x.name == element.name)) {
      //   alert();
      // } else {
      //   this.files.push(element);
      // }

    }
  }

  deleteAttachment(index) {
    this.files.splice(index, 1)
  }

  sendFile() {
    debugger
    const formData: any = new FormData();

    formData.append("fileUpload", this.files[0], this.files[0]['name']);
    formData.append("org_id", this.org_id);
    formData.append("ln_of_bsn_id", this.selectedLOb_Id);
    formData.append("apn_id", this.selectedApp_Id);
    formData.append("usr_id", this.usr_id);

    this.service.post(this.service.bulkuploadobject, formData)
      .subscribe(res => {
        this.viewDetails(res);
        this.fileDetails = res;
        this.showTable = true;
      }, err => {
        alert('Got Error while uploading file.')
      });

  }

  viewDetails(details) {
    let tables = details["table_details"];
    let clmns = details["column_details"];
    this.tableDetails = clmns;

    console.log(tables);
    console.log(clmns)
    let data = [];

    // let final_data = {...tables, ...clmns};
    // console.log(final_data)
    // for (let index = 0; index < clmns.length; index++) {
    //   const tbl = clmns[index];

    //   for (let i = 0; i < clmns.length; i++) {
    //     const clmn = clmns[i];
    //     if(tbl.obj_id == clmn.obj_id){
    //       data.push
    //     }

    //   }

    // }

  }

  insertData() {
    this.service.post(this.service.insert_template_data, this.fileDetails)
      .subscribe(res => {
        Swal.fire({
          text: "Data inserted successfully.",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        }).then((result) => {
          this.router.navigate(['/catalog']);
        })
        // alert('Data inserted successfully.');
        // this.viewDetails(res);
        // this.showTable = true;
      }, err => {
        alert('Got Error while inserting data.')
      });


  }

}
